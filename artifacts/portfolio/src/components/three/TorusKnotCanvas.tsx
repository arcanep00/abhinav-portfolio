import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  MeshTransmissionMaterial, 
  ContactShadows, 
  Environment, 
  PerspectiveCamera,
  Float
} from "@react-three/drei";
import * as THREE from "three";

function KnotMesh({ hovered }: { hovered: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const speed = useRef(0.003);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const target = hovered ? 0.012 : 0.004;
    speed.current += (target - speed.current) * 0.05;
    ref.current.rotation.x += speed.current;
    ref.current.rotation.y += speed.current * 1.5;
    ref.current.rotation.z += speed.current * 0.6;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={ref} castShadow receiveShadow>
        <torusKnotGeometry args={[1, 0.35, 256, 32, 2, 3]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={1.5}
          chromaticAberration={0.06}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.3}
          temporalDistortion={0.5}
          color={hovered ? "#00ff9d" : "#00f5ff"}
          attenuationDistance={0.5}
          attenuationColor={hovered ? "#00ff9d" : "#00f5ff"}
          transmission={1}
        />
      </mesh>
    </Float>
  );
}

export function TorusKnotCanvas({ hovered }: { hovered: boolean }) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 4.5], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 4.5]} fov={45} />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={1} color={hovered ? "#00ff9d" : "#00f5ff"} />
      
      <KnotMesh hovered={hovered} />
      
      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.4}
        scale={10}
        blur={2.5}
        far={4}
        color="#000000"
      />
      
      <Environment preset="city" />
    </Canvas>
  );
}
