"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, lazy, useState, useEffect, useMemo } from "react";

// Lazy load the sidebar scene
const SidebarScene = lazy(() => import("./SidebarScene"));

// Lightweight loader while 3D loads
function SidebarLoader() {
  return (
    <div className="bg-secondary/90 absolute inset-0 flex items-center justify-center">
      <div className="border-primary h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" />
    </div>
  );
}

export default function SidebarCanvas() {
  const [hasLoaded, setHasLoaded] = useState(false);

  // Delay initial 3D load until after intro animation (1.5s should be enough)
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasLoaded(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Memoize the canvas config to prevent re-creation
  const canvasConfig = useMemo(
    () => ({
      camera: { position: [0, 0, 6] as [number, number, number], fov: 25 },
      gl: { alpha: true, antialias: true },
      style: {
        position: "absolute" as const,
        inset: 0,
        pointerEvents: "none" as const,
      },
      dpr: [1, 1.5] as [number, number],
    }),
    []
  );

  // Don't render if not yet loaded (during intro)
  if (!hasLoaded) {
    return <SidebarLoader />;
  }

  return (
    <Canvas {...canvasConfig}>
      <Suspense fallback={null}>
        <SidebarScene />
      </Suspense>
    </Canvas>
  );
}
