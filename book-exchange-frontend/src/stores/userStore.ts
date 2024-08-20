// src/stores/userStore.ts
import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

interface DecodeToken {
  user: {
    id: number;
    role: string;
  };
  exp: number;
  iat: number;
}

interface UserState {
  userId: number | null;
  username: string | null;
  role: string | null;
  setUser: (userId: number, username: string, role: string) => void;
  loading: boolean;
  clearUser: () => void;
  initializeUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  userId: null,
  username: null,
  role: null,
  loading: true,
  setUser: (userId, role) => set({ userId, role }),
  clearUser: () => set({ userId: null, username: null, role: null }),
  initializeUser: () => {
    const token = localStorage.getItem("authToken");
    try {
      if (token) {
        const decodedToken = jwtDecode<DecodeToken>(token);
        console.log("Decoded token:", decodedToken);

        set({ userId: decodedToken.user.id, role: decodedToken.user.role, loading: false });
      } else {
        set({ loading: false }); // Set loading to false if no token found
      }
    } catch (error) {
      console.error("Error initializing user:", error);
      localStorage.removeItem("authToken");
      set({ loading: false }); // Set loading to false on error
    }
  },
}));
