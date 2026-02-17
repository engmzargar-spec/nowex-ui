"use client";

import { useState } from "react";
import DesktopHeader from "./DesktopHeader";
import DesktopSidebar from "./DesktopSidebar";
import DesktopFooter from "./DesktopFooter";
import DesktopDashboardPanel from "./DesktopDashboardPanel";

export default function DesktopDashboardPage() {
  // 🎛 وضعیت باز/بسته بودن سایدبار
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // 🎛 تغییر وضعیت سایدبار
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // 🎨 تغییر رنگ پس‌زمینه داشبورد (در صورت نیاز آینده)
  const toggleDashboardBg = () => {
    console.log("Dashboard background toggle triggered");
  };

  return (
    <div className="flex flex-col h-screen">
      {/* 🧭 هدر دسکتاپ */}
      <DesktopHeader
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={toggleSidebar}
        onToggleDashboardBg={toggleDashboardBg}
      />

      {/* 🧱 ساختار اصلی داشبورد */}
      <div className="flex flex-1">
        {/* 📁 سایدبار */}
        <DesktopSidebar
          isOpen={isSidebarOpen}
          onOpen={() => setIsSidebarOpen(true)}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* 📊 پنل داشبورد — بدون prop اضافی */}
        <DesktopDashboardPanel />
      </div>

      {/* 🦶 فوتر */}
      <DesktopFooter />
    </div>
  );
}
