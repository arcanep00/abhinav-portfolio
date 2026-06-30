import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Float, 
  Text, 
  Sphere, 
  MeshDistortMaterial,
  Environment,
  PerspectiveCamera,
  ContactShadows
} from "@react-three/drei";
import * as THREE from "three";

const SKILLS = [
  { name: "Python", color: "#00ff9d", pos: [0, 0, 0], size: 1.2 },
  { name: "Django", color: "#00f5ff", pos: [-2.5, 1.2, -1], size: 0.8 },
  { name: "FastAPI", color: "#00ff9d", pos: [2.5, -1.2, -1], size: 0.8 },
  { name: "PostgreSQL", color: "#a78bfa", pos: [-1.8, -1.8, 0], size: 0.7 },
  { name: "Redis", color: "#ef4444", pos: [1.8, 1.8, 0], size: 0.6 },
  { name: "Docker", color: "#00f5ff", pos: [0, 2.5, -2], size: 0.7 },
  { name: "LLMs", color: "#00ff9d", pos: [0, -2.5, -2], size: 0.9 },
];

function SkillNode({ skill }: { skill: typeof SKILLS[0] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5 + skill.pos[0]) * 0.2;
    meshRef.current.rotation.y = Math.cos(state.clock.getElapsedTime() * 0.5 + skill.pos[1]) * 0.2;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5} position={skill.pos as any}>
      <group>
        <Sphere ref={meshRef} args={[skill.size, 64, 64]}>
          <MeshDistortMaterial
            color={skill.color}
            speed={2}
            distort={0.4}
            radius={1}
            emissive={skill.color}
            emissiveIntensity={0.2}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
        <Text
          position={[0, -skill.size - 0.4, 0]}
          fontSize={0.25}
          color="white"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff"
          anchorX="center"
          anchorY="middle"
        >
          {skill.name}
        </Text>
      </group>
    </Float>
  );
}

export function SkillsCanvas() {
  return (
    <Canvas shadows dpr={[1, 2]}>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={40} />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} color="#00ff9d" intensity={0.5} />
      
      <group position={[0, 0, 0]}>
        {SKILLS.map((skill) => (
          <SkillNode key={skill.name} skill={skill} />
        ))}
      </group>

      <ContactShadows
        position={[0, -4, 0]}
        opacity={0.3}
        scale={20}
        blur={2}
        far={5}
      />
      <Environment preset="city" />
    </Canvas>
  );
}
