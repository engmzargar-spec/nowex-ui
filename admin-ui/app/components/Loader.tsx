"use client";

import { palette } from "../theme/palette";

export default function Loader() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen gap-4"
      style={{ backgroundColor: palette.darkcolor15, color: palette.lightcolor1 }}
    >
      {/* دایره چرخان */}
      <div
        className="animate-spin rounded-full"
        style={{
          width: "48px",
          height: "48px",
          border: `4px solid ${palette.lightcolor5}`,
          borderTopColor: palette.lightcolor4, // طلایی برند NOWEX
        }}
      />

      <p className="text-lg font-vazir">در حال بارگذاری...</p>
    </div>
  );
}
