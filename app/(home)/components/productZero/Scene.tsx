"use client";

import FloatingCan from "@/components/cans/FloatingCan";
import { CONFIG, ResponsiveConfig } from "@/lib/data";
import { useResponsiveStore } from "@/store/useResponsiveStore";
import { useGSAP } from "@gsap/react";
import { Environment } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";
import { Group } from "three";

gsap.registerPlugin(ScrollTrigger);

/* ================= TYPES ================= */

type SceneProps = {
  flavor: "original" | "cherry" | "zero" | "lime" | "coffee";
};

type BreakpointKey = "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";

/* ================= COMPONENT ================= */

const Scene = ({ flavor }: SceneProps) => {
  const canRef = useRef<Group>(null);

  const breakpoint = useResponsiveStore((state) => state.breakpoint);
  const isReady = useResponsiveStore((state) => state.isReady);

  useGSAP(
    () => {
      if (!canRef.current || !isReady) return;

      const breakpointKey =
        breakpoint.toUpperCase() as Uppercase<BreakpointKey>;
      const config: ResponsiveConfig = CONFIG[breakpointKey].zero;
      if (!config) return;

      // Check if animation has already played this session
      const hasPlayedBefore =
        typeof window !== "undefined" &&
        sessionStorage.getItem("productZeroAnimPlayed") === "true";

      // Kill only this section's triggers
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === ".product-zero") {
          t.kill();
        }
      });

      // Set initial position
      gsap.set(canRef.current.position, config.position);

      // Scroll animation
      const scrollTL = gsap.timeline({
        scrollTrigger: {
          trigger: ".product-zero",
          start: "top 10%",
        },
      });

      if (!hasPlayedBefore) {
        // First visit - animate scale from zero
        scrollTL.fromTo(canRef.current.scale, config.scaleFrom, {
          ...config.scaleTo,
          duration: 0.4,
          ease: "back.out(1.7)",
          onComplete: () => {
            sessionStorage.setItem("productZeroAnimPlayed", "true");
          },
        });
      } else {
        // Return visit - set directly to final scale
        gsap.set(canRef.current.scale, config.scaleTo);
      }
    },
    { dependencies: [breakpoint, isReady] }
  );

  return (
    <group rotation={[0, 0, -0.1]} position={[0, 0, 0]}>
      <FloatingCan
        ref={canRef}
        flavor={flavor}
        rotationIntensity={1}
        floatIntensity={0.5}
        floatSpeed={2}
      />

      <directionalLight
        position={[0, 0, 5]}
        intensity={0.7}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <ambientLight intensity={10} />
      <pointLight position={[0, 1, 3]} intensity={6} />

      <Environment files="/hdr/studio.hdr" environmentIntensity={0.5} />
    </group>
  );
};

export default Scene;
