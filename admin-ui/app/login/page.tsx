"use client";

import { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import apiClient from "../services/apiClient";   // ← اضافه شد
import { palette, gradient } from "../theme/palette";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isDark, setIsDark] = useState(false);

  // ---------------------------------------------------------
  // 🔥 نسخهٔ اصلاح‌شدهٔ کامل handleLogin
  // ---------------------------------------------------------
  const handleLogin = async () => {
    try {
      setError("");

      // 🔥 مسیر درست شده
      const res = await apiClient.post("/admin/auth/login", {
        username,
        password,
      });

      const data = res.data;

      // ذخیره توکن
      localStorage.setItem("nowex_admin_token", data.access_token);

      // ذخیره در کوکی برای middleware
      document.cookie = `nowex_admin_token=${data.access_token}; path=/;`;

      router.push("/dashboard");
    } catch (err) {
      setError("نام کاربری یا رمز عبور اشتباه است");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      dir="rtl"
      style={{
        background: isDark
          ? gradient(palette.darkcolor6, palette.darkcolor5)
          : gradient(palette.lightcolor6, palette.lightcolor2),
        color: isDark ? palette.lightcolor1 : palette.lightcolor1,
      }}
    >
      {/* دکمه تغییر تم */}
      <div className="absolute top-4 left-4 cursor-pointer z-10">
        {isDark ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7"
            viewBox="0 0 24 24"
            fill={palette.lightcolor4}
            onClick={() => setIsDark(false)}
          >
            <circle cx="12" cy="12" r="5" />
            <g stroke={palette.lightcolor4} strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="4" />
              <line x1="12" y1="20" x2="12" y2="23" />
              <line x1="1" y1="12" x2="4" y2="12" />
              <line x1="20" y1="12" x2="23" y2="12" />
            </g>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7"
            viewBox="0 0 24 24"
            fill={palette.lightcolor6}
            onClick={() => setIsDark(true)}
          >
            <path d="M21 12.79A9 9 0 0 1 11.21 3 7 7 0 1 0 21 12.79z" />
          </svg>
        )}
      </div>

      {/* کانتینر کارت‌ها */}
      <div className="flex flex-row w-full max-w-6xl gap-3 px-6 animate-[fadeInUp_700ms_ease-out]">
        
        {/* کارت خوش‌آمد */}
        <div
          className="w-2/3 rounded-[1.5rem] min-h-[640px] flex flex-col items-center justify-center p-10"
          style={{
            background: gradient(palette.darkcolor11, palette.darkcolor16),
            boxShadow: `0 0 0px ${palette.lightcolor1}`,
            color: isDark ? palette.lightcolor1 : palette.darkcolor4,
          }}
        >
          <Image
            src="/wellcomlogo-green.png"
            alt="Admin Login Icon"
            width={400}
            height={400}
            className="mb-6 object-contain"
          />

          <p
            className="mt-4 text-xl opacity-90 font-vazir text-center"
            style={{ color: palette.lightcolor13 }}
          >
            خوش آمدید! لطفاً اطلاعات ورود خود را وارد کنید.
          </p>

          <p
            className="mt-6 text-md font-vazir text-center opacity-80"
            style={{ color: palette.lightcolor13 }}
          >
            در صورت فراموشی نام کاربری یا رمز عبور با مدیریت تماس بگیرید
          </p>
        </div>

        {/* کارت ورود */}
        <div
          className="w-2/3 rounded-[1.5rem] min-h-[540px] flex flex-col justify-start items-center p-10"
          style={{
            background: gradient(palette.darkcolor16, palette.darkcolor11),
            boxShadow: `0 0 0px ${palette.darkcolor5}`,
            color: palette.lightcolor1,
          }}
        >
          {/* لوگو */}
          <div className="flex justify-center mb-10 p-12">
            <Image
              src="/nowex-logo-green.png"
              alt="NOWEX Logo"
              width={250}
              height={180}
              className="object-contain"
            />
          </div>

          {/* فرم */}
          <div className="w-full max-w-md flex flex-col items-center mt-4">
            
            {/* نام کاربری */}
            <div className="w-full flex flex-col gap-y-1 mb-4">
              <div className="text-right font-vazir text-base pr-2 mb-1">
                نام کاربری
              </div>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="font-vazir w-full text-right pr-4 rounded-full"
                dir="rtl"
                variant="flat"
              />
            </div>

            {/* رمز عبور */}
            <div className="w-full flex flex-col gap-y-1 mb-6">
              <div className="text-right font-vazir text-base pr-2 mb-1">
                رمز ورود
              </div>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="font-vazir w-full text-right pr-4 rounded-full"
                dir="rtl"
                variant="flat"
              />
            </div>

            {/* پیام خطا */}
            {error && (
              <p className="font-vazir mb-4 text-red-500">{error}</p>
            )}

            {/* دکمه ورود */}
            <Button
              onPress={handleLogin}
              className="mt-10 font-vazir rounded-full transition-all duration-250 w-full py-6 text-lg"
              style={{
                background: palette.lightcolor16,
                color: palette.darkcolor16,
              }}
            >
              ورود
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
