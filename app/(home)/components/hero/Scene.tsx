"use client";

import FloatingCan from "@/components/cans/FloatingCan";
import {
  useAnimationStore,
  useMeshStore,
  useResponsiveStore,
} from "@/store/useZuStore";

import { useGSAP } from "@gsap/react";
import { Environment } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";
import { Group } from "three";

gsap.registerPlugin(ScrollTrigger);

/* ================= TYPES ================= */

type Breakpoint = "isMobile" | "sm" | "md" | "lg" | "xl" | "xxl";

type CanConfig = {
  position: { x: number; y: number; z?: number };
  rotation?: { z: number };
  scale?: { x: number; y: number; z: number };
};

type HeroResponsiveConfig = {
  can1: CanConfig;
  can3: CanConfig;
  can4: CanConfig;
  can1Group?: {
    introFrom?: { y: number; x: number };
    introRotationFrom?: { z: number };
  };
  scrollAnimations: {
    can1?: {
      position?: { x: number };
      rotation?: { z: number };
    };
    group?: {
      rotation?: { y: number };
      position?: { x: number; duration?: number; ease?: string };
      positionDelay?: number;
    };
  };
};

/* ================= RESPONSIVE CONFIG ================= */

const HERO_CONFIG: Record<Breakpoint, HeroResponsiveConfig> = {
  isMobile: {
    can1: { position: { x: 0, y: -0.6 }, scale: { x: 0, y: 0, z: 0 } },
    can3: { position: { x: 0, y: 5, z: -1 } },
    can4: { position: { x: 2, y: -4.5, z: 2 } },
    scrollAnimations: { group: { rotation: { y: Math.PI * 2 } } },
  },
  sm: {
    can1: { position: { x: 0, y: -0.6 }, scale: { x: 0, y: 0, z: 0 } },
    can3: { position: { x: 0, y: 5, z: -1 } },
    can4: { position: { x: 2, y: -4.5, z: 2 } },
    scrollAnimations: { group: { rotation: { y: Math.PI * 2 } } },
  },
  md: {
    can1: {
      position: { x: 1.7, y: -0.1 },
      rotation: { z: -0.1 },
      scale: { x: 1, y: 1, z: 1 },
    },
    can3: { position: { x: 0, y: 5, z: -1 } },
    can4: { position: { x: 2, y: -4.5, z: 2 } },
    can1Group: { introFrom: { y: 5, x: 1 }, introRotationFrom: { z: 3 } },
    scrollAnimations: {
      group: {
        rotation: { y: Math.PI * 2 },
        position: { x: 1, duration: 3, ease: "sine.inOut" },
        positionDelay: 1.3,
      },
      can1: { position: { x: 0.1 }, rotation: { z: 0 } },
    },
  },
  lg: {} as any,
  xl: {} as any,
  xxl: {} as any,
};

HERO_CONFIG.lg = HERO_CONFIG.md;
HERO_CONFIG.xl = HERO_CONFIG.md;
HERO_CONFIG.xxl = HERO_CONFIG.md;

/* ================= COMPONENT ================= */

function Scene() {
  const meshReady = useMeshStore((state) => state.isReady);
  const breakpoint = useResponsiveStore((state) => state.breakpoint);
  const isReady = useResponsiveStore((state) => state.isReady);

  const getIntroTimeline = useAnimationStore((state) => state.getIntroTimeline);

  const can1Ref = useRef<Group>(null);
  const can1GroupRef = useRef<Group>(null);
  const groupRef = useRef<Group>(null);

  const FLOAT_SPEED = 4;

  useGSAP(() => {
    if (
      !can1Ref.current ||
      !can1GroupRef.current ||
      !groupRef.current ||
      !isReady
    )
      return;

    meshReady();

    const config = HERO_CONFIG[breakpoint];
    if (!config) return;

    const introPlayed =
      typeof window !== "undefined" &&
      sessionStorage.getItem("introPlayed") === "true";
    const isMobile = breakpoint === "isMobile" || breakpoint === "sm";

    /* ================= SET INITIAL STATE ================= */
    gsap.set(can1Ref.current.position, config.can1.position);
    if (config.can1.rotation)
      gsap.set(can1Ref.current.rotation, config.can1.rotation);
    if (config.can1.scale) gsap.set(can1Ref.current.scale, config.can1.scale);

    /* ================= INTRO TIMELINE INJECTION ================= */
    if (!introPlayed) {
      const tl = getIntroTimeline();
      if (!tl) return; // timeline not ready yet

      if (isMobile) {
        tl.to(
          can1Ref.current.scale,
          { x: 0.6, y: 0.6, z: 0.6, duration: 0.45, ease: "back.out(2)" },
          1.8 // after header
        );
      } else {
        if (config.can1Group?.introFrom)
          tl.from(
            can1GroupRef.current.position,
            {
              ...config.can1Group.introFrom,
              duration: 1.2,
              ease: "back.out(0.7)",
            },
            1.6
          );

        if (config.can1Group?.introRotationFrom)
          tl.from(
            can1GroupRef.current.rotation,
            {
              ...config.can1Group.introRotationFrom,
              duration: 1.2,
              ease: "back.out(0.7)",
            },
            1.6
          );
      }
    }

    /* ================= IF INTRO ALREADY PLAYED ================= */
    if (introPlayed) {
      if (isMobile) gsap.set(can1Ref.current.scale, { x: 0.6, y: 0.6, z: 0.6 });
      else {
        gsap.set(can1GroupRef.current.position, { x: 0, y: 0 });
        gsap.set(can1GroupRef.current.rotation, { z: 0 });
      }
    }

    /* ================= CLEAN OLD SCROLLTRIGGERS ================= */
    ScrollTrigger.getAll().forEach((t) => {
      if (t.vars.trigger === ".hero") t.kill();
    });

    /* ================= SCROLL ANIMATIONS ================= */
    const scrollTL = gsap.timeline({
      defaults: { duration: 2 },
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    if (isMobile) {
      scrollTL.to(can1Ref.current.rotation, { y: Math.PI * 2 }, 0);
    } else {
      const { scrollAnimations } = config;
      if (scrollAnimations.group?.rotation)
        scrollTL.to(
          groupRef.current.rotation,
          scrollAnimations.group.rotation,
          0
        );
      if (scrollAnimations.can1?.position)
        scrollTL.to(
          can1Ref.current.position,
          scrollAnimations.can1.position,
          0
        );
      if (scrollAnimations.can1?.rotation)
        scrollTL.to(
          can1Ref.current.rotation,
          scrollAnimations.can1.rotation,
          0
        );
      if (scrollAnimations.group?.position) {
        const { duration, ease, ...position } = scrollAnimations.group.position;
        scrollTL.to(
          groupRef.current.position,
          { ...position, duration: duration || 3, ease: ease || "sine.inOut" },
          scrollAnimations.group.positionDelay || 1.3
        );
      }
    }
  }, [breakpoint, isReady]);

  return (
    <group ref={groupRef}>
      <group ref={can1GroupRef}>
        <FloatingCan ref={can1Ref} flavor="original" floatSpeed={FLOAT_SPEED} />
      </group>

      <directionalLight position={[0, 0, 5]} intensity={0.7} castShadow />
      <ambientLight intensity={12} />
      <pointLight position={[0, 1, 3]} intensity={8} />

      <Environment files={"/hdr/pursky.hdr"} environmentIntensity={0.6} />
    </group>
  );
}

export default Scene;
