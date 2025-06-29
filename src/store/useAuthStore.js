import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,

      login: ({ user, token, refreshToken }) => {
        set(() => ({
          user,
          token,
          refreshToken,
          isAuthenticated: true,
        }));
      },

      logout: () => {
        set(() => ({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
        }));
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
