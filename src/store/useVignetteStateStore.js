import { create } from "zustand";

const useVignetteStateStore = create((set) => ({
  vignetteStateStore: false,

  setVignetteStateStore: (vignetteStateStore) => set({ vignetteStateStore }),
}));

export default useVignetteStateStore;
