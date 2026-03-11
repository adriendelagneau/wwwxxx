"use client";

import { Html } from "@react-three/drei";
import { useAnimationStore } from "@/store/useAnimationStore";
import { useEffect, useState, useRef } from "react";
import * as THREE from "three";

export default function Loader() {
  // Use THREE.DefaultLoadingManager to track ALL loading across ALL Canvases
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(false);

  // Use refs to track maximum progress (never go backwards)
  const maxProgressRef = useRef(0);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    const manager = THREE.DefaultLoadingManager;

    const onStart = (url: string, itemsLoaded: number, itemsTotal: number) => {
      setActive(true);
      hasStartedRef.current = true;
    };

    const onProgress = (
      url: string,
      loadedItems: number,
      totalItems: number
    ) => {
      // Calculate percentage
      const percent = totalItems > 0 ? (loadedItems / totalItems) * 100 : 0;

      // Only update if this is higher than our max (never go backwards)
      if (percent > maxProgressRef.current) {
        maxProgressRef.current = percent;
        setProgress(percent);
      }
    };

    const onLoad = () => {
      // Even if one canvas finishes, we might have others still loading
      // Only mark complete if we've seen significant progress
      if (maxProgressRef.current >= 99) {
        setProgress(100);
        setActive(false);
      }
    };

    const onError = (url: string) => {
      console.error("Error loading:", url);
    };

    manager.onStart = onStart;
    manager.onProgress = onProgress;
    manager.onLoad = onLoad;
    manager.onError = onError;

    // Check if already loaded
    if ((manager as unknown as { itemsTotal: number }).itemsTotal > 0) {
      setProgress(100);
      setActive(false);
      maxProgressRef.current = 100;
    }

    return () => {
      // Reset handlers
      manager.onStart = () => {};
      manager.onProgress = () => {};
      manager.onLoad = () => {};
      manager.onError = () => {};
    };
  }, []);

  // Debug log
  console.log("Loader:", progress, active);

  const introPlayed = useAnimationStore((state) => state.introPlayed);
  const isReady = progress >= 100 || introPlayed;

  return (
    <Html
      center
      style={{
        opacity: isReady ? 0 : 1,
        zIndex: isReady ? -5 : 50,
        pointerEvents: isReady ? "none" : "auto",
        transition: "opacity 0.5s ease-out",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: "200px",
            height: "4px",
            background: "rgba(0,0,0,0.1)",
            borderRadius: "2px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "#f5ddd2",
              transition: "width 0.3s ease-out",
            }}
          />
        </div>
        <p
          style={{
            marginTop: "1rem",
            fontFamily: "var(--font-poppins)",
            fontSize: "0.875rem",
            color: "#f5ddd2",
          }}
        >
          {Math.round(progress)}%
        </p>
      </div>
    </Html>
  );
}
