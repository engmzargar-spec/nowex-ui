"use client";

import React from "react";
import { palette } from "../theme/palette";

export default function Footer() {
  return (
    <footer
      className="flex flex-col md:flex-row items-center justify-between px-6 py-3 text-sm shadow-inner"
      style={{
        background: palette.lightcolor1,
        color: palette.darkcolor1,
      }}
    >
      {/* آدرس سایت */}
      <div className="mb-2 md:mb-0">
        <span className="font-semibold">🌐 وب‌سایت: </span>
        <a
          href="https://nowex.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          www.nowex.com
        </a>
      </div>

      {/* تلفن مدیریت */}
      <div>
        <span className="font-semibold">☎ مدیریت: </span>
        <span>+98 21 1234 5678</span>
      </div>
    </footer>
  );
}
