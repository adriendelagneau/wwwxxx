"use client";

import FloatingCan from "@/components/cans/FloatingCan";
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

/* ================= COMPONENT ================= */

function Scene() {
  const setMeshReady = useMeshStore((state) => state.isReady);
  const breakpoint = useResponsiveStore((state) => state.breakpoint);
  const isReady = useResponsiveStore((state) => state.isReady);

  const groupRef = useRef<Group>(null);
  const can1Ref = useRef<Group>(null);
  const can3Ref = useRef<Group>(null);
  const can4Ref = useRef<Group>(null);

  const configKey = breakpoint.toUpperCase() as keyof typeof CONFIG;
  const config = CONFIG[configKey];

  const FLOAT_SPEED = 4;

  /* ================= GSAP INTRO ================= */

  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      if (!isReady || !config || !can1Ref.current) return;

      setMeshReady();
      // Kill existing ScrollTriggers for this section
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === ".hero") {
          t.kill();
        }
      });
      const intro = config.intro?.can1;
      const final = config.final?.can1;

      const hasPlayedBefore =
        typeof window !== "undefined" &&
        sessionStorage.getItem("introPlayed") === "true";

      /* ================= FIRST VISIT ================= */

      if (!hasPlayedBefore) {
        // initial position
        if (intro?.from?.position) {
          gsap.set(can1Ref.current.position, {
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

        // animate to intro target
        if (intro?.to?.position) {
          gsap.to(can1Ref.current.position, {
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
      } else if (final) {
        /* ================= RETURN VISIT ================= */
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
      }

      /* ================= SCROLL ANIMATIONS ================= */

      const scrollAnimations = config.scroll;
      const heroElement = document.querySelector(".hero");

      if (
        scrollAnimations &&
        groupRef.current &&
        can1Ref.current &&
        can3Ref.current &&
        can4Ref.current &&
        heroElement
      ) {
        const scrollTL = gsap.timeline({
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom 10%",
            scrub: 1,
            markers: true,
          },
        });

        if (scrollAnimations.groupRotation) {
          scrollTL.to(
            groupRef.current.rotation,
            {
              y: scrollAnimations.groupRotation.y ?? 0,
            },
            0
          );
        }

        if (scrollAnimations.can1?.position) {
          scrollTL.to(
            can1Ref.current.position,
            {
              x: scrollAnimations.can1.position.x ?? 0,
              y: scrollAnimations.can1.position.y ?? 0,
              z: scrollAnimations.can1.position.z ?? 0,
            },
            0
          );
        }

        if (scrollAnimations.can1?.rotation) {
          scrollTL.to(
            can1Ref.current.rotation,
            {
              x: scrollAnimations.can1.rotation.x ?? 0,
              y: scrollAnimations.can1.rotation.y ?? 0,
              z: scrollAnimations.can1.rotation.z ?? 0,
            },
            0
          );
        }

        if (scrollAnimations.can3?.position) {
          scrollTL.to(
            can3Ref.current.position,
            scrollAnimations.can3.position,
            0
          );
        }
        if (scrollAnimations.can3?.rotation) {
          scrollTL.to(
            can3Ref.current.rotation,
            scrollAnimations.can3.rotation,
            0
          );
        }

        if (scrollAnimations.can4?.position) {
          scrollTL.to(
            can4Ref.current.position,
            scrollAnimations.can4.position,
            0
          );
        }
        if (scrollAnimations.can4?.rotation) {
          scrollTL.to(
            can4Ref.current.rotation,
            scrollAnimations.can4.rotation,
            0
          );
        }
      }
    },
    { dependencies: [breakpoint, isReady] }
  );

  /* ================= JSX ================= */

  return (
    <group ref={groupRef}>
      <FloatingCan ref={can1Ref} flavor="original" floatSpeed={FLOAT_SPEED} />
      <FloatingCan ref={can3Ref} flavor="zero" floatSpeed={FLOAT_SPEED} />

      <FloatingCan ref={can4Ref}  flavor="coffee" floatSpeed={FLOAT_SPEED} />

      <directionalLight position={[0, 0, 5]} intensity={0.7} castShadow />
      <ambientLight intensity={12} />
      <pointLight position={[0, 1, 3]} intensity={6} />

      <Environment files={"/hdr/pursky.hdr"} environmentIntensity={0.6} />
    </group>
  );
}

export default Scene;
