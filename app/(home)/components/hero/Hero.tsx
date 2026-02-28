"use client";

import { useGSAP } from "@gsap/react";
import { View } from "@react-three/drei";
import gsap from "gsap";
import React, { useRef } from "react";

import PinnedReveal from "./pin-reveal";
import Scene from "./Scene";
import { useAnimationStore } from "@/store/useAnimationStore";
import { useMeshStore } from "@/store/useMeshStore";
import { HERO } from "@/lib/data";

const Hero = () => {
  const createIntroTimeline = useAnimationStore((s) => s.createIntroTimeline);
  const playIntro = useAnimationStore((s) => s.playIntro);
  const introPlayed = useAnimationStore((s) => s.introPlayed);
  const meshReady = useMeshStore((s) => s.ready);

  const titleRefs = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    // Wait for mesh to be ready before starting timeline
    if (!meshReady) return;

    const tl = createIntroTimeline();

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
      0.4 // start at 0
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
      </View>

      {/* HERO TEXT */}
      <div className="hero relative tracking-wider">
        <div
          // ref={landingRef}
          id="landing"
          className="font-poppins text-secondary relative z-20 flex h-screen w-full flex-col items-center overflow-hidden p-4 pt-40 uppercase lg:items-start lg:justify-center 2xl:pl-24"
        >
          {/* LINE 1 */}
          <div className="flex -skew-y-3 overflow-hidden">
            {HERO.lines[0].words.map((word, index) => (
              <div
                key={`line1-${index}`}
                ref={addTitleRef}
                className={`inline translate-y-full pr-4 text-5xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-[170px] ${
                  index === 1 ? "text-stroke-secondary text-primary" : ""
                }`}
              >
                {word}
              </div>
            ))}
          </div>

          {/* LINE 2 */}
          <div className="flex -skew-y-3 overflow-hidden pt-12">
            {HERO.lines[1].words.map((word, index) => (
              <div
                key={`line2-${index}`}
                ref={addTitleRef}
                className={`flex translate-y-full items-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-[170px] ${
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
                className={`inline translate-y-full pr-4 text-5xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-[170px] ${
                  index === 1 ? "text-stroke-secondary text-primary" : ""
                }`}
              >
                {word}
              </div>
            ))}
          </div>
        </div>

        {/* DESCRIPTION */}
        <PinnedReveal className="text-xl" text={HERO.description} />
      </div>
    </div>
  );
};

export default Hero;
