"use client";

import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import { Bubbles } from "./bubbles";

export const BubblesCanvas = () => {
  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        overflow: "hidden",
        pointerEvents: "none",
        width: "100%",
        height: "100vh",
        zIndex: 10,
      }}
      // Disabled shadows - bubbles don't cast/receive shadows
      dpr={[1, 1.25]}
      // Optimized WebGL context
      gl={{
        antialias: false, // Disabled - bubbles are small and transparent
        alpha: true,
        powerPreference: "high-performance",
      }}
      camera={{
        fov: 30,
        near: 0.1,
        far: 100,
      }}
    >
      <Suspense fallback={null}>
        {/* Simplified lighting - just ambient for transparent bubbles */}
        <ambientLight intensity={1} />
        {/* Single point light for basic depth perception */}
        <pointLight position={[0, 2, 5]} intensity={2} />
        {/* Preload environment to avoid pop-in */}
        <Environment
          files="/hdr/studio.hdr"
          environmentIntensity={0.3}
          background={false}
        />
        <Bubbles />
      </Suspense>
    </Canvas>
  );
};
