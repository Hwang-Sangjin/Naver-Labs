import { create } from "zustand";

const useHomePattern4OnClickIndex = create((set) => ({
  onClickedIndex: { 0: 0, 1: 0, 2: 0, 3: 0 },

  setOnClickedIndex: (onClickedIndex) => set({ onClickedIndex }),
}));

export default useHomePattern4OnClickIndex;
