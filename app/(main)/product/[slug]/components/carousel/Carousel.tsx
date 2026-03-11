"use client";

import FloatingCan from "@/components/cans/FloatingCan";
import { SodaCanProps } from "@/components/cans/SodaCan";
import NavigationArrow from "@/components/NavigationArrow";
import { CONFIG, CarouselConfig } from "@/lib/data";
import { useResponsiveStore } from "@/store/useResponsiveStore";
import { Billboard, Environment, View } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { ArrowBigLeftDashIcon, ArrowBigRightDashIcon, ArrowLeftIcon } from "lucide-react";
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { Group } from "three";

gsap.registerPlugin(Observer);

/* ================= TYPES ================= */

type BreakpointKey = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

/* ================= CONSTANTS ================= */

const FLAVORS: { flavor: SodaCanProps["flavor"] }[] = [
  { flavor: "original" },
  { flavor: "zero" },
  { flavor: "cherry" },
  { flavor: "lime" },
  { flavor: "coffee" },
];

/* ================= SCENE COMPONENT ================= */

const CarouselScene = ({
  angleRef,
  config,
}: {
  angleRef: React.MutableRefObject<number>;
  config: CarouselConfig;
}) => {
  const canRefs = useRef<(Group | null)[]>([]);

  // Memoize constants
  const total = FLAVORS.length;
  const anglePerCan = useMemo(() => (2 * Math.PI) / total, [total]);
  const { radiusX, radiusZ, scaleRange } = config;

  useFrame(() => {
    canRefs.current.forEach((can, index) => {
      if (!can) return;

      const angle = index * anglePerCan + angleRef.current;

      can.position.x = Math.sin(angle) * radiusX;
      can.position.z = Math.cos(angle) * radiusZ;

      const scale = gsap.utils.mapRange(
        -radiusZ,
        radiusZ,
        scaleRange[0],
        scaleRange[1],
        can.position.z
      );
      can.scale.setScalar(scale);
    });
  });

  return (
    <>
      {FLAVORS.map((flavor, index) => (
        <Billboard key={index} lockX lockZ>
          <FloatingCan
            ref={(el) => {
              canRefs.current[index] = el;
            }}
            flavor={flavor.flavor}
            floatIntensity={0.7}
            rotationIntensity={0.8}
          />
        </Billboard>
      ))}
      <ambientLight intensity={2} />

      <Environment
        preset="studio"
        background={false}
        environmentIntensity={0.4}
      />
    </>
  );
};

/* ================= MAIN COMPONENT ================= */

const Carousel = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const isAnimatingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);

  const breakpoint = useResponsiveStore((state) => state.breakpoint);
  const isReady = useResponsiveStore((state) => state.isReady);

  // Get responsive config
  const breakpointKey = breakpoint.toUpperCase() as Uppercase<BreakpointKey>;
  const config = useMemo(() => CONFIG[breakpointKey].carousel, [breakpointKey]);

  // Memoize angle per can calculation
  const anglePerCan = useMemo(() => (2 * Math.PI) / FLAVORS.length, []);

  // Memoize rotation function
  const rotateBy = useCallback(
    (direction: number) => {
      if (isAnimatingRef.current) return;

      isAnimatingRef.current = true;
      setIsAnimating(true);

      gsap.to(angleRef, {
        current: angleRef.current + direction * anglePerCan,
        duration: config.duration,
        ease: "power2.inOut",
        onComplete: () => {
          isAnimatingRef.current = false;
          setIsAnimating(false);
        },
      });
    },
    [anglePerCan, config.duration]
  );

  // Setup Observer with stable dependencies
  useEffect(() => {
    if (!containerRef.current || !isReady) return;

    // Small delay to ensure DOM is fully ready
    const timeoutId = setTimeout(() => {
      if (!containerRef.current) return;

      const observer = Observer.create({
        target: containerRef.current,
        type: "touch,pointer",
        onLeft: () => rotateBy(-1),
        onRight: () => rotateBy(1),
      });

      return () => observer.kill();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [rotateBy, isReady]);

  // Don't render until responsive store is ready
  if (!isReady) return null;

  return (
    <div>
   
      <div
        ref={containerRef}
        className="carousel relative z-40 flex w-full items-center justify-center my-24"
      >
        {/* UI Buttons */}
        <button
      
          onClick={() => rotateBy(-1)}
          disabled={isAnimating}
          className="absolute z-100 top-1/2 left-4 -translate-y-1/2 md:left-12 lg:left-24  w-12 h-12 disabled:opacity-30 disabled:pointer-events-none "
        >
          <ArrowBigLeftDashIcon  className="text-secondary size-8 lg:size:10 xl:size-11" strokeWidth={1.5} />
          
        </button>

        <button
    
          onClick={() => rotateBy(1)}
          disabled={isAnimating}
          className="absolute z-100 top-1/2 right-4 -translate-y-1/2 md:right-12 lg:right-24 w-12 h-12 disabled:opacity-30 disabled:pointer-events-none"
        >
          <ArrowBigRightDashIcon  className="text-secondary size-8 lg:size:10 xl:size-11" strokeWidth={1.5} />
        </button>

        <div className="relative z-50 flex w-full items-center justify-center">
          {/* The View component acts as the bridge to the Canvas */}
          <View className="h-[60vh] w-full">
            <CarouselScene angleRef={angleRef} config={config} />
          </View>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
