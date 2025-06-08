import { create } from "zustand";

const useLoadingStateStore = create((set) => ({
  loadingStateStore: true,

  setLoadingStateStore: (loadingStateStore) => set({ loadingStateStore }),
}));

export default useLoadingStateStore;
