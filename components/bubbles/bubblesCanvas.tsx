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
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{
        fov: 30,
      }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <Environment files="/hdr/studio.hdr" environmentIntensity={0.3} />
        <Bubbles />
      </Suspense>
    </Canvas>
  );
};
