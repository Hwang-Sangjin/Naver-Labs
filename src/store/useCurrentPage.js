import { create } from "zustand";

const useCurrentPage = create((set) => ({
  currentPage: 0,

  setCurrentPage: (currentPage) => set({ currentPage }),
}));

export default useCurrentPage;
