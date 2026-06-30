import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  MeshTransmissionMaterial, 
  Float, 
  Sphere,
  Points,
  PointMaterial,
  Environment
} from "@react-three/drei";
import * as THREE from "three";

function GlassSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshTransmissionMaterial
          backside
          samples={8}
          thickness={1}
          chromaticAberration={0.05}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.3}
          temporalDistortion={0.5}
          color="#00f5ff"
          attenuationDistance={0.5}
          attenuationColor="#00f5ff"
          transmission={1}
        />
      </mesh>
    </Float>
  );
}

function InnerParticles({ count = 200 }) {
  const points = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const phi = THREE.MathUtils.randFloat(0, Math.PI);
      const r = THREE.MathUtils.randFloat(0, 0.8);
      temp[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      temp[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      temp[i * 3 + 2] = r * Math.cos(phi);
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.getElapsedTime() * 0.1;
  });

  return (
    <Points ref={points} positions={particles} stride={3}>
      <PointMaterial
        transparent
        color="#00ff9d"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export function AboutCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 45 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <GlassSphere />
      <InnerParticles />
      <Environment preset="city" />
    </Canvas>
  );
}
