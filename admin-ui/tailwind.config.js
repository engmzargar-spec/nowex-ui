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
          gold: "#FFD700",
          black: "#0A0A0A",
          glow: "#E0FFE0",
          minimal: "#F5F5F5",
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
