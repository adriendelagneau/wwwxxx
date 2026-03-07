"use client";

import FloatingCan from "@/components/cans/FloatingCan";
import { useResponsiveStore } from "@/store/useResponsiveStore";
import { CONFIG } from "@/lib/data";
import { useGSAP } from "@gsap/react";
import { Environment } from "@react-three/drei";
import gsap from "gsap";
import React, { useRef } from "react";
import { Group } from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
/* ================= TYPES ================= */

type SceneProps = {
  flavor: "original" | "cherry" | "zero" | "lime" | "coffee";
};

/* ================= COMPONENT ================= */

const Scene = ({ flavor }: SceneProps) => {
  const canRef = useRef<Group>(null);

  const breakpoint = useResponsiveStore((state) => state.breakpoint);
  const isReady = useResponsiveStore((state) => state.isReady);

  // Map breakpoint string to CONFIG key
  const configKey = breakpoint.toUpperCase() as
    | "XS"
    | "SM"
    | "MD"
    | "LG"
    | "XL"
    | "XXL";

  const config = CONFIG[configKey]?.single;

  useGSAP(
    () => {
      if (!canRef.current || !isReady || !config) return;

      // Kill existing ScrollTriggers for this section
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === ".hero-single") {
          t.kill();
        }
      });

      // Initial scale and position
      gsap.set(canRef.current.scale, config.scale);
      gsap.set(canRef.current.position, config.position);

      // Scroll animation
      const scrollTL = gsap.timeline({
        defaults: {
          duration: 2,
        },
        scrollTrigger: {
          trigger: ".hero-single",
          start: "top top",
          end: "bottom 80%",
          scrub: 1.5,
        },
      });

      scrollTL
        .to(canRef.current.rotation, { y: Math.PI * 2 })
        .to(canRef.current.position, config.scrollAnimations2.position);
      // .to(canRef.current.position, config.scrollAnimations.position)
      // .to(canRef.current.rotation, { y: Math.PI * 2 }, 2 )
    },
    { dependencies: [breakpoint, isReady, config] }
  );

  return (
    <>
      <group rotation={[0, 0, 0]}>
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
      <Environment preset="studio" environmentIntensity={0.3} />
    </>
  );
};

export default Scene;
