"use client";

import FloatingCan from "@/components/cans/FloatingCan";
import { useAnimationStore } from "@/store/useAnimationStore";
import { useMeshStore } from "@/store/useMeshStore";
import { useResponsiveStore } from "@/store/useResponsiveStore";
import { CONFIG } from "@/lib/data";

import { useGSAP } from "@gsap/react";
import { Environment } from "@react-three/drei";
import gsap from "gsap";
import React, { useRef, useEffect } from "react";
import { Group } from "three";

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
  const groupRef = useRef<Group>(null);

  // Map lowercase breakpoint to uppercase for CONFIG lookup
  const configKey = breakpoint.toUpperCase() as keyof typeof CONFIG;
  const config = CONFIG[configKey];

  const FLOAT_SPEED = 4;

  // Check session storage once on mount
  const introPlayed = useRef(
    typeof window !== "undefined" &&
      sessionStorage.getItem("introPlayed") === "true"
  );

  useEffect(() => {
    // When breakpoint changes or coming from another page, immediately set to final position
    if (!config || !can1Ref.current || !can1GroupRef.current) return;

    const isMobile = breakpoint === "sm";

    if (introPlayed.current || !config.final) {
      // Already played or no config - go directly to final position
      if (config.final.can1) {
        const { position, rotation, scale } = config.final.can1;

        if (position) {
          gsap.to(can1Ref.current.position, {
            x: position.x ?? 0,
            y: position.y ?? 0,
            z: position.z ?? 0,
            duration: 0.3,
            ease: "power2.out",
          });
        }

        if (rotation) {
          gsap.to(can1Ref.current.rotation, {
            x: rotation.x ?? 0,
            y: rotation.y ?? 0,
            z: rotation.z ?? 0,
            duration: 0.3,
            ease: "power2.out",
          });
        }

        if (scale) {
          gsap.to(can1Ref.current.scale, {
            x: scale.x ?? 1,
            y: scale.y ?? 1,
            z: scale.z ?? 1,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      }

      // Also reset group position/rotation
      gsap.to(can1GroupRef.current.position, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.3,
      });
      gsap.to(can1GroupRef.current.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.3,
      });
    }
  }, [breakpoint, config]);

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

    const isMobile = breakpoint === "sm";

    /* ================= SET INITIAL STATE ================= */
    // Set initial position based on config
    if (config.initial.can1) {
      const { position, rotation, scale } = config.initial.can1;

      if (position) {
        gsap.set(can1Ref.current.position, {
          x: position.x ?? 0,
          y: position.y ?? 0,
          z: position.z ?? 0,
        });
      }
      if (rotation) {
        gsap.set(can1Ref.current.rotation, {
          x: rotation.x ?? 0,
          y: rotation.y ?? 0,
          z: rotation.z ?? 0,
        });
      }
      if (scale) {
        gsap.set(can1Ref.current.scale, {
          x: scale.x ?? 1,
          y: scale.y ?? 1,
          z: scale.z ?? 1,
        });
      }
    }

    /* ================= INTRO TIMELINE ================= */
    if (!introPlayed.current) {
      const tl = getIntroTimeline();
      if (!tl) return;

      if (isMobile) {
        // Mobile: simple scale animation
        tl.to(
          can1Ref.current.scale,
          { x: 0.55, y: 0.55, z: 0.55, duration: 0.45, ease: "back.out(2)" },
          1.7
        );
      } else {
        // Desktop: animate from intro position to final
        if (config.intro.can1?.from?.position) {
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

        if (config.intro.can1?.from?.rotation) {
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
    } else {
      // Already played - go directly to final state
      if (isMobile) {
        gsap.to(can1Ref.current.scale, {
          x: 0.55,
          y: 0.55,
          z: 0.55,
          duration: 0.5,
          ease: "power2.out",
        });
      } else {
        gsap.to(can1GroupRef.current.position, {
          x: 0,
          y: 0,
          z: 0,
          duration: 0.5,
          ease: "power2.out",
        });
        gsap.to(can1GroupRef.current.rotation, {
          x: 0,
          y: 0,
          z: 0,
          duration: 0.5,
          ease: "power2.out",
        });
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
      <pointLight position={[0, 1, 3]} intensity={6} />

      <Environment files={"/hdr/pursky.hdr"} environmentIntensity={0.6} />
    </group>
  );
}

export default Scene;
