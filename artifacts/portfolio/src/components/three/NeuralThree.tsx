import { useRef, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree, extend, ThreeElement } from "@react-three/fiber";
import * as THREE from "three";
import { shaderMaterial, AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from "@react-three/postprocessing";

const NODE_COUNT = 160;
const MAX_DIST = 2.8;
const MAX_DIST_SQ = MAX_DIST * MAX_DIST;

const NeuralConnectionMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color("#00ff9d"),
    uOpacity: 0.15,
  },
  // Vertex Shader
  `
  varying vec3 vPos;
  void main() {
    vPos = position;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
  }
  `,
  // Fragment Shader
  `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec3 vPos;
  
  void main() {
    float dash = sin(vPos.x * 10.0 + vPos.y * 10.0 + vPos.z * 10.0 - uTime * 5.0) * 0.5 + 0.5;
    float alpha = uOpacity * dash;
    gl_FragColor = vec4(uColor, alpha);
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

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const { size } = useThree();

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1)
      );
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (ref.current) {
        ref.current.geometry.dispose();
        if (Array.isArray(ref.current.material)) {
            ref.current.material.forEach(m => m.dispose());
        } else {
            ref.current.material.dispose();
        }
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
      velocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.006,
        (Math.random() - 0.5) * 0.006,
        (Math.random() - 0.5) * 0.003
      ));
    }
    return { positions, velocities };
  }, [size.width, size.height]);

  useFrame((state) => {
    if (!ref.current) return;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.getElapsedTime();
    
    for (let i = 0; i < NODE_COUNT; i++) {
      const i3 = i * 3;
      arr[i3]     += velocities[i].x + Math.sin(time * 0.5 + i) * 0.002;
      arr[i3 + 1] += velocities[i].y + Math.cos(time * 0.3 + i) * 0.002;
      arr[i3 + 2] += velocities[i].z;

      const dx = arr[i3] - mouse.current.x * 5.0;
      const dy = arr[i3 + 1] - mouse.current.y * 3.0;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 3.0) {
        const force = (1.0 - dist / 3.0) * 0.02;
        arr[i3] += dx * force;
        arr[i3 + 1] += dy * force;
      }

      if (Math.abs(arr[i3])     > 15) velocities[i].x *= -1;
      if (Math.abs(arr[i3 + 1]) > 10)  velocities[i].y *= -1;
      if (Math.abs(arr[i3 + 2]) > 5)  velocities[i].z *= -1;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
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

function Connections() {
  const ref = useRef<THREE.LineSegments>(null);
  const matRef = useRef<any>(null);
  
  useEffect(() => {
      return () => {
          if (ref.current) {
              ref.current.geometry.dispose();
              if (Array.isArray(ref.current.material)) {
                  ref.current.material.forEach(m => m.dispose());
              } else {
                  ref.current.material.dispose();
              }
          }
      }
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const scene = state.scene;
    const points = scene.getObjectByProperty("type", "Points") as THREE.Points;
    if (!points) return;
    
    const positions = points.geometry.attributes.position.array as Float32Array;
    const linePositions: number[] = [];
    
    for (let i = 0; i < NODE_COUNT; i++) {
      const i3 = i * 3;
      const x1 = positions[i3];
      const y1 = positions[i3 + 1];
      const z1 = positions[i3 + 2];
      
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const j3 = j * 3;
        const x2 = positions[j3];
        const y2 = positions[j3 + 1];
        const z2 = positions[j3 + 2];
        
        const dx = x1 - x2;
        const dy = y1 - y2;
        const dz = z1 - z2;
        const distSq = dx * dx + dy * dy + dz * dz;
        
        if (distSq < MAX_DIST_SQ) {
          linePositions.push(x1, y1, z1, x2, y2, z2);
        }
      }
    }
    
    const lineArr = new Float32Array(linePositions);
    ref.current.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(lineArr, 3)
    );
    
    if (matRef.current) {
      matRef.current.uTime = state.clock.getElapsedTime();
    }
  });

  return (
    <lineSegments ref={ref}>
      <bufferGeometry />
      {/* @ts-ignore */}
      <neuralConnectionMaterial ref={matRef} transparent blending={THREE.AdditiveBlending} uOpacity={0.2} />
    </lineSegments>
  );
}

export function NeuralThree() {
  const chromaticOffset = useMemo(() => new THREE.Vector2(0.0005, 0.0005), []);

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      <Suspense fallback={null}>
        <Particles />
        <Connections />
        <EffectComposer enableNormalPass={false}>
          <Bloom 
            intensity={1.2} 
            luminanceThreshold={0.2} 
            luminanceSmoothing={0.9} 
          />
          <Noise opacity={0.03} />
          <Vignette offset={0.3} darkness={0.4} />
          <ChromaticAberration 
              offset={chromaticOffset} 
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
