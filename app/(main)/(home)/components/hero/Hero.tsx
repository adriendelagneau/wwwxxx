"use client";

import { useGSAP } from "@gsap/react";
import { View, Environment } from "@react-three/drei";
import gsap from "gsap";
import React, { useRef, useEffect } from "react";

import Scene from "./Scene";
import { Bubbles } from "@/components/bubbles/bubbles";
import { useAnimationStore } from "@/store/useAnimationStore";
import { useMeshStore } from "@/store/useMeshStore";
import { useBubbleStore } from "@/store/useBubbleStore";
import { useResponsiveStore } from "@/store/useResponsiveStore";
import { HERO } from "@/lib/data";
import PinnedReveal from "./pin-reveal";

const Hero = () => {
  const TL = useAnimationStore((s) => s.masterTimeline);
  const createIntroTimeline = useAnimationStore((s) => s.createIntroTimeline);
  const registerPart = useAnimationStore((s) => s.registerPart);
  const playIntro = useAnimationStore((s) => s.playIntro);
  const introPlayed = useAnimationStore((s) => s.introPlayed);
  const meshReady = useMeshStore((s) => s.ready);
  const resizeCount = useResponsiveStore((s) => s.resizeCount);

  const titleRefs = useRef<HTMLDivElement[]>([]);
  const setPlaying = useBubbleStore((state) => state.setPlaying);

  const addTitleRef = (el: HTMLDivElement) => {
    if (el && !titleRefs.current.includes(el)) titleRefs.current.push(el);
  };

  useGSAP(
    () => {
      if (!meshReady) return;

      // Create timeline if it doesn't exist yet
      let timeline = TL;
      if (!timeline) {
        timeline = createIntroTimeline();
      }
      if (introPlayed) {
        // If already played, show immediately
        titleRefs.current.forEach((t) => gsap.set(t, { y: 0 }));
        // playIntro();
        return;
      }
      timeline.to(
        titleRefs.current,
        {
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power4.out",
        },
        "intro"
      );

      registerPart(); // 👈 hero animation registered
      playIntro();
    },
    { dependencies: [meshReady, TL, createIntroTimeline, resizeCount] }
  );

  // Start bubbles after intro animation completes
  // useEffect(() => {
  //   if (introPlayed) {
  //     setPlaying(true);
  //   }
  // }, [introPlayed, setPlaying]);

  /* ================= JSX ================= */

  return (
    <div className="w-full">
      {/* THREE SCENE */}
      <View  className="hero pointer-events-none sticky top-0 z-10 -mt-[100vh] h-screen w-full">
        <Scene />
      </View>

      {/* BUBBLES */}
      <View className="bubbles pointer-events-none sticky top-0 z-10 -mt-[100vh] h-screen w-full">
        <Bubbles />
        <directionalLight position={[0, 0, 5]} intensity={0.5} />
        <ambientLight intensity={8} />
        <pointLight position={[0, 1, 3]} intensity={3.4} />
        {/* <Environment files="/hdr/studio.hdr" environmentIntensity={0.3} /> */}
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
                className={`inline translate-y-full pr-4 text-5xl tracking-wider sm:text-6xl md:text-7xl xl:text-8xl 2xl:text-[140px] ${
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
                className={`flex translate-y-full items-center text-5xl tracking-wider sm:text-6xl md:text-7xl xl:text-8xl 2xl:text-[140px] ${
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
                className={`inline translate-y-full pr-4 text-5xl tracking-wider sm:text-6xl md:text-7xl xl:text-8xl 2xl:text-[140px] ${
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
