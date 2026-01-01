"use client";

import {NextUIProvider} from "@nextui-org/react";
import {ThemeProvider} from "next-themes";
import "./globals.css";
import { Vazirmatn } from "next/font/google";

// فونت فارسی (می‌تونی فونت دلخواه برندت رو جایگزین کنی)
const vazir = Vazirmatn({
  subsets: ["arabic"],
  weight: ["400", "700"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" className={vazir.className}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light">
          <NextUIProvider>
            {children}
          </NextUIProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
