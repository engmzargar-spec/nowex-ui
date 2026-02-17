// app/styles/palette.ts

export const palette = {
  // رنگ‌های تم تیره
  darkcolor1: "#4b0447ff",
  darkcolor2: "#080033ff",
  darkcolor3: "#2a3646", // سورمه ای fxstreet
  darkcolor4: "#294258",
  darkcolor5: "#000000ff", // مشکی خالص
  darkcolor6: "#141514",//مشکی چینی
  darkcolor7: "#171615", // مشکی ارتشی
  darkcolor8: "#1d1615", // مشکی تلخ
  darkcolor9: "#292827", // مشکی قدیمی
  darkcolor10: "#0f2027",
  darkcolor11: "#203A43",
  darkcolor12: "#232526",
  darkcolor13: "#232526",
  darkcolor14: "#001534",
  darkcolor15: "#002f75",
  darkcolor16: "#00233f",
  darkcolor17: "#8369bf",


  // رنگ‌های تم روشن
  lightcolor1: "#fffffb", //  سفید خالص
  lightcolor2: "#fffff0", // سفید عاج فیل
  lightcolor3: "#ffefb3",
  lightcolor4: "#db8520", // طلایی
  lightcolor5: "#dbdbd2",// سفید خنثی
  lightcolor6: "#fcf5e5",// سفید کاغذ پوستی
  lightcolor7: "#ffd15e",
  lightcolor8: "#e2dfd2",// سفید مرواریدی    
  lightcolor9: "#6f4e37",
  lightcolor10: "#3b2f2f",
  lightcolor11: "#fe8101",
  lightcolor12: "#efda2a",
  lightcolor13: "#f6f6f6",
  lightcolor14: "#db8520",
  lightcolor15: "#b06206",
  lightcolor16: "#b4ff00",
  lightcolor17: "#61a311",
  lightcolor18: "#cbdf02",
  lightcolor19: "#2db4eb",
  lightcolor20: "#186f92",

};

// تابع کمکی برای گرادیانت
export const gradient = (colorA: string, colorB: string) =>
  `linear-gradient(135deg, ${colorA}, ${colorB})`;
