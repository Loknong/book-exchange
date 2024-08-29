import { create } from "zustand";

interface LayoutState {
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
  toggleSidebar: () => void;
}
export const useLayoutStore = create<LayoutState>((set) => ({
  isSidebarOpen: false,
  setSidebarOpen: (isOpen: boolean) => set({ isSidebarOpen: isOpen }),
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
