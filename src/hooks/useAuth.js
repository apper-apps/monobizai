import { useState, useEffect } from "react";
import { authenticateUser } from "@/utils/firebase";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        setError(null);
        const authenticatedUser = await authenticateUser();
        setUser(authenticatedUser);
      } catch (error) {
        console.error("Authentication failed:", error);
        setError("Failed to authenticate. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const retry = () => {
    setLoading(true);
    setError(null);
    window.location.reload();
  };

  return { user, loading, error, retry };
};