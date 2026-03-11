"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef, useEffect } from "react";

import { splitWords } from "@/lib/splitters";
import { useResponsiveStore } from "@/store/useResponsiveStore";

gsap.registerPlugin(ScrollTrigger);

interface PinnedRevealProps {
  text: string;
  className?: string;
}

const PinnedReveal: React.FC<PinnedRevealProps> = ({ text, className }) => {
  const pinSectionRef = useRef<HTMLDivElement | null>(null);
  const letterRefs = useRef<HTMLSpanElement[]>([]);
  const resizeCount = useResponsiveStore((s) => s.resizeCount);
  letterRefs.current = []; // clear to avoid duplicates in dev mode

  useGSAP(() => {
    gsap.set(letterRefs.current, { opacity: 0, y: 50 });

    gsap.to(letterRefs.current, {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      ease: "power2.out",
      scrollTrigger: {
        trigger: pinSectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
        invalidateOnRefresh: true,
      },
    });
  }, []);

  // Refresh ScrollTrigger when resizeCount changes
  useEffect(() => {
    // Use a small delay to ensure the layout has settled
    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [resizeCount]);

  return (
    <section
      ref={pinSectionRef}
      className="font-poppins relative z-5 flex h-screen w-full justify-start p-8 pt-36 text-[24px] capitalize sm:text-4xl xl:items-center 2xl:text-5xl"
    >
      <div className="2xl:maw-w-4xl text-secondary max-w-2xl leading-snug lg:max-w-4xl xl:max-w-3xl">
        {splitWords(text, letterRefs)}
      </div>
    </section>
  );
};

export default PinnedReveal;
