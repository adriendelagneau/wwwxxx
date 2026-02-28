"use client";

import FloatingCan from "@/components/cans/FloatingCan";
import { useMeshStore } from "@/store/useMeshStore";
import { useResponsiveStore } from "@/store/useResponsiveStore";
import { CONFIG } from "@/lib/data";

import { useGSAP } from "@gsap/react";
import { Environment } from "@react-three/drei";
import gsap from "gsap";
import React, { useRef } from "react";
import { Group } from "three";

/* ================= COMPONENT ================= */

function Scene() {
  const setMeshReady = useMeshStore((state) => state.isReady);
  const breakpoint = useResponsiveStore((state) => state.breakpoint);
  const isReady = useResponsiveStore((state) => state.isReady);

  const groupRef = useRef<Group>(null);
  const can1Ref = useRef<Group>(null);
  const can1GroupRef = useRef<Group>(null);

  const configKey = breakpoint.toUpperCase() as keyof typeof CONFIG;
  const config = CONFIG[configKey];

  const FLOAT_SPEED = 4;

  /* ================= GSAP INTRO ================= */
  useGSAP(
    () => {
      if (!isReady || !config || !can1Ref.current || !can1GroupRef.current)
        return;

      setMeshReady();

      const intro = config.intro?.can1;
      const final = config.final?.can1;

      // Check sessionStorage - do this fresh each render
      const hasPlayedBefore =
        typeof window !== "undefined" &&
        sessionStorage.getItem("introPlayed") === "true";

      // FIRST VISIT - play intro animation
      if (!hasPlayedBefore) {
        // Set initial position
        if (intro?.from?.position) {
          gsap.set(can1GroupRef.current.position, {
            x: intro.from.position.x ?? 0,
            y: intro.from.position.y ?? 0,
            z: intro.from.position.z ?? 0,
          });
        }

        if (intro?.from?.rotation) {
          gsap.set(can1Ref.current.rotation, {
            x: intro.from.rotation.x ?? 0,
            y: intro.from.rotation.y ?? 0,
            z: intro.from.rotation.z ?? 0,
          });
        }

        if (intro?.from?.scale) {
          gsap.set(can1Ref.current.scale, {
            x: intro.from.scale.x ?? 1,
            y: intro.from.scale.y ?? 1,
            z: intro.from.scale.z ?? 1,
          });
        }

        // Animate to final position
        if (intro?.to?.position) {
          gsap.to(can1GroupRef.current.position, {
            x: intro.to.position.x ?? 0,
            y: intro.to.position.y ?? 0,
            z: intro.to.position.z ?? 0,
            duration: 1.2,
            ease: "back.out(1.4)",
            delay: 1.6,
          });
        }

        if (intro?.to?.rotation) {
          gsap.to(can1Ref.current.rotation, {
            x: intro.to.rotation.x ?? final?.rotation?.x ?? 0,
            y: intro.to.rotation.y ?? final?.rotation?.y ?? 0,
            z: intro.to.rotation.z ?? final?.rotation?.z ?? 0,
            duration: 1.2,
            ease: "back.out(1.4)",
            delay: 1.6,
          });
        }

        if (intro?.to?.scale) {
          gsap.to(can1Ref.current.scale, {
            x: intro.to.scale.x,
            y: intro.to.scale.y,
            z: intro.to.scale.z,
            duration: 0.8,
            ease: "back.out(2)",
            delay: 1.7,
            onComplete: () => {
              sessionStorage.setItem("introPlayed", "true");
            },
          });
        }
      }
      // RETURNING VISITOR - go directly to final
      else if (final) {
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
      }
    },
    { dependencies: [breakpoint, isReady], scope: groupRef }
  );

  /* ================= JSX ================= */
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
