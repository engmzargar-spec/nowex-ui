"use client";

import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider, useThemeContext } from "./context/ThemeContext";
import { NextUIProvider } from "@nextui-org/react";
import { nowexLightTheme, nowexDarkTheme } from "./theme/nowexTheme";

function ProvidersWrapper({ children }: { children: React.ReactNode }) {
  const { desktopTheme } = useThemeContext();
  const isDark = desktopTheme === "dark";

  return (
    <NextUIProvider theme={isDark ? nowexDarkTheme : nowexLightTheme}>
      <AuthProvider>{children}</AuthProvider>
    </NextUIProvider>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <ThemeProvider>
          <ProvidersWrapper>{children}</ProvidersWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
