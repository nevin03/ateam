import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,

      login: ({ user, accessToken, refreshToken }) =>
        set({
          user,
          token: accessToken,
          refreshToken,
          isAuthenticated: true,
        }),

      logout: () => {
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
        });
        localStorage.setItem("logout-event", Date.now());
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
