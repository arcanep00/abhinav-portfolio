import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Text,
  Sphere,
  MeshDistortMaterial,
  PerspectiveCamera,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";

// Environment preset="city" suspends on a remote HDRI fetch that never
// resolves in restricted-network environments — replaced with manual lights.
// Text font= left empty so Drei uses its built-in default font (no network
// fetch, no suspension).

const SKILLS = [
  { name: "Python",     color: "#00ff9d", pos: [0,    0,    0],  size: 0.45 },
  { name: "Django",     color: "#00f5ff", pos: [-2.5,  1.2, -1], size: 0.30 },
  { name: "FastAPI",    color: "#00ff9d", pos: [2.5,  -1.2, -1], size: 0.30 },
  { name: "PostgreSQL", color: "#a78bfa", pos: [-1.8, -1.8,  0], size: 0.26 },
  { name: "Redis",      color: "#ef4444", pos: [1.8,   1.8,  0], size: 0.22 },
  { name: "Docker",     color: "#00f5ff", pos: [0,     2.5, -2], size: 0.26 },
  { name: "LLMs",       color: "#00ff9d", pos: [0,    -2.5, -2], size: 0.34 },
];

function SkillNode({ skill }: { skill: (typeof SKILLS)[0] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(t * 0.5 + skill.pos[0]) * 0.2;
    meshRef.current.rotation.y = Math.cos(t * 0.5 + skill.pos[1]) * 0.2;
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
        {/* No font prop → Drei uses its built-in default (no fetch, no suspend) */}
        <Text
          position={[0, -skill.size - 0.15, 0]}
          fontSize={0.18}
          color="white"
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

      {/* Replaces Environment preset="city" — same brightness/colour balance,
          no remote HDRI fetch, no Suspense stall */}
      <ambientLight intensity={0.6} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1.5}
        castShadow
      />
      <pointLight position={[-10, -10, -10]} color="#00ff9d" intensity={0.8} />
      <pointLight position={[10, -5, 5]} color="#00f5ff" intensity={0.4} />

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
    </Canvas>
  );
}
