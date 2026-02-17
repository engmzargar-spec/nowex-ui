"use client";

import { palette } from "./palette";

export const nowexLightTheme = {
  className: "nowex-light",
  theme: {
    colors: {
      primary: palette.lightcolor16,
      secondary: palette.lightcolor6,
      success: palette.lightcolor17,
      warning: palette.lightcolor14,
      danger: palette.darkcolor5,

      background: palette.lightcolor1,
      foreground: palette.darkcolor5,
      divider: palette.lightcolor5,
    },

    layout: {
      radius: {
        small: "8px",
        medium: "12px",
        large: "18px",
      },
    },
  },
};

export const nowexDarkTheme = {
  className: "nowex-dark",
  theme: {
    colors: {
      primary: palette.darkcolor16,
      secondary: palette.darkcolor6,
      success: palette.darkcolor17,
      warning: palette.lightcolor14,
      danger: palette.lightcolor1,

      background: palette.darkcolor14,
      foreground: palette.lightcolor1,
      divider: palette.darkcolor9,
    },

    layout: {
      radius: {
        small: "8px",
        medium: "12px",
        large: "18px",
      },
    },
  },
};
