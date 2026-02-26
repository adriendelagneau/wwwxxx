import { create } from "zustand";

// 🍔 Sidebar / Menu Store

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
