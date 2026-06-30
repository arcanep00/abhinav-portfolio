import { NeuralCanvas2D } from "./NeuralCanvas2D";
import { Suspense, lazy } from "react";
import { WebGLErrorBoundary } from "./WebGLErrorBoundary";
import { isWebGLAvailable } from "@/lib/utils";

const NeuralThree = lazy(() =>
  import("./NeuralThree").then((m) => ({ default: m.NeuralThree }))
);

const hasWebGL = isWebGLAvailable();

export function NeuralBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      {hasWebGL ? (
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
