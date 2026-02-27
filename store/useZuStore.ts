import gsap from "gsap";
import { create } from "zustand";

//
// 🍔 Sidebar / Menu Store
//

interface MenuState {
  isMenuOpen: boolean;
  isAnimating: boolean;

  openMenu: () => void;
  closeMenu: () => void;
  setAnimating: (value: boolean) => void;
}

export const useMenuStore = create<MenuState>((set) => ({
  isMenuOpen: false,
  isAnimating: false,

  openMenu: () =>
    set({
      isMenuOpen: true,
    }),

  closeMenu: () =>
    set({
      isMenuOpen: false,
    }),

  setAnimating: (value) =>
    set({
      isAnimating: value,
    }),
}));


//
// 🫧 Optional: Bubble Store (unchanged)
//

interface BubbleState {
  isPlaying: boolean;
  togglePlay: () => void;
  setPlaying: (value: boolean) => void;
}

export const useBubbleStore = create<BubbleState>((set) => ({
  isPlaying: false,

  togglePlay: () =>
    set((state) => ({ isPlaying: !state.isPlaying })),

  setPlaying: (value) => set({ isPlaying: value }),
}));


//
// 🥫 Sidebar Can Store
//

interface SidebarCanState {
  activeCan: number;
  setActiveCan: (index: number) => void;
  resetActiveCan: () => void; // reset to first can (0)
}

export const useSidebarCanStore = create<SidebarCanState>((set) => ({
  activeCan: 0,

  setActiveCan: (index) =>
    set({ activeCan: index }),

  resetActiveCan: () =>
    set({ activeCan: 0 }),
}));

// Store for mesh readiness
interface MeshState {
  ready: boolean;
  isReady: () => void;
}


//
// 🎬 Animation Orchestration Store
//


type Breakpoint = "isMobile" | "sm" | "md" | "lg" | "xl" | "xxl";

interface ResponsiveState {
  isReady: boolean;
  breakpoint: Breakpoint;
  setBreakpoint: (val: Breakpoint) => void;
  setReady: (val: boolean) => void;
}

export const useResponsiveStore = create<ResponsiveState>((set) => ({
  isReady: false,
  breakpoint: "isMobile",
  setBreakpoint: (val) => set({ breakpoint: val }),
  setReady: (val) => set({ isReady: val }),
}));

// Store for mesh readiness
interface MeshState {
  ready: boolean;
  isReady: () => void;
}


export const useMeshStore = create<MeshState>((set) => ({
  ready: false,
  isReady: () => set({ ready: true }),
}));


/* ================= TYPES ================= */

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