import { useRef, useState, Suspense, lazy } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import { WebGLErrorBoundary } from "./WebGLErrorBoundary";
import { isWebGLAvailable } from "@/lib/utils";

const TorusKnotCanvas = lazy(() =>
  import("./TorusKnotCanvas").then((m) => ({ default: m.TorusKnotCanvas }))
);

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
  const webgl = isWebGLAvailable();

  return (
    <div
      className="h-full w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {webgl ? (
        <WebGLErrorBoundary fallback={<CSSFallback hovered={hovered} />}>
          <Suspense fallback={<CSSFallback hovered={hovered} />}>
            <TorusKnotCanvas hovered={hovered} />
          </Suspense>
        </WebGLErrorBoundary>
      ) : (
        <CSSFallback hovered={hovered} />
      )}
    </div>
  );
}
