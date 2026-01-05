"use client";

import {
  Bars3Icon,
  ArrowRightOnRectangleIcon,
  MoonIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { Button, Avatar } from "@nextui-org/react";
import { palette } from "../../theme/palette";
import { useState } from "react";
import { useRouter } from "next/navigation"; // 📌 اضافه شد

export default function MobileHeader({
  isSidebarOpen,
  onToggleSidebar,
  onToggleDashboardBg, // 📌 تابعی برای تغییر رنگ پس‌زمینه داشبورد
}: {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onToggleDashboardBg: () => void;
}) {
  const [isMoon, setIsMoon] = useState(true);
  const router = useRouter(); // 📌 برای هدایت کاربر

  const handleToggleBg = () => {
    setIsMoon(!isMoon);
    onToggleDashboardBg();
  };

  const handleLogout = () => {
    router.push("/login"); // 📌 مسیر درست برای صفحه لاگین موبایل
  };

  return (
    <header
      className="flex items-center justify-between px-4 h-14 shadow-md"
      style={{ backgroundColor: palette.darkcolor1, color: palette.lightcolor1 }}
    >
      {/* راست چین: دکمه منو + آواتار */}
      <div className="flex items-center gap-3">
        <Button
          isIconOnly
          variant="light"
          onClick={onToggleSidebar}
          className="text-yellow-400"
          aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
        >
          <Bars3Icon className="w-6 h-6" />
        </Button>
        <Avatar name="M" size="sm" />
      </div>

      {/* لوگو وسط-راست */}
      <div className="text-lg font-bold select-none">NOW‑EX</div>

      {/* سمت چپ: دکمه تغییر رنگ داشبورد + خروج */}
      <div className="flex items-center gap-2">
        <Button
          isIconOnly
          variant="light"
          className="text-blue-400"
          aria-label="Toggle dashboard background"
          onClick={handleToggleBg}
        >
          {isMoon ? (
            <MoonIcon className="w-6 h-6" />
          ) : (
            <StarIcon className="w-6 h-6" />
          )}
        </Button>

        <Button
          isIconOnly
          variant="light"
          className="text-red-500"
          aria-label="Logout"
          onClick={handleLogout} // 📌 اصلاح شد
        >
          <ArrowRightOnRectangleIcon className="w-6 h-6" />
        </Button>
      </div>
    </header>
  );
}
