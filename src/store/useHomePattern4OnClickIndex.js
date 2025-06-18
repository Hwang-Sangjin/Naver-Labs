import { create } from "zustand";

const useHomePattern4OnClickIndex = create((set) => ({
  onClickedIndex: null,

  setOnClickedIndex: (onClickedIndex) => set({ onClickedIndex }),
}));

export default useHomePattern4OnClickIndex;
