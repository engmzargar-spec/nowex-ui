"use client";

import { useState } from "react";
import { useThemeContext } from "@/app/context/ThemeContext";

import DesktopSidebar from "@/app/components/desktop/DesktopSidebar";
import DesktopHeader from "@/app/components/desktop/DesktopHeader";

export default function DesktopDashboardLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const { desktopTheme } = useThemeContext();
  const isDark = desktopTheme === "dark";

  const pageBg = isDark ? "#0d0d0d" : "#f5f5f5";

  return (
    <div
      className="flex h-screen"
      style={{ backgroundColor: pageBg }}
    >
      <DesktopSidebar
        isOpen={isSidebarOpen}
        onOpen={() => setSidebarOpen(true)}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DesktopHeader
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        />

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
