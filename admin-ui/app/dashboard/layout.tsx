"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const DesktopLayout = dynamic(() => import("./DesktopLayout"), { ssr: false });
const MobileLayout = dynamic(() => import("./MobileLayout"), { ssr: false });

export default function DashboardLayout({ children }) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isMobile === null) return null;

  return isMobile ? (
    <MobileLayout>{children}</MobileLayout>
  ) : (
    <DesktopLayout>{children}</DesktopLayout>
  );
}
