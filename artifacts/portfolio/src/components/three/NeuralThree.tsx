import { useRef, useMemo, useEffect, Suspense, createContext, useContext } from "react";
import { Canvas, useFrame, useThree, extend, ThreeElement } from "@react-three/fiber";
import * as THREE from "three";
import { shaderMaterial, AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from "@react-three/postprocessing";

// ─── Constants ────────────────────────────────────────────────────────────────
const NODE_COUNT = 120; // reduced from 160 — fewer particles, far fewer O(n²) pairs
const MAX_DIST   = 2.8;
const MAX_DIST_SQ = MAX_DIST * MAX_DIST;

// ─── Shader material ──────────────────────────────────────────────────────────
const NeuralConnectionMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color("#00ff9d"),
    uOpacity: 0.15,
  },
  `
  varying vec3 vPos;
  void main() {
    vPos = position;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
  }
  `,
  `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec3 vPos;
  void main() {
    float dash = sin(vPos.x * 10.0 + vPos.y * 10.0 + vPos.z * 10.0 - uTime * 5.0) * 0.5 + 0.5;
    gl_FragColor = vec4(uColor, uOpacity * dash);
  }
  `
);

extend({ NeuralConnectionMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      neuralConnectionMaterial: ThreeElement<typeof THREE.ShaderMaterial>;
    }
  }
}

// ─── Shared particle positions ref ────────────────────────────────────────────
// We pass the live Float32Array from Particles → Connections via context so
// Connections never has to traverse the scene (no getObjectByProperty every frame).
const ParticlePositionsCtx = createContext<React.MutableRefObject<Float32Array | null>>({
  current: null,
});

