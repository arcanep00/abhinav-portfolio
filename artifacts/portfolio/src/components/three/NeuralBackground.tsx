import { NeuralCanvas2D } from "./NeuralCanvas2D";
import { Suspense, lazy } from "react";
import { WebGLErrorBoundary } from "./WebGLErrorBoundary";

// Evaluated once at module load — never on re-render.
// Creates a single throwaway canvas to probe WebGL support.
function probeWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const ctx =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!ctx) return false;
    // Immediately lose the context so the probe canvas doesn't hold GPU memory.
    const ext = (ctx as WebGLRenderingContext).getExtension(
      "WEBGL_lose_context"
    );
    ext?.loseContext();
    return true;
  } catch {
    return false;
  }
}

const webglAvailable = typeof window !== "undefined" && probeWebGL();

const NeuralThree = lazy(() =>
  import("./NeuralThree").then((m) => ({ default: m.NeuralThree }))
);

export function NeuralBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      {webglAvailable ? (
        <WebGLErrorBoundary fallback={<NeuralCanvas2D />}>
          <Suspense fallback={<NeuralCanvas2D />}>
            <NeuralThree />
          </Suspense>
        </WebGLErrorBoundary>
      ) : (
        <NeuralCanvas2D />
      )}
    </div>
  );
}
