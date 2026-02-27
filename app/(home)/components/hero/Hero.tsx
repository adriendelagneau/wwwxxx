"use client";

import { useGSAP } from "@gsap/react";
import { View } from "@react-three/drei";
import gsap from "gsap";
import React, { useRef } from "react";

import PinnedReveal from "./pin-reveal";
import Scene from "./Scene";
import { useAnimationStore, useMeshStore } from "@/store/useZuStore";

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
            <div
              ref={addTitleRef}
              className="inline translate-y-full pr-4 text-5xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-[170px]"
            >
              breizh
            </div>

            <div
              ref={addTitleRef}
              className="flex translate-y-full text-5xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-[170px]"
            >
              cola
            </div>
          </div>

          {/* LINE 2 */}
          <div className="flex -skew-y-3 overflow-hidden pt-12">
            <div
              ref={addTitleRef}
              className="mr-4 flex translate-y-full items-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-[170px]"
            >
              le
            </div>

            <div
              ref={addTitleRef}
              className="text-stroke-secondary text-primary inline translate-y-full text-5xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-[170px]"
            >
              cola
            </div>

            <div
              ref={addTitleRef}
              className="flex translate-y-full items-center pl-4 text-5xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-[170px]"
            >
              du
            </div>
          </div>

          {/* LINE 3 */}
          <div className="flex -skew-y-3 overflow-hidden pt-6">
            <div
              ref={addTitleRef}
              className="inline translate-y-full pr-4 text-5xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-[170px]"
            >
              phare
            </div>

            <div
              ref={addTitleRef}
              className="text-stroke-secondary text-primary inline translate-y-full text-5xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-[170px]"
            >
              ouest
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <PinnedReveal
          className="text-xl"
          text="Breizh Cola incarne un esprit libre et breton, une boisson de caractère née à l’Ouest, pour ceux qui recherchent authenticité, fraîcheur et goût."
        />
      </div>
    </div>
  );
};

export default Hero;
