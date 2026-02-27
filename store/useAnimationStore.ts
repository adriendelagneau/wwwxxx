import gsap from "gsap";
import { create } from "zustand";

interface AnimationState {
  introPlayed: boolean;
  masterTimeline: gsap.core.Timeline | null;
  createIntroTimeline: () => gsap.core.Timeline;
  getIntroTimeline: () => gsap.core.Timeline | null;
  playIntro: () => void;
  completeIntro: () => void;
}

export const useAnimationStore = create<AnimationState>((set, get) => ({
  introPlayed: typeof window !== "undefined" ? sessionStorage.getItem("introPlayed") === "true" : false,
  masterTimeline: null,

  createIntroTimeline: () => {
    const tl = gsap.timeline({
      onComplete: get().completeIntro
    });
    set({ masterTimeline: tl });
    return tl;
  },

  getIntroTimeline: () => get().masterTimeline,

  playIntro: () => {
    const tl = get().masterTimeline;
    if (tl && !get().introPlayed) tl.play();
  },

  completeIntro: () => {
    set({ introPlayed: true });
    sessionStorage.setItem("introPlayed", "true");
  },
}));