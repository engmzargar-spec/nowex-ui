"use client";

import { useState } from "react";
import MobileSidebar from "@/app/components/mobile/MobileSidebar";
import MobileHeader from "@/app/components/mobile/mobileheader";

export default function MobileDashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen relative">

      {/* سایدبار موبایل */}
      <MobileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* هدر موبایل */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <MobileHeader
          isSidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(true)}
          onToggleDashboardBg={() => {}}
        />
      </div>

      {/* فاصله برای اینکه محتوا زیر هدر قرار بگیرد */}
      <div className="h-[72px]" />

      {/* محتوای صفحه */}
      <main className="flex-1 overflow-y-auto p-3">
        {children}
      </main>
    </div>
  );
}
