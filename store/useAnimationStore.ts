import gsap from "gsap";
import { create } from "zustand";

interface AnimationState {
  introPlayed: boolean;
  masterTimeline: gsap.core.Timeline | null;

  registeredParts: number;
  totalParts: number;

  createIntroTimeline: () => gsap.core.Timeline;
  registerPart: () => void;

  playIntro: () => void;
  completeIntro: () => void;
}

export const useAnimationStore = create<AnimationState>((set, get) => ({
  introPlayed:
    typeof window !== "undefined"
      ? sessionStorage.getItem("introPlayed") === "true"
      : false,

  masterTimeline: null,

  registeredParts: 0,
  totalParts: 4, // hero text + scene + header + sidebar

  createIntroTimeline: () => {
    const tl = gsap.timeline({
      paused: true,
      onComplete: get().completeIntro,
      delay: 0.2
    });

    set({ masterTimeline: tl });

    return tl;
  },

  registerPart: () => {
    const { registeredParts, totalParts } = get();

    const next = registeredParts + 1;

    set({ registeredParts: next });

    if (next === totalParts) {
      const tl = get().masterTimeline;
      if (tl && !get().introPlayed) {
        tl.play();

      }
    }
  },

  playIntro: () => {
    const tl = get().masterTimeline;
    if (tl && !get().introPlayed) tl.play();
  },

  completeIntro: () => {
    set({ introPlayed: true });
    sessionStorage.setItem("introPlayed", "true");
  },
}));