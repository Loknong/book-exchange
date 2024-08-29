import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const { userId, initializeUser, loading } = useUserStore();

  useEffect(() => {
    if (userId === null) {
      console.log("User ID is null, initializing user...");
      initializeUser(); // Initialize user from token if not already set
    }
  }, [userId, initializeUser, loading]);

  if (loading) {
    console.log("Loading state is true, showing loading message...");
    return <div>Loading...</div>; // or a more sophisticated loading indicator
  }

  if (!userId) {
    {
      console.log("ProtectedRoute: User not logged in");
    }
    return <Navigate to="/login" />;
  }
  return <div>{children}</div>;
};

export default ProtectedRoute;
