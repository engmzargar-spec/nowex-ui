"use client";

import { createContext, useContext, useState } from "react";

type ThemeContextType = {
  desktopTheme: string;
  setDesktopTheme: (theme: string) => void;
  mobileTheme: string;
  setMobileTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [desktopTheme, setDesktopTheme] = useState("light");
  const [mobileTheme, setMobileTheme] = useState("light");

  return (
    <ThemeContext.Provider
      value={{ desktopTheme, setDesktopTheme, mobileTheme, setMobileTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useThemeContext must be used inside ThemeProvider");
  }
  return ctx;
};
