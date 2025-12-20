import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nowex: {
          gold: "#FFD700",   // Gold Edition
          black: "#0A0A0A",  // Black Premium
          glow: "#E0FFE0",   // Glow Edition
          minimal: "#F5F5F5" // Minimal Edition
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        vazir: ["Vazir", "sans-serif"],
      },
    },
  },
  plugins: [nextui()],
};

export default config;
