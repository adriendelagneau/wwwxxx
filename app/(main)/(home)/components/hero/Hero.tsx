"use client";

import { useGSAP } from "@gsap/react";
import { View, Preload } from "@react-three/drei";
import gsap from "gsap";
import React, { useRef } from "react";

import PinnedReveal from "./pin-reveal";
import Scene from "./Scene";
import { useAnimationStore } from "@/store/useAnimationStore";
import { useMeshStore } from "@/store/useMeshStore";
import { HERO } from "@/lib/data";

// Loading component while 3D scene loads
function HeroLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-transparent">
      <div className="flex flex-col items-center gap-4">
        <div className="border-primary h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
        <span className="font-poppins text-primary text-sm tracking-widest uppercase">
          Chargement...
        </span>
      </div>
    </div>
  );
}

const Hero = () => {
  const createIntroTimeline = useAnimationStore((s) => s.createIntroTimeline);
  const getIntroTimeline = useAnimationStore((s) => s.getIntroTimeline);
  const playIntro = useAnimationStore((s) => s.playIntro);
  const introPlayed = useAnimationStore((s) => s.introPlayed);
  const meshReady = useMeshStore((s) => s.ready);

  const titleRefs = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    // Wait for mesh to be ready before starting timeline
    if (!meshReady) return;

    // Get or create the master timeline
    let tl = getIntroTimeline();
    if (!tl) {
      tl = createIntroTimeline();
    }

    if (introPlayed) {
      // If already played, show immediately
      titleRefs.current.forEach((t) => gsap.set(t, { y: 0 }));
      playIntro();
      return;
    }

    // Add text animation to timeline
    tl.to(
      titleRefs.current,
      { y: 0, stagger: 0.15, duration: 1, ease: "power4.out" },
      0.3 // start at 0.3 to sync with 3D can animation
    );

    playIntro();
  }, [meshReady]);

  const addTitleRef = (el: HTMLDivElement) => {
    if (el && !titleRefs.current.includes(el)) titleRefs.current.push(el);
  };

  /* ================= JSX ================= */

  return (
    <div className="w-full">
      {/* THREE SCENE */}
      <View className="hero-scene pointer-events-none sticky top-0 z-10 -mt-[100vh] h-screen w-full">
        <Scene />
        <Preload all />
      </View>

      {/* HERO TEXT */}
      <div className="hero relative tracking-wider">
        <div
          // ref={landingRef}
          id="landing"
          className="font-poppins text-secondary relative z-20 flex h-screen w-full flex-col items-center overflow-hidden p-4 pt-40 uppercase xl:items-start xl:justify-center 2xl:pl-24"
        >
          {/* LINE 1 */}
          <div className="flex -skew-y-3 overflow-hidden">
            {HERO.lines[0].words.map((word, index) => (
              <div
                key={`line1-${index}`}
                ref={addTitleRef}
                className={`hero-text inline translate-y-full pr-4 text-5xl tracking-wider sm:text-6xl md:text-7xl xl:text-8xl 2xl:text-[140px] ${
                  index === 1 ? "text-stroke-secondary text-primary" : ""
                }`}
              >
                {word}
              </div>
            ))}
          </div>

          {/* LINE 2 */}
          <div className="flex -skew-y-3 overflow-hidden pt-6">
            {HERO.lines[1].words.map((word, index) => (
              <div
                key={`line2-${index}`}
                ref={addTitleRef}
                className={`hero-text flex translate-y-full items-center text-5xl tracking-wider sm:text-6xl md:text-7xl xl:text-8xl 2xl:text-[140px] ${
                  word === "cola" ? "text-stroke-secondary text-primary" : ""
                } ${index === 0 ? "mr-4" : index === 2 ? "pl-4" : ""}`}
              >
                {word}
              </div>
            ))}
          </div>

          {/* LINE 3 */}
          <div className="flex -skew-y-3 overflow-hidden pt-6">
            {HERO.lines[2].words.map((word, index) => (
              <div
                key={`line3-${index}`}
                ref={addTitleRef}
                className={`hero-text inline translate-y-full pr-4 text-5xl tracking-wider sm:text-6xl md:text-7xl xl:text-8xl 2xl:text-[140px] ${
                  index === 1 ? "text-stroke-secondary text-primary" : ""
                }`}
              >
                {word}
              </div>
            ))}
          </div>
        </div>

        {/* DESCRIPTION */}
      </div>
      <PinnedReveal className="text-xl" text={HERO.description} />
    </div>
  );
};

export default Hero;
