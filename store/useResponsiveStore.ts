import { create } from "zustand";

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

interface ResponsiveState {
  isReady: boolean;
  breakpoint: Breakpoint;
  resizeCount: number;
  setBreakpoint: (val: Breakpoint) => void;
  setReady: (val: boolean) => void;
  incrementResizeCount: () => void;
}

export const useResponsiveStore = create<ResponsiveState>((set) => ({
  isReady: false,
  breakpoint: "sm",
  resizeCount: 0,
  setBreakpoint: (val) => set({ breakpoint: val }),
  setReady: (val) => set({ isReady: val }),
  incrementResizeCount: () => set((state) => ({ resizeCount: state.resizeCount + 1 })),
}));