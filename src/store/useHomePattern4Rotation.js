import { create } from "zustand";

const useHomePattern4Rotation = create((set) => ({
  homePattern4Rotation: [0],

  setHomePattern4Rotation: (homePattern4Rotation) =>
    set({ homePattern4Rotation }),
}));

export default useHomePattern4Rotation;
