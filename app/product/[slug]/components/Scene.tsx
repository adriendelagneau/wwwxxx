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
  scaleFrom: { x: number; y: number; z: number };
  scaleTo: { x: number; y: number; z: number };
  scrollAnimations: {
    position: { y: number; x: number };
    scale: { x: number; y: number; z: number };
  };
};

/* ================= RESPONSIVE CONFIG ================= */

const HERO_SINGLE_CONFIG: Record<Breakpoint, ResponsiveConfig> = {
  sm: {
    scaleFrom: { x: 0, y: 0, z: 0 },
    scaleTo: { x: 0.7, y: 0.7, z: 0.7 },
    scrollAnimations: {
      position: { y: -0.2, x: 0.5 },
      scale: { x: 0.75, y: 0.75, z: 0.75 },
    },
  },
  md: {
    scaleFrom: { x: 0, y: 0, z: 0 },
    scaleTo: { x: 0.8, y: 0.8, z: 0.8 },
    scrollAnimations: {
      position: { y: -0.22, x: 1 },
      scale: { x: 0.85, y: 0.85, z: 0.85 },
    },
  },
  lg: {
    scaleFrom: { x: 0, y: 0, z: 0 },
    scaleTo: { x: 0.85, y: 0.85, z: 0.85 },
    scrollAnimations: {
      position: { y: -0.25, x: 1.5 },
      scale: { x: 0.95, y: 0.95, z: 0.95 },
    },
  },
  xl: {
    scaleFrom: { x: 0, y: 0, z: 0 },
    scaleTo: { x: 0.85, y: 0.85, z: 0.85 },
    scrollAnimations: {
      position: { y: -0.25, x: 1.5 },
      scale: { x: 0.95, y: 0.95, z: 0.95 },
    },
  },
  xxl: {
    scaleFrom: { x: 0, y: 0, z: 0 },
    scaleTo: { x: 0.85, y: 0.85, z: 0.85 },
    scrollAnimations: {
      position: { y: -0.25, x: 1.5 },
      scale: { x: 0.95, y: 0.95, z: 0.95 },
    },
  },
   xxxl: {
    scaleFrom: { x: 0, y: 0, z: 0 },
    scaleTo: { x: 0.85, y: 0.85, z: 0.85 },
    scrollAnimations: {
      position: { y: -0.25, x: 1.5 },
      scale: { x: 0.95, y: 0.95, z: 0.95 },
    },
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

      const config = HERO_SINGLE_CONFIG[breakpoint];
      if (!config) return;

      // Kill existing ScrollTriggers for this section
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === ".hero-single") {
          t.kill();
        }
      });

      // Intro scale animation
      gsap.fromTo(canRef.current.scale, config.scaleFrom, {
        ...config.scaleTo,
        ease: "back.out(1)",
      });

      // Scroll animation
      const scrollTL = gsap.timeline({
        defaults: {
          duration: 2,
        },
        scrollTrigger: {
          trigger: ".hero-single",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      scrollTL.add("halfway", scrollTL.duration() / 1.5);

      scrollTL
        .to(canRef.current.rotation, { y: Math.PI * 2 }, 0)
        .to(canRef.current.position, config.scrollAnimations.position, 2)
        .to(
          canRef.current.scale,
          {
            ...config.scrollAnimations.scale,
            ease: "back.out(1)",
          },
          2
        );
    },
    { dependencies: [breakpoint, isReady] }
  );

  return (
    <>
      <group rotation={[0, 0, 0.2]}>
        <FloatingCan
          ref={canRef}
          flavor={flavor}
          rotationIntensity={1}
          floatIntensity={1}
          floatSpeed={3}
        />
      </group>
      <directionalLight
        position={[0, 0, 5]}
        intensity={0.7}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <ambientLight intensity={10} />
      <pointLight position={[-0, 1, 3]} intensity={6} />
      <Environment files={"/hdr/studio.hdr"} environmentIntensity={0.5} />
    </>
  );
};

export default Scene;
