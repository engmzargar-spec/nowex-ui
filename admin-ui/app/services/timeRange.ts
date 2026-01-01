export type TimePreset = "daily" | "threeDays" | "weekly" | "fifteenDays" | "monthly" | "custom";

export interface TimeRange {
  preset: TimePreset;
  startJalali: string;
  endJalali: string;
}

// 👇 پیش‌فرض روزانه
export function getDefaultDailyRange(): TimeRange {
  return {
    preset: "daily",
    startJalali: "1404-10-12 00:05",
    endJalali: "1404-10-13 23:55",
  };
}