// ─── Particles ────────────────────────────────────────────────────────────────
function Particles({
  posRef,
}: {
  posRef: React.MutableRefObject<Float32Array | null>;
}) {
  const ref = useRef<THREE.Points>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const { size } = useThree();

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      );
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (ref.current) {
        ref.current.geometry.dispose();
        const mat = ref.current.material;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else mat.dispose();
      }
    };
  }, []);

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(NODE_COUNT * 3);
    const velocities: THREE.Vector3[] = [];
    const w = Math.min(size.width / 80, 12);
    const h = Math.min(size.height / 80, 8);
    for (let i = 0; i < NODE_COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * w * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * h * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.006,
          (Math.random() - 0.5) * 0.006,
          (Math.random() - 0.5) * 0.003
        )
      );
    }
    // Expose to Connections immediately so it's never null after first render
    posRef.current = positions;
    return { positions, velocities };
  }, [size.width, size.height, posRef]);

  useFrame((state) => {
    if (!ref.current) return;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.getElapsedTime();
    const mx = mouse.current.x * 5.0;
    const my = mouse.current.y * 3.0;

    for (let i = 0; i < NODE_COUNT; i++) {
      const i3 = i * 3;
      arr[i3]     += velocities[i].x + Math.sin(time * 0.5 + i) * 0.002;
      arr[i3 + 1] += velocities[i].y + Math.cos(time * 0.3 + i) * 0.002;
      arr[i3 + 2] += velocities[i].z;

      const dx = arr[i3]     - mx;
      const dy = arr[i3 + 1] - my;
      const distSq = dx * dx + dy * dy;
      if (distSq < 9.0) {
        const force = (1.0 - Math.sqrt(distSq) / 3.0) * 0.02;
        arr[i3]     += dx * force;
        arr[i3 + 1] += dy * force;
      }

      if (Math.abs(arr[i3])     > 15) velocities[i].x *= -1;
      if (Math.abs(arr[i3 + 1]) > 10) velocities[i].y *= -1;
      if (Math.abs(arr[i3 + 2]) > 5)  velocities[i].z *= -1;
    }

    ref.current.geometry.attributes.position.needsUpdate = true;
    // Keep the shared ref in sync — it points to the same Float32Array so this
    // is a no-op in terms of allocation; just ensures posRef stays valid.
    posRef.current = arr;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#00ff9d"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ─── Connections ──────────────────────────────────────────────────────────────
// MAX vertex count = NODE_COUNT*(NODE_COUNT-1)/2 pairs × 2 verts × 3 floats
const MAX_LINE_VERTS = ((NODE_COUNT * (NODE_COUNT - 1)) / 2) * 2;

function Connections() {
  const ref     = useRef<THREE.LineSegments>(null);
  const matRef  = useRef<any>(null);
  const posRef  = useContext(ParticlePositionsCtx);

  // Pre-allocate once — never reallocated per frame
  const { bufAttr, lineBuffer } = useMemo(() => {
    const lineBuffer = new Float32Array(MAX_LINE_VERTS * 3);
    const bufAttr    = new THREE.BufferAttribute(lineBuffer, 3);
    bufAttr.setUsage(THREE.DynamicDrawUsage);
    return { bufAttr, lineBuffer };
  }, []);

  useEffect(() => {
    const geo = ref.current?.geometry;
    if (!geo) return;
    geo.setAttribute("position", bufAttr);
    geo.setDrawRange(0, 0);
    return () => {
      geo.dispose();
      const mat = ref.current?.material;
      if (!mat) return;
      if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
      else mat.dispose();
    };
  }, [bufAttr]);

  useFrame((state) => {
    if (!ref.current || !posRef.current) return;

    const positions = posRef.current;
    let count = 0;

    for (let i = 0; i < NODE_COUNT; i++) {
      const i3 = i * 3;
      const x1 = positions[i3];
      const y1 = positions[i3 + 1];
      const z1 = positions[i3 + 2];

      for (let j = i + 1; j < NODE_COUNT; j++) {
        const j3 = j * 3;
        const dx = x1 - positions[j3];
        const dy = y1 - positions[j3 + 1];
        const dz = z1 - positions[j3 + 2];

        if (dx * dx + dy * dy + dz * dz < MAX_DIST_SQ) {
          const base = count * 3;
          lineBuffer[base]     = x1;
          lineBuffer[base + 1] = y1;
          lineBuffer[base + 2] = z1;
          lineBuffer[base + 3] = positions[j3];
          lineBuffer[base + 4] = positions[j3 + 1];
          lineBuffer[base + 5] = positions[j3 + 2];
          count += 2;
        }
      }
    }

    if (count > 0) bufAttr.needsUpdate = true;
    ref.current.geometry.setDrawRange(0, count);

    if (matRef.current) {
      matRef.current.uTime = state.clock.getElapsedTime();
    }
  });

  return (
    <lineSegments ref={ref}>
      <bufferGeometry />
      {/* @ts-ignore */}
      <neuralConnectionMaterial
        ref={matRef}
        transparent
        blending={THREE.AdditiveBlending}
        uOpacity={0.2}
      />
    </lineSegments>
  );
}

// ─── Scene ────────────────────────────────────────────────────────────────────
// Separate component so posRef lives inside the Canvas context tree
function Scene() {
  // One ref per mounted Canvas instance — no module-level singleton
  const posRef = useRef<Float32Array | null>(null);

  return (
    <ParticlePositionsCtx.Provider value={posRef}>
      <Particles posRef={posRef} />
      <Connections />
    </ParticlePositionsCtx.Provider>
  );
}

// ─── Post-processing ──────────────────────────────────────────────────────────
const chromaticOffset = new THREE.Vector2(0.0005, 0.0005);

function Effects() {
  return (
    // multisampling={0} skips the MSAA resolve pass — large GPU win with no
    // visible quality difference on this style of scene.
    <EffectComposer enableNormalPass={false} multisampling={0}>
      <Bloom intensity={1.2} luminanceThreshold={0.2} luminanceSmoothing={0.9} />
      <Noise opacity={0.03} />
      <Vignette offset={0.3} darkness={0.4} />
      <ChromaticAberration offset={chromaticOffset} />
    </EffectComposer>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────
export function NeuralThree() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      gl={{
        antialias: false,          // AA is redundant when post-processing is on
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,            // not needed — saves a buffer
        depth: false,              // particles/lines don't need depth buffer
      }}
      style={{ background: "transparent" }}
    >
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      <Suspense fallback={null}>
        <Scene />
        <Effects />
      </Suspense>
    </Canvas>
  );
}
