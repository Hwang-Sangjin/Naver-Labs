import { create } from "zustand";

const useLoadingStateStore = create((set) => ({
  loadingStateStore: false,

  setLoadingStateStore: (loadingStateStore) => set({ loadingStateStore }),
}));

export default useLoadingStateStore;
