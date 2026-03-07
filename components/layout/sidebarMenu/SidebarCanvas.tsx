"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, lazy, useState, useEffect, useMemo } from "react";
import { useMenuStore } from "@/store/useMenuStore";

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
  const isMenuOpen = useMenuStore((state) => state.isMenuOpen);

  // Only start loading 3D after menu is opened AND intro animation is complete (2.5s should be enough)
  useEffect(() => {
    if (!isMenuOpen) {
      // Reset when menu closes
      setHasLoaded(false);
      return;
    }

    const timer = setTimeout(() => {
      setHasLoaded(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, [isMenuOpen]);

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

  // Don't render if menu is not open
  if (!isMenuOpen) {
    return null;
  }

  // Show loader while 3D is loading
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
