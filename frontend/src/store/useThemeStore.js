import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("callix-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("callix-theme", theme);
    set({ theme });
  }
}));
