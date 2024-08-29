import { useEffect } from "react";
import { useUserStore } from "../stores/userStore";

const useInitializeUser = () => {
  const initializeUser = useUserStore((state) => state.initializeUser);
  const userId = useUserStore((state) => state.userId);

  useEffect(() => {
    initializeUser();
  }, [initializeUser]);

  return { userId };
};

export default useInitializeUser;