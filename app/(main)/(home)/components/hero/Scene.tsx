"use client";

import FloatingCan from "@/components/cans/FloatingCan";
import { useMeshStore } from "@/store/useMeshStore";
import { useResponsiveStore } from "@/store/useResponsiveStore";
import { useGSAP } from "@gsap/react";
import { Environment } from "@react-three/drei";
import gsap from "gsap";
import { Group } from "three";
import { useAnimationStore } from "@/store/useAnimationStore";
import { useRef } from "react";
import { CONFIG } from "@/lib/data";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useBubbleStore } from "@/store/useBubbleStore";

gsap.registerPlugin(ScrollTrigger);

function Scene() {
  const groupRef = useRef<Group>(null);
  const can1Ref = useRef<Group>(null);
  const can2Ref = useRef<Group>(null);
  const can3Ref = useRef<Group>(null);

  const setMeshReady = useMeshStore((state) => state.isReady);
  const isReady = useResponsiveStore((state) => state.isReady);
  const breakpoint = useResponsiveStore((state) => state.breakpoint);
  const resizeCount = useResponsiveStore((state) => state.resizeCount);
  const registerPart = useAnimationStore((s) => s.registerPart);
  const TL = useAnimationStore((s) => s.masterTimeline);
  const setPlaying = useBubbleStore((state) => state.setPlaying);
  const configKey = breakpoint.toUpperCase() as keyof typeof CONFIG;
  const config = CONFIG[configKey];

  useGSAP(
    () => {
      // Always set mesh ready - this triggers Hero's useGSAP to create timeline
      setMeshReady();

      if (!TL) {
        console.log("[Scene] Timeline not created yet");
        return;
      }
      if (!can1Ref.current) {
        console.log("[Scene] can1Ref not ready yet");
        return;
      }

      setMeshReady();

      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === ".hero") {
          t.kill();
        }
      });

      const intro = config.hero.intro?.can1;
      const final = config.hero.final?.can1;

      const scrollAnimations = config.hero.scroll;

      const hasPlayedBefore =
        typeof window !== "undefined" &&
        sessionStorage.getItem("introPlayed") === "true";

      /* ================= SET INITIAL POSITIONS FOR can2 & can3 ================= */

      // Always set initial positions and scale from config (works on both first visit and refresh)
      if (can2Ref.current && scrollAnimations?.can2?.from.position) {
        gsap.set(can2Ref.current.position, {
          x: scrollAnimations.can2.from.position.x ?? 0,
          y: scrollAnimations.can2.from.position.y ?? 0,
          z: scrollAnimations.can2.from.position.z ?? 0,
        });
        // Set initial scale for can2
        if (scrollAnimations.can2.from.scale) {
          gsap.set(can2Ref.current.scale, {
            x: scrollAnimations.can2.from.scale.x ?? 1,
            y: scrollAnimations.can2.from.scale.y ?? 1,
            z: scrollAnimations.can2.from.scale.z ?? 1,
          });
        }
      }

      if (can3Ref.current && scrollAnimations?.can3?.from.position) {
        gsap.set(can3Ref.current.position, {
          x: scrollAnimations.can3.from.position.x ?? 0,
          y: scrollAnimations.can3.from.position.y ?? 0,
          z: scrollAnimations.can3.from.position.z ?? 0,
        });
        // Set initial scale for can3
        if (scrollAnimations.can3.from.scale) {
          gsap.set(can3Ref.current.scale, {
            x: scrollAnimations.can3.from.scale.x ?? 1,
            y: scrollAnimations.can3.from.scale.y ?? 1,
            z: scrollAnimations.can3.from.scale.z ?? 1,
          });
        }
      }

      /* ================= FIRST VISIT ================= */

      if (!hasPlayedBefore) {
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

        // Chain can animation after header ends (position 2.6 in timeline)

        if (TL && intro?.to?.position) {
          TL.to(can1Ref.current.position, {
            x: intro.to.position.x ?? 0,
            y: intro.to.position.y ?? 0,
            z: intro.to.position.z ?? 0,
            duration: 0.7,
            ease: "back.out(1.4)",
          });
        }

        if (TL && intro?.to?.rotation) {
          TL.to(can1Ref.current.rotation, {
            x: intro.to.rotation.x ?? final?.rotation?.x ?? 0,
            y: intro.to.rotation.y ?? final?.rotation?.y ?? 0,
            z: intro.to.rotation.z ?? final?.rotation?.z ?? 0,
            duration: 1.2,
            ease: "back.out(1.4)",
          });
        }

        if (TL && intro?.to?.scale) {
          TL.to(can1Ref.current.scale, {
            x: intro.to.scale.x,
            y: intro.to.scale.y,
            z: intro.to.scale.z,
            duration: 0.8,
            ease: "back.out(2)",
          });
        }

        // Mark intro as complete when can animation ends & trigger sidebar mount + bubbles
        if (TL) {
          TL.call(() => {
            sessionStorage.setItem("introPlayed", "true");
            // Start bubbles after sidebar is mounted
            setPlaying(true);
          }, undefined);
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

      const heroElement = document.querySelector(".hero");

      if (
        scrollAnimations &&
        groupRef.current &&
        can1Ref.current &&
        can2Ref.current &&
        can3Ref.current &&
        heroElement
      ) {
        const scrollTL = gsap.timeline({
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom 10%",
            scrub: 1,
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

        if (scrollAnimations.can2?.from?.position) {
          gsap.set(can2Ref.current.position, {
            x: scrollAnimations.can2.from.position.x ?? 0,
            y: scrollAnimations.can2.from.position.y ?? 0,
            z: scrollAnimations.can2.from.position.z ?? 0,
          });
        }
        // Set scale for can2 from config
        if (scrollAnimations.can2?.from?.scale) {
          gsap.set(can2Ref.current.scale, {
            x: scrollAnimations.can2.from.scale.x ?? 1,
            y: scrollAnimations.can2.from.scale.y ?? 1,
            z: scrollAnimations.can2.from.scale.z ?? 1,
          });
        }
        if (scrollAnimations.can2?.to?.position) {
          scrollTL.to(
            can2Ref.current.position,
            {
              x: scrollAnimations.can2.to.position.x ?? 0,
              y: scrollAnimations.can2.to.position.y ?? 0,
              z: scrollAnimations.can2.to.position.z ?? 0,
            },
            0
          );
        }
        if (scrollAnimations.can2?.to?.rotation) {
          scrollTL.to(
            can2Ref.current.rotation,
            {
              x: scrollAnimations.can2.to.rotation.x ?? 0,
              y: scrollAnimations.can2.to.rotation.y ?? 0,
              z: scrollAnimations.can2.to.rotation.z ?? 0,
            },
            0
          );
        }
        // Add scale animation for can2
        if (scrollAnimations.can2?.to?.scale) {
          scrollTL.to(
            can2Ref.current.scale,
            {
              x: scrollAnimations.can2.to.scale.x ?? 1,
              y: scrollAnimations.can2.to.scale.y ?? 1,
              z: scrollAnimations.can2.to.scale.z ?? 1,
            },
            0
          );
        }

        if (scrollAnimations.can3?.from?.position) {
          gsap.set(can3Ref.current.position, {
            x: scrollAnimations.can3.from.position.x ?? 0,
            y: scrollAnimations.can3.from.position.y ?? 0,
            z: scrollAnimations.can3.from.position.z ?? 0,
          });
        }
        // Set scale for can3 from config
        if (scrollAnimations.can3?.from?.scale) {
          gsap.set(can3Ref.current.scale, {
            x: scrollAnimations.can3.from.scale.x ?? 1,
            y: scrollAnimations.can3.from.scale.y ?? 1,
            z: scrollAnimations.can3.from.scale.z ?? 1,
          });
        }
        if (scrollAnimations.can3?.to?.position) {
          scrollTL.to(
            can3Ref.current.position,
            {
              x: scrollAnimations.can3.to.position.x ?? 0,
              y: scrollAnimations.can3.to.position.y ?? 0,
              z: scrollAnimations.can3.to.position.z ?? 0,
            },
            0
          );
        }
        if (scrollAnimations.can3?.to?.rotation) {
          scrollTL.to(
            can3Ref.current.rotation,
            {
              x: scrollAnimations.can3.to.rotation.x ?? 0,
              y: scrollAnimations.can3.to.rotation.y ?? 0,
              z: scrollAnimations.can3.to.rotation.z ?? 0,
            },
            0
          );
        }
        // Add scale animation for can3
        if (scrollAnimations.can3?.to?.scale) {
          scrollTL.to(
            can3Ref.current.scale,
            {
              x: scrollAnimations.can3.to.scale.x ?? 1,
              y: scrollAnimations.can3.to.scale.y ?? 1,
              z: scrollAnimations.can3.to.scale.z ?? 1,
            },
            0
          );
        }
      }

      // mark this part as ready
      registerPart();
    },
    { dependencies: [TL, isReady, resizeCount] }
  );

  return (
    <group ref={groupRef}>
      <FloatingCan ref={can1Ref} flavor="original" />
      <FloatingCan ref={can2Ref} flavor="zero" floatSpeed={0.9} />

      <FloatingCan ref={can3Ref} flavor="coffee" floatSpeed={1.1} />

      <ambientLight intensity={2} />

      <Environment
        preset="studio"
        background={false}
        environmentIntensity={0.4}
      />
    </group>
  );
}

export default Scene;
