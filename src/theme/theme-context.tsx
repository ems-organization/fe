"use client";

import { createContext, useContext } from "react";

export type ColorMode = "light" | "dark";

export interface ThemeContextType {
  mode: ColorMode;
  toggleMode: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeMode must be used inside ThemeProvider.");
  }
  return context;
};
