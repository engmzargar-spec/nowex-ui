"use client";

import { useEffect, useState } from "react";
import useIsMobile from "../hooks/useIsMobile";
import MobileHeader from "../components/mobile/MobileHeader";
import MobileSidebar from "../components/mobile/MobileSidebar";
import MobileDashboardPanel from "../components/mobile/MobileDashboardPanel";
import DesktopHeader from "../components/desktop/DesktopHeader";
import DesktopSidebar from "../components/desktop/DesktopSidebar";
import DesktopFooter from "../components/desktop/DesktopFooter";

export default function Layout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  // موبایل: کنترل باز/بسته بودن
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  // موبایل: کنترل مونت برای انیمیشن
  const [mobileSidebarMounted, setMobileSidebarMounted] = useState(false);

  // دسکتاپ
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);

  // مدیریت مونت/آنمونت سایدبار موبایل
  useEffect(() => {
    if (mobileSidebarOpen) {
      setMobileSidebarMounted(true);
    } else {
      const t = setTimeout(() => setMobileSidebarMounted(false), 300); // مدت انیمیشن
      return () => clearTimeout(t);
    }
  }, [mobileSidebarOpen]);

  if (isMobile === null) return null;

  if (isMobile) {
    const toggleMobileSidebar = () => setMobileSidebarOpen((prev) => !prev);

    return (
      <div className="flex flex-col min-h-screen">
        {/* هدر موبایل */}
        <MobileHeader
          isSidebarOpen={mobileSidebarOpen}
          onToggleSidebar={toggleMobileSidebar}
        />

        {/* سایدبار موبایل */}
        {mobileSidebarMounted && (
          <MobileSidebar
            open={mobileSidebarOpen}
            onClose={() => setMobileSidebarOpen(false)}
          />
        )}

        {/* پنل اصلی موبایل */}
        <main className="flex-1 p-3">
          <MobileDashboardPanel />
        </main>
      </div>
    );
  }

  // نسخه دسکتاپ
  return (
    <div className="flex flex-col min-h-screen">
      <DesktopHeader
        onToggleSidebar={() => setDesktopSidebarOpen(!desktopSidebarOpen)}
      />
      <div className="flex flex-1">
        <DesktopSidebar
          isOpen={desktopSidebarOpen}
          onOpen={() => setDesktopSidebarOpen(true)}
          onClose={() => setDesktopSidebarOpen(false)}
        />
        <main className="flex-1 p-6">{children}</main>
      </div>
      <DesktopFooter />
    </div>
  );
}
