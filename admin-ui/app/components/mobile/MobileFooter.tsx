"use client";

import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/react";
import { palette } from "../../theme/palette";

export default function MobileFooter() {
  return (
    <footer
      className="px-4 py-3 border-t flex justify-center"
      style={{
        backgroundColor: palette.darkcolor16, // 🎨 پس‌زمینه تیره فوتر
        color: palette.lightcolor1,           // 🎨 متن روشن
      }}
    >
      <Button
        size="sm"
        variant="flat" // ✔ NextUI variant معتبر
        style={{
          backgroundColor: palette.lightcolor16, // 🎨 رنگ دکمه
          color: palette.darkcolor16,           // 🎨 رنگ متن دکمه
        }}
      >
        <Cog6ToothIcon className="w-8 h-8 mr-1" />
        تنظیمات
      </Button>
    </footer>
  );
}
