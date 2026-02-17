"use client";

import dynamic from "next/dynamic";

// 🔥 Switcher فقط در Client اجرا می‌شود
const AdminUsersSwitcher = dynamic(() => import("./AdminUsersSwitcher"), {
  ssr: false,
});

export default function Page() {
  return <AdminUsersSwitcher />;
}
