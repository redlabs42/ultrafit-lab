import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser, User } from "@/types";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setAuth: (auth: AuthUser) => void;
  setUser: (user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: true,

      setAuth: (auth: AuthUser) => {
        set({
          user: auth.user,
          accessToken: auth.accessToken,
          refreshToken: auth.refreshToken,
          isAuthenticated: true,
          isLoading: false,
        });

        // Store tokens in localStorage for API client
        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", auth.accessToken);
          localStorage.setItem("refreshToken", auth.refreshToken);
        }
      },

      setUser: (user: User) => {
        set({ user });
      },

      logout: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoading: false,
        });

        // Clear tokens from localStorage
        if (typeof window !== "undefined") {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        }
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
