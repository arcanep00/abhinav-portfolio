import { NeuralCanvas2D } from "./NeuralCanvas2D";
import { Suspense, lazy } from "react";
import { WebGLErrorBoundary } from "./WebGLErrorBoundary";
import { isWebGLAvailable } from "@/lib/utils";

const NeuralThree = lazy(() =>
  import("./NeuralThree").then((m) => ({ default: m.NeuralThree }))
);

export function NeuralBackground() {
  const webgl = isWebGLAvailable();

  return (
    <div className="absolute inset-0 -z-10">
      {webgl ? (
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
