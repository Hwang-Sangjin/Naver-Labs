import { create } from "zustand";

const useTestStore = create((set) => ({
  testData: "",

  setTestData: (testData) => set({ testData }),
}));

export default useTestStore;
