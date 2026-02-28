"use client";

import FloatingCan from "@/components/cans/FloatingCan";
import { useAnimationStore } from "@/store/useAnimationStore";
import { useMeshStore } from "@/store/useMeshStore";
import { useResponsiveStore } from "@/store/useResponsiveStore";
import { CONFIG } from "@/lib/data";

import { useGSAP } from "@gsap/react";
import { Environment } from "@react-three/drei";
import gsap from "gsap";
import React, { useRef, useLayoutEffect } from "react";
import { Group } from "three";

/* ================= COMPONENT ================= */

function Scene() {
  const setMeshReady = useMeshStore((state) => state.isReady);
  const breakpoint = useResponsiveStore((state) => state.breakpoint);
  const isReady = useResponsiveStore((state) => state.isReady);

  const getIntroTimeline = useAnimationStore((state) => state.getIntroTimeline);

  const groupRef = useRef<Group>(null);
  const can1Ref = useRef<Group>(null);
  const can1GroupRef = useRef<Group>(null);

  const introPlayedRef = useRef(false);

  const configKey = breakpoint.toUpperCase() as keyof typeof CONFIG;
  const config = CONFIG[configKey];

  const FLOAT_SPEED = 4;

  /* ================= APPLY FINAL STATE ON RESIZE ================= */

  useLayoutEffect(() => {
    if (!config || !can1Ref.current || !can1GroupRef.current) return;

    if (!introPlayedRef.current) return;

    const final = config.final?.can1;
    if (!final) return;

    gsap.set(can1Ref.current.position, {
      x: final.position?.x ?? 0,
      y: final.position?.y ?? 0,
      z: final.position?.z ?? 0,
    });

    gsap.set(can1Ref.current.rotation, {
      x: final.rotation?.x ?? 0,
      y: final.rotation?.y ?? 0,
      z: final.rotation?.z ?? 0,
    });

    gsap.set(can1Ref.current.scale, {
      x: final.scale?.x ?? 1,
      y: final.scale?.y ?? 1,
      z: final.scale?.z ?? 1,
    });

    gsap.set(can1GroupRef.current.position, { x: 0, y: 0, z: 0 });
    gsap.set(can1GroupRef.current.rotation, { x: 0, y: 0, z: 0 });

  }, [breakpoint, config]);

  /* ================= INTRO ================= */

  useGSAP(
    () => {
      if (!isReady) return;
      if (!config) return;
      if (!can1Ref.current) return;
      if (!can1GroupRef.current) return;

      setMeshReady();

      const introTimeline = getIntroTimeline();
      if (!introTimeline) return;

      const initial = config.initial?.can1;
      const intro = config.intro?.can1;
      const final = config.final?.can1;

      /* ================= INITIAL STATE ================= */

      if (!introPlayedRef.current) {
        gsap.set(can1Ref.current.position, {
          x: initial?.position?.x ?? 0,
          y: initial?.position?.y ?? 0,
          z: initial?.position?.z ?? 0,
        });

        gsap.set(can1Ref.current.rotation, {
          x: initial?.rotation?.x ?? 0,
          y: initial?.rotation?.y ?? 0,
          z: initial?.rotation?.z ?? 0,
        });

        gsap.set(can1Ref.current.scale, {
          x: initial?.scale?.x ?? 1,
          y: initial?.scale?.y ?? 1,
          z: initial?.scale?.z ?? 1,
        });

        gsap.set(can1GroupRef.current.position, { x: 0, y: 0, z: 0 });
        gsap.set(can1GroupRef.current.rotation, { x: 0, y: 0, z: 0 });
      }

      /* ================= INTRO PLAY ================= */

      if (!introPlayedRef.current) {
        introPlayedRef.current = true;

        if (intro?.from?.position) {
          introTimeline.fromTo(
            can1GroupRef.current.position,
            {
              x: intro.from.position.x ?? 0,
              y: intro.from.position.y ?? 0,
              z: intro.from.position.z ?? 0,
            },
            {
              x: 0,
              y: 0,
              z: 0,
              duration: 1.2,
              ease: "back.out(1.4)",
            },
            1.6
          );
        }

        if (intro?.from?.rotation || intro?.to?.rotation) {
          introTimeline.fromTo(
            can1Ref.current.rotation,
            {
              x: intro.from?.rotation?.x ?? 0,
              y: intro.from?.rotation?.y ?? 0,
              z: intro.from?.rotation?.z ?? 0,
            },
            {
              x: intro.to?.rotation?.x ?? final?.rotation?.x ?? 0,
              y: intro.to?.rotation?.y ?? final?.rotation?.y ?? 0,
              z: intro.to?.rotation?.z ?? final?.rotation?.z ?? 0,
              duration: 1.2,
              ease: "back.out(1.4)",
            },
            1.6
          );
        }

        if (intro?.to?.scale) {
          introTimeline.to(
            can1Ref.current.scale,
            {
              x: intro.to.scale.x,
              y: intro.to.scale.y,
              z: intro.to.scale.z,
              duration: 0.8,
              ease: "back.out(2)",
            },
            1.7
          );
        }
      }

      /* ================= FINAL STATE IF INTRO ALREADY PLAYED ================= */

      else {
        gsap.set(can1Ref.current.position, {
          x: final?.position?.x ?? 0,
          y: final?.position?.y ?? 0,
          z: final?.position?.z ?? 0,
        });

        gsap.set(can1Ref.current.rotation, {
          x: final?.rotation?.x ?? 0,
          y: final?.rotation?.y ?? 0,
          z: final?.rotation?.z ?? 0,
        });

        gsap.set(can1Ref.current.scale, {
          x: final?.scale?.x ?? 1,
          y: final?.scale?.y ?? 1,
          z: final?.scale?.z ?? 1,
        });

        gsap.set(can1GroupRef.current.position, { x: 0, y: 0, z: 0 });
        gsap.set(can1GroupRef.current.rotation, { x: 0, y: 0, z: 0 });
      }
    },
    { dependencies: [breakpoint, isReady], scope: groupRef }
  );

  /* ================= JSX ================= */

  return (
    <group ref={groupRef}>
      <group ref={can1GroupRef}>
        <FloatingCan
          ref={can1Ref}
          flavor="original"
          floatSpeed={FLOAT_SPEED}
        />
      </group>

      <directionalLight position={[0, 0, 5]} intensity={0.7} castShadow />
      <ambientLight intensity={12} />
      <pointLight position={[0, 1, 3]} intensity={6} />

      <Environment
        files={"/hdr/pursky.hdr"}
        environmentIntensity={0.6}
      />
    </group>
  );
}

export default Scene;