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

  // Navigation Logic
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % sections.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + sections.length) % sections.length);
  };

  // Animate image + text whenever currentIndex changes
  useGSAP(
    () => {
      if (!imageRef.current || !textRef.current) return;

      const tl = gsap.timeline();

      tl.fromTo(
        [imageRef.current, textRef.current],
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.1, 
          ease: "power2.out" 
        }
      );
    },
    { dependencies: [currentIndex] }
  );

  const section = sections[currentIndex];

  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      {/* YEARS BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 top-20 z-30 my-24 flex items-start justify-center">
        <Years currentIndex={currentIndex} />
      </div>

{/* ARROW NAVIGATION */}
      <div className="absolute inset-x-8 z-50 flex justify-between top-1/2 -translate-y-1/2">
        <NavigationArrow 
            direction="left" 
            onClick={handlePrev} 
        />
        <NavigationArrow 
            direction="right" 
            onClick={handleNext} 
        />
      </div>

      {/* INDICATOR (Now clickable) */}
      <div className="absolute bottom-16 z-40 flex w-full justify-center">
        <CapsIndicator currentIndex={currentIndex} setIndex={setCurrentIndex} />
      </div>

      <div className="relative z-10 mt-18 grid w-full max-w-6xl grid-cols-2 gap-24 px-24">
        {/* IMAGE ZONE */}
        <div ref={imageRef} className="relative">
          <div className="bg-secondary border-secondary rotate-2 rounded-sm border p-2 pb-6 shadow-lg">
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
          className="font-poppins text-secondary flex items-center text-5xl uppercase"
        >
          {section.text}
        </div>
      </div>
    </section>
  );
};

export default Chronos;