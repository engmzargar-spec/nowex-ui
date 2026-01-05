"use client";

import { useState } from "react";
import DesktopHeader from "./DesktopHeader";
import DesktopSidebar from "./DesktopSidebar";
import DesktopFooter from "./DesktopFooter";
import DesktopDashboardPanel from "./DesktopDashboardPanel";

export default function DesktopDashboardPage() {
  // 🎨 رنگ پس‌زمینه داشبورد دسکتاپ
  const [bgColor, setBgColor] = useState("bg-gray-50");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // تغییر رنگ پس‌زمینه
  const toggleDashboardBg = () => {
    setBgColor((prev) => (prev === "bg-gray-50" ? "bg-gray-900" : "bg-gray-50"));
  };

  // باز/بسته کردن سایدبار
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* هدر دسکتاپ */}
      <DesktopHeader
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={toggleSidebar}
        onToggleDashboardBg={toggleDashboardBg}
      />

      {/* محتوای اصلی با سایدبار و پنل */}
      <div className="flex flex-1">
        <DesktopSidebar
          isOpen={isSidebarOpen}
          onOpen={() => setIsSidebarOpen(true)}
          onClose={() => setIsSidebarOpen(false)}
        />
        <DesktopDashboardPanel bgColor={bgColor} />
      </div>

      {/* فوتر دسکتاپ */}
      <DesktopFooter />
    </div>
  );
}
