"use client";

import FloatingCan from "@/components/cans/FloatingCan";
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

type Breakpoint =  "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";

type ResponsiveConfig = {
  position: { x: number; y: number; z: number };
  scaleFrom: { x: number; y: number; z: number };
  scaleTo: { x: number; y: number; z: number };
};

/* ================= RESPONSIVE CONFIG ================= */

const PRODUCT_CONFIG: Record<Breakpoint, ResponsiveConfig> = {

  sm: {
    position: { x: 0, y: -0.4, z: 0 },
    scaleFrom: { x: 0, y: 0, z: 0 },
    scaleTo: { x: 0.65, y: 0.65, z: 0.65 },
  },
  md: {
    position: { x: 0.9, y: -0.2, z: 0 },
    scaleFrom: { x: 0, y: 0, z: 0 },
    scaleTo: { x: 0.75, y: 0.75, z: 0.75 },
  },
  lg: {
    position: { x: 1.2, y: -0.1, z: 0 },
    scaleFrom: { x: 0, y: 0, z: 0 },
    scaleTo: { x: 0.85, y: 0.85, z: 0.85 },
  },
  xl: {
    position: { x: 1.4, y: 0, z: 0 },
    scaleFrom: { x: 0, y: 0, z: 0 },
    scaleTo: { x: 0.95, y: 0.95, z: 0.95 },
  },
  xxl: {
    position: { x: 1.6, y: 0, z: 0 },
    scaleFrom: { x: 0, y: 0, z: 0 },
    scaleTo: { x: 1, y: 1, z: 1 },
  },
    xxxl: {
    position: { x: 1.6, y: 0, z: 0 },
    scaleFrom: { x: 0, y: 0, z: 0 },
    scaleTo: { x: 1, y: 1, z: 1 },
  },
};

/* ================= COMPONENT ================= */

const Scene = ({ flavor }: SceneProps) => {
  const canRef = useRef<Group>(null);

  const breakpoint = useResponsiveStore((state) => state.breakpoint);
  const isReady = useResponsiveStore((state) => state.isReady);

  useGSAP(
    () => {
      if (!canRef.current || !isReady) return;

      const config = PRODUCT_CONFIG[breakpoint];
      if (!config) return;

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

      scrollTL.fromTo(canRef.current.scale, config.scaleFrom, {
        ...config.scaleTo,
        duration: 0.4,
        ease: "back.out(1.7)",
      });
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
