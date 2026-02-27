"use client";

import FloatingCan from "@/components/cans/FloatingCan";
import {
  useMeshStore,
  useResponsiveStore,
  useIntroAnimationStore,
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
    can3?: {
      position?: { x: number; y: number; z: number };
      rotation?: { z: number };
    };
    can4?: {
      position?: { x: number; y: number; z: number };
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
    can1: {
      position: { x: 0, y: -0.6 },
      scale: { x: 0, y: 0, z: 0 },
    },
    can3: { position: { x: 0, y: 5, z: -1 } },
    can4: { position: { x: 2, y: -4.5, z: 2 } },
    scrollAnimations: {
      group: { rotation: { y: Math.PI * 2 } },
    },
  },

  sm: {
    can1: {
      position: { x: 0, y: -0.6 },
      scale: { x: 0, y: 0, z: 0 },
    },
    can3: { position: { x: 0, y: 5, z: -1 } },
    can4: { position: { x: 2, y: -4.5, z: 2 } },
    scrollAnimations: {
      group: { rotation: { y: Math.PI * 2 } },
    },
  },

  md: {
    can1: {
      position: { x: 1.7, y: -0.1 },
      rotation: { z: -0.1 },
      scale: { x: 1, y: 1, z: 1 },
    },
    can3: { position: { x: 0, y: 5, z: -1 } },
    can4: { position: { x: 2, y: -4.5, z: 2 } },

    can1Group: {
      introFrom: { y: 5, x: 1 },
      introRotationFrom: { z: 3 },
    },

    scrollAnimations: {
      group: {
        rotation: { y: Math.PI * 2 },
        position: { x: 1, duration: 3, ease: "sine.inOut" },
        positionDelay: 1.3,
      },

      can1: {
        position: { x: 0.1 },
        rotation: { z: 0 },
      },

      can3: {
        position: { x: 0.8, y: 0, z: -0.8 },
        rotation: { z: -0.3 },
      },

      can4: {
        position: { x: -0.5, y: 0, z: -0.5 },
        rotation: { z: 0.3 },
      },
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
  const setIntroConfig = useIntroAnimationStore((state) => state.setConfig);

  const can1Ref = useRef<Group>(null);

  const can1GroupRef = useRef<Group>(null);
  const groupRef = useRef<Group>(null);

  const FLOAT_SPEED = 4;

  useGSAP(
    () => {
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

      const isMobile = breakpoint === "isMobile" || breakpoint === "sm";

      // Share intro animation config with other components
      setIntroConfig({
        introFrom: config.can1Group?.introFrom,
        introRotationFrom: config.can1Group?.introRotationFrom,
        scaleFrom: isMobile ? { x: 0, y: 0, z: 0 } : undefined,
        scaleTo: isMobile ? { x: 0.6, y: 0.6, z: 0.6 } : undefined,
      });

      const introPlayed =
        typeof window !== "undefined" &&
        sessionStorage.getItem("introPlayed") === "true";

      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === ".hero") t.kill();
      });

      /* ================= INITIAL STATE ================= */

      gsap.set(can1Ref.current.position, config.can1.position);

      if (config.can1.rotation)
        gsap.set(can1Ref.current.rotation, config.can1.rotation);

      if (config.can1.scale) gsap.set(can1Ref.current.scale, config.can1.scale);

      /* ================= INTRO (PLAY ONLY IF NOT PLAYED) ================= */

      if (!introPlayed && window.scrollY < 20) {
        if (isMobile) {
          gsap.to(can1Ref.current.scale, {
            x: 0.6,
            y: 0.6,
            z: 0.6,
            duration: 0.45,
            ease: "back.out(2)",
            delay: 1.6,
          });
        } else {
          const introTL = gsap.timeline({
            defaults: {
              duration: 1,
              delay: 1.3,
              ease: "back.out(1)",
            },
          });

          if (config.can1Group?.introFrom)
            introTL.from(
              can1GroupRef.current.position,
              config.can1Group.introFrom,
              0
            );

          if (config.can1Group?.introRotationFrom)
            introTL.from(
              can1GroupRef.current.rotation,
              config.can1Group.introRotationFrom,
              0
            );
        }
      }

      /* ================= IF INTRO ALREADY PLAYED ================= */

      if (introPlayed) {
        if (isMobile) {
          gsap.set(can1Ref.current.scale, {
            x: 0.6,
            y: 0.6,
            z: 0.6,
          });
        } else {
          gsap.set(can1GroupRef.current.position, { x: 0, y: 0 });
          gsap.set(can1GroupRef.current.rotation, { z: 0 });
        }
      }

      /* ================= SCROLL ================= */

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
            scrollAnimations.group.rotation
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
          const { duration, ease, ...position } =
            scrollAnimations.group.position;

          scrollTL.to(
            groupRef.current.position,
            {
              ...position,
              duration: duration || 3,
              ease: ease || "sine.inOut",
            },
            scrollAnimations.group.positionDelay || 1.3
          );
        }
      }
    },
    { dependencies: [breakpoint, isReady] }
  );

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

