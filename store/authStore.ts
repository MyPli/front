import { auth } from "@/models/auth.model";
import { create } from "zustand";

const isClient = typeof window !== "undefined";

interface StoreState {
  isloggedIn: boolean;
  storeLogin: ({ accessToken, refreshToken }: auth) => void;
  storeLogout: () => void;
}

const setTokens = ({ accessToken, refreshToken }: auth) => {
  if (isClient) {
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("refreshToken", refreshToken);
  }
};

export const getAccessToken = () => {
  return isClient ? sessionStorage.getItem("accessToken") : null;
};

export const getRefreshToken = () => {
  return isClient ? sessionStorage.getItem("refreshToken") : null;
};

export const removeTokens = () => {
  if (isClient) {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
  }
};

export const useAuthStore = create<StoreState>((set) => ({
  isloggedIn: !!getAccessToken(),
  storeLogin: ({ accessToken, refreshToken }: auth) => {
    setTokens({ accessToken, refreshToken });
    set({
      isloggedIn: true,
    });
  },
  storeLogout: () => {
    removeTokens();
    set({
      isloggedIn: false,
    });
  },
}));
