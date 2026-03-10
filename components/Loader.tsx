"use client";

import { Html, useProgress } from "@react-three/drei";
import { useAnimationStore } from "@/store/useAnimationStore";

export default function Loader() {
  const { progress } = useProgress();
  const introPlayed = useAnimationStore((state) => state.introPlayed);
  const isReady = progress === 100 || introPlayed;

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
              transition: "width 0.2s ease-out",
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
