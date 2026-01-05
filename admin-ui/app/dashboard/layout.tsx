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

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [mobileSidebarMounted, setMobileSidebarMounted] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);

  useEffect(() => {
    if (mobileSidebarOpen) {
      setMobileSidebarMounted(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      const t = setTimeout(() => setMobileSidebarMounted(false), 300);
      return () => clearTimeout(t);
    }
  }, [mobileSidebarOpen]);

  if (isMobile === null) return null;

  // 👇 لایه اصلی صفحه، بدون هیچ لایه اضافی
  // در حالت روشن: سفید / در حالت تاریک: خاکستری تیره
  // اگر بخوای گرادیانت بذاری، همینجا تغییر می‌دی
  const baseClass =
    "min-h-screen flex flex-col bg-background text-foreground";

  if (isMobile) {
    const toggleMobileSidebar = () => setMobileSidebarOpen((prev) => !prev);

    return (
      <div className={baseClass}>
        <MobileHeader
          isSidebarOpen={mobileSidebarOpen}
          onToggleSidebar={toggleMobileSidebar}
        />
        {mobileSidebarMounted && (
          <MobileSidebar
            open={mobileSidebarOpen}
            onClose={() => setMobileSidebarOpen(false)}
          />
        )}
        <main className="flex-1 p-3">
          <MobileDashboardPanel />
        </main>
      </div>
    );
  }

  return (
    <div className={baseClass}>
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
