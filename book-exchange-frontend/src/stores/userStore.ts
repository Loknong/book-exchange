// src/stores/userStore.ts
import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import { isMockMode } from "../utils/mode";

interface DecodeToken {
  user: {
    id: number;
    role: string;
    username: string;
  };
  exp: number;
  iat: number;
}

interface UserState {
  userId: number | null;
  username: string | null;
  role: string | null;
  loading: boolean;
  setUser: (userId: number, username: string, role: string) => void;
  clearUser: () => void;
  initializeUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  userId: null,
  username: null,
  role: null,
  loading: true,
  setUser: (userId, username, role) => {
    console.log("Setting user:", { userId, username, role });
    set({ userId, username, role, loading: false });
  },
  clearUser: () => set({ userId: null, username: null, role: null }),
  initializeUser: () => {
    const token = localStorage.getItem("authToken");
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    const currentTime = new Date().getTime();

    console.log("Token", token);
    console.log("TokenExpiration", tokenExpiration);

    if (token && tokenExpiration) {
      if (currentTime < parseInt(tokenExpiration)) {
        if (isMockMode()) {
          console.log("Running in mock mode");
          const user = JSON.parse(token);
          set({
            userId: user.id,
            username: user.username,
            role: user.role,
            loading: false,
          });
        } else {
          try {
            const decodedToken = jwtDecode<DecodeToken>(token);
            console.log("Decoded token:", decodedToken);

            set({
              userId: decodedToken.user.id,
              username: decodedToken.user.username,
              role: decodedToken.user.role,
              loading: false,
            });
          } catch (error) {
            console.error("Error initializing user:", error);
            localStorage.removeItem("authToken");
            localStorage.removeItem("tokenExpiration");
            set({ loading: false }); // Set loading to false on error
          }
        }
      } else {
        console.log("Token has expired");
        localStorage.removeItem("authToken");
        localStorage.removeItem("tokenExpiration");
        set({ loading: false });
      }
    } else {
      console.log("No token found, setting loading to false");
      set({ loading: false }); // Set loading to false if no token found
    }
  },
}));


