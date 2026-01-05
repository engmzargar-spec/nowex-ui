"use client";

import { useState } from "react";
import MobileHeader from "./MobileHeader";
import MobileSidebar from "./MobileSidebar";
import MobileDashboardPanel from "./MobileDashboardPanel";
import MobileFooter from "./MobileFooter";
import { palette } from "../../theme/palette";

export default function MobileDashboardPage() {
  // 🎨 رنگ پس‌زمینه داشبورد موبایل
  const [bgColor, setBgColor] = useState("bg-gray-50");
  const [isMoon, setIsMoon] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // تابع تغییر رنگ پس‌زمینه
  const toggleDashboardBg = () => {
    setIsMoon(!isMoon);
    setBgColor((prev) =>
      prev === "bg-gray-50" ? "bg-gray-900" : "bg-gray-50"
    );
  };

  // باز/بسته کردن سایدبار
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* هدر موبایل */}
      <MobileHeader
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={toggleSidebar}
        onToggleDashboardBg={toggleDashboardBg}
      />

      {/* سایدبار موبایل */}
      <MobileSidebar open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* پنل داشبورد موبایل */}
      <MobileDashboardPanel bgColor={bgColor} />

      {/* فوتر موبایل */}
      <MobileFooter />
    </div>
  );
}
