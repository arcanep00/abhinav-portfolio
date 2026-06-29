import { useState } from "react";
import { motion } from "framer-motion";

export function TorusKnot3D() {
  const [hovered, setHovered] = useState(false);

  const color = hovered ? "#00ff9d" : "#00f5ff";
  const glow = hovered
    ? "0 0 60px rgba(0,255,157,0.5), 0 0 120px rgba(0,255,157,0.2)"
    : "0 0 60px rgba(0,245,255,0.4), 0 0 120px rgba(0,245,255,0.15)";

  return (
    <div
      className="flex h-full w-full items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: hovered ? 4 : 12, repeat: Infinity, ease: "linear" }}
        className="relative flex items-center justify-center"
        style={{ width: 200, height: 200 }}
      >
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            animate={{ rotate: deg + 360 }}
            transition={{ duration: hovered ? 3 + i * 0.3 : 10 + i * 0.8, repeat: Infinity, ease: "linear" }}
            style={{
              width: 180 - i * 18,
              height: 180 - i * 18,
              border: `1px solid ${color}`,
              opacity: 0.15 + i * 0.05,
              boxShadow: i === 0 ? glow : "none"
            }}
          />
        ))}
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: 40, height: 40 }}
        >
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20 4 L36 12 L36 28 L20 36 L4 28 L4 12 Z"
              stroke={color}
              strokeWidth="1"
              fill="none"
              style={{ filter: `drop-shadow(0 0 8px ${color})` }}
            />
            <circle cx="20" cy="20" r="4" fill={color} style={{ filter: `drop-shadow(0 0 6px ${color})` }} />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
