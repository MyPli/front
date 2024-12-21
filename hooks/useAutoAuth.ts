import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

export const useAutoAuth = () => {
  const { initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, []);
};
