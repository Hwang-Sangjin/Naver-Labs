import { create } from "zustand";

const useCurrentUrl = create((set) => ({
  currentUrl: "Home",

  setCurrentUrl: (currentUrl) => set({ currentUrl }),
}));

export default useCurrentUrl;
