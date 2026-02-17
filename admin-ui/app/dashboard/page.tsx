"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DesktopDashboardPanel from "../components/desktop/DesktopDashboardPanel";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // 📌 اینجا می‌تونی لاجیک بررسی ورود رو بذاری
    // مثلا اگر کاربر لاگین نکرده بود، برگرده به صفحه لاگین
    const isLoggedIn = true; // فعلاً تستی، بعداً با state یا کوکی جایگزین کن
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, [router]);

  return <DesktopDashboardPanel />;
}
