// src/stores/userStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
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
  authToken: string | null;
  tokenExpiration: number | null;
  userId: number | null;
  username: string | null;
  role: string | null;
  loading: boolean;
  remember: boolean;
}

interface Action {
  setUser: (
    userId: number,
    username: string,
    role: string,
    remember: boolean,
    authToken: string,
    tokenExpiration: number,

  ) => void;
  clearUser: () => void;
  initializeUser: () => void;
  checkExpire: () => void;
  getParsedAuthToken: () => object | null;

}


export const useUserStore = create(
  persist<UserState & Action>(
    (set) => ({
      /**
       * Initialize default values for the user state.
       */
      authToken: null,
      tokenExpiration: null,
      userId: null,
      username: null,
      role: null,
      loading: true,
      remember: false,

      /**
       * Action 
       */
      setUser: (userId, username, role, remember, authToken, tokenExpiration) => {
        console.log("Setting user:", { userId, username, role, authToken, tokenExpiration });
        set({ tokenExpiration: null })
        set({ userId, username, role, remember, authToken, tokenExpiration, loading: false });
      },
      clearUser: () => {
        set({ userId: null, username: null, role: null, remember: false, authToken: null, tokenExpiration: null, loading: false });
        console.log("User data cleared from store");
      },
      initializeUser: () => {
        console.log("Enter Initialize User");

        const { authToken, tokenExpiration } = useUserStore.getState()
        console.log("Auth Token", authToken);
        console.log("Token Expiration", tokenExpiration);



        // Check if the authToken or tokenExpiration is missing
        if (!authToken || !tokenExpiration) {
          console.log("No valid toke Found");
          set({ loading: false })
          return;
        }

        // If the user has selected the remember me option, set the token expiration to 30 minutes
        if (useUserStore.getState().remember) {
          console.log("Remember me is checked too");

          set({ tokenExpiration: new Date().getTime() + 0.5 * 60 * 1000 });

        }
        // Check if token has expired by comparing the current time to the tokenExpiration
        const currentTime = Date.now()
        console.log("CurrentTime", currentTime);
        console.log("Token Expirication", tokenExpiration);
        if (currentTime >= tokenExpiration) {

          console.log("Token has expired from initialize user function");
          set({ userId: null, username: null, authToken: null, tokenExpiration: null, loading: false });
          return;
        }

        // Step 4: Check if the application is running in mock mode
        // If in mock mode, parse the token as mock data and set the user info in the state
        if (isMockMode()) {
          console.log("Running in mock mode");
          const user = JSON.parse(authToken); // Parse the mock token

          set({
            userId: user.id,
            username: user.username,
            role: user.role,
            loading: false,
          });
          return;
        }

        // Step 5: Try to decode the token for a real user in non-mock mode
        // If decoding succeeds, set the user info in the state
        try {
          const decodedToken = jwtDecode<DecodeToken>(authToken);
          console.log("Decoded token:", decodedToken);

          set({
            userId: decodedToken.user.id,
            username: decodedToken.user.username,
            role: decodedToken.user.role,
            loading: false,
          });
        } catch (error) {
          // Step 6: If an error occurs during token decoding, log the error and set loading to false
          console.error("Error initializing user:", error);
          set({ loading: false });
        }
      },
      checkExpire: () => {
        console.log("Enter check Expire function");

        const { tokenExpiration, remember } = useUserStore.getState()
        const currentTime = Date.now()
        console.log("check expire function");
        console.log("CurrentTime", currentTime);
        console.log("Token Expirication", tokenExpiration);

        // Check if remember me is checked we extend it 30 minutes when checkExpire function is call
        if (remember) {
          console.log("Remember me is checked");

          set({ tokenExpiration: new Date().getTime() + 30 * 60 * 1000 });

        }
        console.log("New Token Expirication", tokenExpiration);

        // If remember me is not checked we do not extend the token expiration, tokenExpiration must not be null
        if (tokenExpiration === null) return;
        if (currentTime >= tokenExpiration) {
          console.log("Token has expired from check Expire function");
          set({ userId: null, authToken: null, tokenExpiration: null, loading: false, username: null });
          return;
        }

      },

      // Function to parse authToken into a usable object.
      getParsedAuthToken: () => {
        const { authToken } = useUserStore.getState();
        if (!authToken) {
          console.error("Auth token not found");
          return null;
        }

        try {
          // Parse the token as JSON
          const parsedToken = JSON.parse(authToken);
          console.log("Parsed Token from Store:", parsedToken);
          return parsedToken;
        } catch (error) {
          console.error("Error parsing auth token:", error);
          return null;
        }
      },

    }),
    {
      name: "user-storage", // Name of the localStorage key
      getStorage: () => localStorage, // Specify the storage type (localStorage or sessionStorage)
    }
  )
);
