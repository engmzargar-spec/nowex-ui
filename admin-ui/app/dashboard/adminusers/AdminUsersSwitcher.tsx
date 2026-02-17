"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const AdminUsersDesktop = dynamic(() => import("./page-desktop"), { ssr: false });
const AdminUsersMobile = dynamic(() => import("./page-mobile"), { ssr: false });

export default function AdminUsersSwitcher() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // 🔥 به جای null، یک fallback کوچک رندر کن
  if (isMobile === null) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <p style={{ opacity: 0.6 }}>در حال بارگذاری...</p>
      </div>
    );
  }

  return isMobile ? <AdminUsersMobile /> : <AdminUsersDesktop />;
}
