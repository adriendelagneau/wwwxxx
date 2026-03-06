"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { BackgroundShader } from "./BackgroundShader";

export default function BackgroundCanvas() {
  const [ready, setReady] = useState(false);

  return (
    <div
      className={`fixed inset-0 z-5 transition-opacity duration-700 ${
        ready ? "opacity-100" : "opacity-0"
      }`}
      style={{ backgroundColor: "#591420", willChange: "opacity" }}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ fov: 30 }}
        style={{ pointerEvents: "none" }}
        gl={{ alpha: false }}
      >
        <color attach="background" args={["#591420"]} />
        <Suspense fallback={null}>
          <BackgroundShader onReady={() => setReady(true)} />
        </Suspense>
      </Canvas>
    </div>
  );
}
