import { create } from "zustand";

type Breakpoint =  "sm" | "md" | "lg" | "xl" | "xxl";

interface ResponsiveState {
  isReady: boolean;
  breakpoint: Breakpoint;
  setBreakpoint: (val: Breakpoint) => void;
  setReady: (val: boolean) => void;
}

export const useResponsiveStore = create<ResponsiveState>((set) => ({
  isReady: false,
  breakpoint: "sm",
  setBreakpoint: (val) => set({ breakpoint: val }),
  setReady: (val) => set({ isReady: val }),
}));