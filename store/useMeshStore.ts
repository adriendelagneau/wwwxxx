import { create } from "zustand";

interface MeshState {
  ready: boolean;
  isReady: () => void;
}


export const useMeshStore = create<MeshState>((set) => ({
  ready: false,
  isReady: () => set({ ready: true }),
}));