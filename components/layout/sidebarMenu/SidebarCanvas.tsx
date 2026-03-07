"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, lazy, useState, useEffect, useMemo } from "react";
import { useMenuStore } from "@/store/useMenuStore";
import { useAnimationStore } from "@/store/useAnimationStore";

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
  const introPlayed = useAnimationStore((state) => state.introPlayed);

  // Only start loading 3D after intro animation has completed
  useEffect(() => {
    if (introPlayed) {
      setHasLoaded(true);
    } else {
      // Listen for intro completion via sessionStorage
      const interval = setInterval(() => {
        const played = sessionStorage.getItem("introPlayed") === "true";
        if (played) {
          setHasLoaded(true);
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [introPlayed]);

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

  // Show loader while waiting for intro to complete or 3D to load
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
