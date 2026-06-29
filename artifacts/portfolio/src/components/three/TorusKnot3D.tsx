import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion } from "framer-motion";
import { WebGLErrorBoundary } from "./WebGLErrorBoundary";

function KnotMesh({ hovered }: { hovered: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const speed = useRef(0.003);
  const mat = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((_, delta) => {
    if (!ref.current || !mat.current) return;
    const target = hovered ? 0.016 : 0.004;
    speed.current += (target - speed.current) * 0.05;
    ref.current.rotation.x += speed.current;
    ref.current.rotation.y += speed.current * 1.5;
    ref.current.rotation.z += speed.current * 0.6;
    const targetColor = hovered ? new THREE.Color("#00ff9d") : new THREE.Color("#00f5ff");
    mat.current.color.lerp(targetColor, 0.04);
    mat.current.emissive.lerp(targetColor, 0.04);
  });

  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1, 0.3, 200, 20, 2, 3]} />
      <meshStandardMaterial
        ref={mat}
        color="#00f5ff"
        emissive="#00f5ff"
        emissiveIntensity={0.35}
        wireframe
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

function CSSFallback({ hovered }: { hovered: boolean }) {
  const color = hovered ? "#00ff9d" : "#00f5ff";
  return (
    <div className="flex h-full w-full items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: hovered ? 4 : 14, repeat: Infinity, ease: "linear" }}
        style={{ width: 200, height: 200, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            animate={{ rotate: 360 }}
            transition={{ duration: hovered ? 3 + i * 0.4 : 10 + i * 1, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              width: 185 - i * 22,
              height: 185 - i * 22,
              borderRadius: "50%",
              border: `1px solid ${color}`,
              opacity: 0.12 + i * 0.05,
              boxShadow: i === 0 ? `0 0 40px ${color}66, 0 0 80px ${color}22` : "none"
            }}
          />
        ))}
        <div style={{ width: 36, height: 36 }}>
          <svg viewBox="0 0 36 36" fill="none">
            <path d="M18 3 L33 11 L33 25 L18 33 L3 25 L3 11 Z"
              stroke={color} strokeWidth="1" fill="none"
              style={{ filter: `drop-shadow(0 0 6px ${color})` }} />
            <circle cx="18" cy="18" r="4" fill={color}
              style={{ filter: `drop-shadow(0 0 5px ${color})` }} />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}

export function TorusKnot3D() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="h-full w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <WebGLErrorBoundary fallback={<CSSFallback hovered={hovered} />}>
        <Canvas
          camera={{ position: [0, 0, 3.8], fov: 52 }}
          gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        >
          <ambientLight intensity={0.15} />
          <pointLight position={[4, 4, 4]} intensity={1.5} color="#00f5ff" />
          <pointLight position={[-4, -4, -4]} intensity={0.8} color="#00ff9d" />
          <Suspense fallback={null}>
            <KnotMesh hovered={hovered} />
          </Suspense>
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
