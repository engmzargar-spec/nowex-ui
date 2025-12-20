const { nextui } = require("@nextui-org/react");

module.exports = {
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
        inter: ["var(--font-inter)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
        roboto: ["var(--font-roboto)", "sans-serif"],
        iransans: ["var(--font-iransans)", "sans-serif"],
        vazir: ["var(--font-vazir)", "sans-serif"],
        sahel: ["var(--font-sahel)", "sans-serif"],
        shabnam: ["var(--font-shabnam)", "sans-serif"],
      },
    },
  },
  plugins: [nextui()],
};
