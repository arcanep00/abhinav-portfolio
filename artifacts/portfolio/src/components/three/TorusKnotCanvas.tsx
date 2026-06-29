import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function KnotMesh({ hovered }: { hovered: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  const speed = useRef(0.003);

  useFrame((_, delta) => {
    if (!ref.current || !mat.current) return;
    const target = hovered ? 0.016 : 0.004;
    speed.current += (target - speed.current) * 0.05;
    ref.current.rotation.x += speed.current;
    ref.current.rotation.y += speed.current * 1.5;
    ref.current.rotation.z += speed.current * 0.6;
    const col = new THREE.Color(hovered ? "#00ff9d" : "#00f5ff");
    mat.current.color.lerp(col, 0.04);
    mat.current.emissive.lerp(col, 0.04);
    mat.current.emissiveIntensity = hovered ? 0.55 : 0.32;
  });

  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1, 0.3, 200, 20, 2, 3]} />
      <meshStandardMaterial
        ref={mat}
        color="#00f5ff"
        emissive="#00f5ff"
        emissiveIntensity={0.32}
        wireframe
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

export function TorusKnotCanvas({ hovered }: { hovered: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.8], fov: 52 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
    >
      <ambientLight intensity={0.15} />
      <pointLight position={[4, 4, 4]} intensity={1.5} color="#00f5ff" />
      <pointLight position={[-4, -4, -4]} intensity={0.8} color="#00ff9d" />
      <KnotMesh hovered={hovered} />
    </Canvas>
  );
}
