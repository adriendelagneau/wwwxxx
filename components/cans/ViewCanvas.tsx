"use client";

import { useMeshStore } from "@/store/useMeshStore";
import { View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
// import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Suspense, useEffect, useState } from "react";

// Loading fallback component - shows while 3D assets load
function CanvasLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-transparent">
      <div className="flex flex-col items-center gap-4">
        <div className="border-primary h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
        <span className="text-primary font-poppins text-sm tracking-widest uppercase">
          Chargement...
        </span>
      </div>
    </div>
  );
}

const ViewCanvas = () => {
  const ready = useMeshStore((state) => state.ready);

  const [zIndex, setZIndex] = useState(30);




  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        pointerEvents: "none",
        zIndex,
      }}
      dpr={[1, 1.5]}
      // gl={{ antialias: true }}
      camera={{ fov: 30 }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <View.Port />
        {/* Postprocessing Bloom */}
      </Suspense>
    </Canvas>
  );
};

export default ViewCanvas;
