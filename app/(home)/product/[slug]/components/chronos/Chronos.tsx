"use client";

import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Install lucide-react or use your own icons

import { sections } from "@/lib/data";
import Years from "./Years";
import CapsIndicator from "./CapsIndicator";
import NavigationArrow from "@/components/NavigationArrow";

const Chronos: React.FC = () => {
  const imageRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("up");

  // Navigation Logic
  const handleNext = () => {
    setDirection("up");
    setCurrentIndex((prev) => (prev + 1) % sections.length);
  };

  const handlePrev = () => {
    setDirection("down");
    setCurrentIndex((prev) => (prev - 1 + sections.length) % sections.length);
  };

  // Animate image + text whenever currentIndex changes
  useGSAP(
    () => {
      if (!imageRef.current || !textRef.current) return;

      const tl = gsap.timeline();

      // Direction-based initial position
      const startY = direction === "up" ? 30 : -30;

      tl.fromTo(
        [imageRef.current, textRef.current],
        { opacity: 0, y: startY },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    },
    { dependencies: [currentIndex, direction] }
  );

  const section = sections[currentIndex];

  return (
    <div className="">
  {/* <h2 className="font-poppins text-7xl font-semibold uppercase my-24 ml-12 -skew-2">Plus qu’un cola. Une aventure.</h2> */}
    <section className="relative mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center justify-center gap-12 xl:gap-24 overflow-hidden py-6 xl:max-w-6xl">
      {/* YEARS BACKGROUND */}
    
      <div className="pointer-events-none inset-0 z-30 my-4 flex items-start justify-center">
        <Years currentIndex={currentIndex} />
      </div>

      <div className="relative z-10 mt-3 flex h-auto w-full max-w-6xl flex-col items-center justify-center gap-8 px-4 lg:flex-row lg:gap-12 lg:px-12">
        {/* ARROW NAVIGATION */}
        <div className="absolute top-1/4 z-50 flex w-full px-6 lg:px-0 justify-between">
          <NavigationArrow
            direction="left"
            onClick={handlePrev}
              disabled={currentIndex === 0}
          />
          <NavigationArrow
            direction="right"
            onClick={handleNext}
            disabled={currentIndex === sections.length - 1}
          />
        </div>
        {/* IMAGE ZONE */}
        <div
          ref={imageRef}
          className="relative mx-auto h-72 w-72 sm:w-92 xl:h-80 xl:w-md"
        >
          <div className="bg-secondary border-secondary rotate-2 rounded-sm border p-3 pb-8 shadow-lg">
            <Image
              key={section.image} // Key forces re-render for clean GSAP entry
              src={section.image}
              alt={`Image for ${section.year}`}
              width={520}
              height={420}
              className="h-auto w-full object-cover sepia"
              priority
              />
          </div>
        </div>

        {/* TEXT ZONE */}
        <div
          ref={textRef}
          className="font-poppins lg:max-w-auto text-secondary mx-auto flex h-48 max-w-lg items-center justify-center text-2xl uppercase lg:h-56 lg:w-[45%] xl:text-3xl 2xl:text-4xl"
        >
          {section.text}
        </div>
      </div>

      {/* INDICATOR (Now clickable) */}
      <div className="z-40 flex w-42 justify-center">
        <CapsIndicator
          currentIndex={currentIndex}
          setIndex={setCurrentIndex}
          setDirection={setDirection}
          />
      </div>
    </section>
          </div>
  );
};

export default Chronos;
