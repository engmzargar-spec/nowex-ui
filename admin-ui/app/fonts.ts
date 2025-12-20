import localFont from "next/font/local";

// Inter (انگلیسی)
export const inter = localFont({
  src: [
    { path: "/fonts/inter.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-inter",
});

// Vazir (فارسی)
export const vazir = localFont({
  src: [
    { path: "/fonts/vazir.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-vazir",
});
