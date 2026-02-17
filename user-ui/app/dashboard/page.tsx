"use client";

import { useEffect, useState } from "react";
import { getUserProfile } from "@/lib/services/userService";

export default function DashboardPage() {
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const profile = await getUserProfile();
        setUser(profile);
      } catch (err: any) {
        setError("خطا در دریافت اطلاعات کاربر");
        console.error(err);
      }
    }
    fetchUser();
  }, []);

  return (
    <main className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold mb-6">داشبورد کاربر</h1>

      {error && <p className="text-red-400">{error}</p>}

      {user ? (
        <div className="bg-neutral-800 p-6 rounded-lg shadow-md w-full max-w-md text-center">
          <p className="text-lg font-semibold mb-2">خوش آمدید، {user.name}</p>
          <p className="text-gray-400">ایمیل: {user.email}</p>
          <p className="text-gray-400">شناسه: {user.id}</p>
        </div>
      ) : (
        !error && <p className="text-gray-400">در حال بارگذاری اطلاعات...</p>
      )}
    </main>
  );
}
