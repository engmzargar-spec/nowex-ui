// app/styles/palette.ts

export const palette = {
  // رنگ‌های تم تیره
  darkcolor1: "#0A142D",
  darkcolor2: "#344394",
  darkcolor3: "#1f2f57",
  darkcolor4: "#28303d",
  darkcolor5: "#000000ff", // مشکی خالص
  darkcolor6: "#141514",//مشکی چینی
  darkcolor7: "#0079c1",
  darkcolor8: "#012169",
  darkcolor9: "#1b117a",


  // رنگ‌های تم روشن
  lightcolor1: "#ffffff", //  سفید خالص
  lightcolor2: "#F3EFCC",
  lightcolor3: "#ffefb3",
  lightcolor4: "#f4e649",
  lightcolor5: "#fffff0",
  lightcolor6: "#fdf2f0",
  lightcolor7: "#ffd15e",
  lightcolor8: "#e5e5fa",

};

// تابع کمکی برای گرادیانت
export const gradient = (colorA: string, colorB: string) =>
  `linear-gradient(135deg, ${colorA}, ${colorB})`;
