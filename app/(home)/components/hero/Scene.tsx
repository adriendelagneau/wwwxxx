"use client";

import FloatingCan from "@/components/cans/FloatingCan";
import { useAnimationStore } from "@/store/useAnimationStore";
import { useMeshStore } from "@/store/useMeshStore";
import { useResponsiveStore } from "@/store/useResponsiveStore";
import { CONFIG } from "@/lib/data";

import { useGSAP } from "@gsap/react";
import { Environment } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";
import { Group } from "three";

gsap.registerPlugin(ScrollTrigger);

/* ================= TYPES ================= */

type Breakpoint = "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";

/* ================= COMPONENT ================= */

function Scene() {
  const setMeshReady = useMeshStore((state) => state.isReady);
  const breakpoint = useResponsiveStore((state) => state.breakpoint);
  const isReady = useResponsiveStore((state) => state.isReady);

  const getIntroTimeline = useAnimationStore((state) => state.getIntroTimeline);

  const can1Ref = useRef<Group>(null);
  const can1GroupRef = useRef<Group>(null);
  const can3Ref = useRef<Group>(null);
  const can4Ref = useRef<Group>(null);
  const groupRef = useRef<Group>(null);

  // Map lowercase breakpoint to uppercase for CONFIG lookup
  const configKey = breakpoint.toUpperCase() as keyof typeof CONFIG;
  const config = CONFIG[configKey];

  const FLOAT_SPEED = 4;

  useGSAP(() => {
    if (
      !can1Ref.current ||
      !can1GroupRef.current ||
      !groupRef.current ||
      !isReady ||
      !config
    )
      return;

    setMeshReady();

    const introPlayed =
      typeof window !== "undefined" &&
      sessionStorage.getItem("introPlayed") === "true";
    const isMobile = breakpoint === "sm";

    /* ================= SET INITIAL STATE ================= */
    if (config.initial.can1.position) {
      gsap.to(can1Ref.current.position, {
        x: config.initial.can1.position.x ?? 0,
        y: config.initial.can1.position.y ?? 0,
        z: config.initial.can1.position.z ?? 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }
    if (config.initial.can1.rotation)
      gsap.to(can1Ref.current.rotation, {
        z: config.initial.can1.rotation.z ?? 0,
        duration: 0.5,
        ease: "power2.out",
      });
    if (config.initial.can1.scale)
      gsap.to(can1Ref.current.scale, {
        x: config.initial.can1.scale.x ?? 1,
        y: config.initial.can1.scale.y ?? 1,
        z: config.initial.can1.scale.z ?? 1,
        duration: 0.5,
        ease: "power2.out",
      });

    // Set initial positions for can3 and can4

    /* ================= INTRO TIMELINE INJECTION ================= */
    if (!introPlayed) {
      const tl = getIntroTimeline();
      if (!tl) return; // timeline not ready yet

      if (isMobile) {
        tl.to(
          can1Ref.current.scale,
          { x: 0.6, y: 0.6, z: 0.6, duration: 0.45, ease: "back.out(2)" },
          1.7 // after header
        );
      } else {
        if (config.intro.can1.from?.position) {
          const fromPos = config.intro.can1.from.position;
          tl.from(
            can1GroupRef.current.position,
            {
              x: fromPos.x ?? 0,
              y: fromPos.y ?? 0,
              z: fromPos.z ?? 0,
              duration: 1.2,
              ease: "back.out(0.7)",
            },
            1.6
          );
        }

        if (config.intro.can1.from?.rotation) {
          const fromRot = config.intro.can1.from.rotation;
          tl.from(
            can1GroupRef.current.rotation,
            {
              x: fromRot.x ?? 0,
              y: fromRot.y ?? 0,
              z: fromRot.z ?? 0,
              duration: 1.2,
              ease: "back.out(0.7)",
            },
            1.6
          );
        }
      }
    }

    /* ================= IF INTRO ALREADY PLAYED ================= */
    if (introPlayed) {
      if (isMobile)
        gsap.to(can1Ref.current.scale, {
          x: 0.6,
          y: 0.6,
          z: 0.6,
          duration: 0.5,
          ease: "power2.out",
        });
      else {
        gsap.to(can1GroupRef.current.position, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        });
        gsap.to(can1GroupRef.current.rotation, {
          z: 0,
          duration: 0.5,
          ease: "power2.out",
        });
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
      if (config.scroll.groupRotation)
        scrollTL.to(
          groupRef.current.rotation,
          { y: config.scroll.groupRotation.y ?? 0 },
          0
        );
      if (config.scroll.can1?.position)
        scrollTL.to(
          can1Ref.current.position,
          {
            x: config.scroll.can1.position.x ?? 0,
            y: config.scroll.can1.position.y ?? 0,
            z: config.scroll.can1.position.z ?? 0,
          },
          0
        );
      if (config.scroll.can1?.rotation)
        scrollTL.to(
          can1Ref.current.rotation,
          {
            x: config.scroll.can1.rotation.x ?? 0,
            y: config.scroll.can1.rotation.y ?? 0,
            z: config.scroll.can1.rotation.z ?? 0,
          },
          0
        );

      if (config.scroll.groupPosition) {
        const { duration, ease, ...position } = config.scroll.groupPosition;
        scrollTL.to(
          groupRef.current.position,
          { ...position, duration: duration || 2, ease: ease || "sine.inOut" },
          1.3
        );
      }
    }
  }, [breakpoint, isReady]);

  return (
    <group ref={groupRef}>
      <group ref={can1GroupRef}>
        <FloatingCan ref={can1Ref} flavor="original" floatSpeed={FLOAT_SPEED} />
      </group>
      {/* 
      <FloatingCan ref={can3Ref} flavor="cherry" floatSpeed={FLOAT_SPEED} />
      <FloatingCan ref={can4Ref} flavor="zero" floatSpeed={FLOAT_SPEED} /> */}

      <directionalLight position={[0, 0, 5]} intensity={0.7} castShadow />
      <ambientLight intensity={12} />
      <pointLight position={[0, 1, 3]} intensity={6} />

      <Environment files={"/hdr/pursky.hdr"} environmentIntensity={0.6} />
    </group>
  );
}

export default Scene;
