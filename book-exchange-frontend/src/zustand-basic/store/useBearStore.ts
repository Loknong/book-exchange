import { create } from "zustand";

type TBearState = {
  bears: number;
  increase: (by: number) => void;
  increasePopulation: () => void;
  decreasePopulation: () => void;
}

export const useBearStore = create<TBearState>()((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
  increasePopulation: () => {
    set((state) => ({
      bears: state.bears + 1,
    }));
  },
  decreasePopulation: () => {
    set((state) => ({
      bears: state.bears - 1,
    }));
  },
}));
