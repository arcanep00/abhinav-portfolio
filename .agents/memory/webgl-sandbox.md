---
name: WebGL in Replit sandbox
description: Replit's preview iframe runs in a GPU-less sandbox — WebGL always fails there. Probe before mounting, don't rely on ErrorBoundary alone.
---

# WebGL in Replit sandbox

The Replit preview environment has no GPU (`BindToCurrentSequence failed`). Three.js `WebGLRenderer` always throws when the page loads in the preview/screenshot tool.

**Why:** The Vite dev `runtimeErrorOverlay` plugin intercepts the thrown error before React's ErrorBoundary can catch it, so the red overlay appears even though the boundary is in place.

**How to apply:**
1. Call `isWebGLAvailable()` (try/catch canvas.getContext("webgl")) synchronously before rendering any `<Canvas>`.
2. If WebGL is not available, skip the lazy import entirely and render the CSS/Canvas2D fallback immediately.
3. Lazy-load (`React.lazy` + dynamic `import()`) the Three.js Canvas components so they are never bundled into the initial chunk when WebGL is unavailable — this also avoids Vite's static import resolution from firing on pages that never need it.
4. Keep `three` and `@react-three/fiber` in `resolve.dedupe` in vite.config.ts to prevent the "Multiple instances of Three.js" warning when both packages import Three.
