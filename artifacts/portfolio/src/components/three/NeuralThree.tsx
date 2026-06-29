import { useRef, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 150;
const MAX_DIST_SQ = 2.5 * 2.5;

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
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(NODE_COUNT * 3);
    const velocities: THREE.Vector3[] = [];
    const w = Math.min(size.width / 100, 10);
    const h = Math.min(size.height / 100, 6);
    for (let i = 0; i < NODE_COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * w * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * h * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
      velocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.002
      ));
    }
    return { positions, velocities };
  }, [size.width, size.height]);

  useFrame(() => {
    if (!ref.current) return;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < NODE_COUNT; i++) {
      arr[i*3]     += velocities[i].x + mouse.current.x * 0.001;
      arr[i*3 + 1] += velocities[i].y + mouse.current.y * 0.001;
      arr[i*3 + 2] += velocities[i].z;
      if (Math.abs(arr[i*3])     > 12) velocities[i].x *= -1;
      if (Math.abs(arr[i*3 + 1]) > 8)  velocities[i].y *= -1;
      if (Math.abs(arr[i*3 + 2]) > 3)  velocities[i].z *= -1;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#00ff9d" transparent opacity={0.9} sizeAttenuation />
    </points>
  );
}

function Lines() {
  const ref = useRef<THREE.LineSegments>(null);
  const { size } = useThree();
  const time = useRef(0);

  const nodePos = useMemo(() => {
    const arr: number[] = [];
    const w = Math.min(size.width / 100, 10);
    const h = Math.min(size.height / 100, 6);
    for (let i = 0; i < NODE_COUNT; i++) {
      arr.push(
        (Math.random() - 0.5) * w * 2,
        (Math.random() - 0.5) * h * 2,
        (Math.random() - 0.5) * 3
      );
    }
    return arr;
  }, [size.width, size.height]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    time.current += delta * 0.14;
    for (let i = 0; i < NODE_COUNT; i++) {
      nodePos[i*3]     += Math.sin(time.current + i * 0.3) * 0.003;
      nodePos[i*3 + 1] += Math.cos(time.current + i * 0.5) * 0.003;
    }
    const pts: number[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = nodePos[i*3]     - nodePos[j*3];
        const dy = nodePos[i*3 + 1] - nodePos[j*3 + 1];
        const dz = nodePos[i*3 + 2] - nodePos[j*3 + 2];
        if (dx*dx + dy*dy + dz*dz < MAX_DIST_SQ) {
          pts.push(
            nodePos[i*3], nodePos[i*3+1], nodePos[i*3+2],
            nodePos[j*3], nodePos[j*3+1], nodePos[j*3+2]
          );
        }
      }
    }
    ref.current.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(pts), 3)
    );
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <lineSegments ref={ref}>
      <bufferGeometry />
      <lineBasicMaterial color="#00ff9d" transparent opacity={0.13} />
    </lineSegments>
  );
}

export function NeuralThree() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 65 }}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <Particles />
        <Lines />
      </Suspense>
    </Canvas>
  );
}
