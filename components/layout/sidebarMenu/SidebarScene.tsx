"use client";

import { useRef, useEffect } from "react";
import { Group } from "three";
import gsap from "gsap";


import { Environment } from "@react-three/drei";
import FloatingCan from "@/components/cans/FloatingCan";
import { useSidebarCanStore } from "@/store/useMenuStore";

const SPACING = 4; // distance between cans in world units

export default function SidebarScene() {
  const containerRef = useRef<Group>(null);

  const activeCan = useSidebarCanStore((s) => s.activeCan);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.to(containerRef.current.position, {
      y: -activeCan * SPACING,
      duration: 1.2,
      ease: "power4.out",
    });
  }, [activeCan]);

  return (
    <>
      <group ref={containerRef}>
        <FloatingCan floatSpeed={4.5} scale={1.5} flavor="original" position={[0, 0, 0]} />

        <FloatingCan floatSpeed={4.5} scale={1.5} flavor="zero" position={[0, SPACING, 0]} />

        <FloatingCan floatSpeed={4.5}
          scale={1.5}
          flavor="cherry"
          position={[0, SPACING * 2, 0]}
        />

        <FloatingCan floatSpeed={4.5} scale={1.5} flavor="lime" position={[0, SPACING * 3, 0]} />
        <FloatingCan floatSpeed={4.5} scale={1.5} flavor="coffee" position={[0, SPACING * 4, 0]} />

      </group>

      <ambientLight intensity={2} />

      <Environment
        preset="studio"
        background={false}
        environmentIntensity={0.4}
      />
    </>
  );
}
