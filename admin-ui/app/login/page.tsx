"use client";

import { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import Image from "next/image";
import { palette, gradient } from "../theme/palette"; // پالت رنگ مرکزی

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isDark, setIsDark] = useState(false);

  const handleLogin = () => {
    if (username === "admin" && password === "1234") {
      window.location.href = "/dashboard";
    } else {
      setError("نام کاربری یا رمز عبور اشتباه است");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      dir="rtl"
      style={{
        background: isDark
          ? gradient(palette.darkcolor1, palette.darkcolor2) // پس‌زمینه اصلی صفحه در حالت تاریک
          : gradient(palette.lightcolor1, palette.lightcolor2), // پس‌زمینه اصلی صفحه در حالت روشن
        color: isDark ? palette.lightcolor1 : palette.darkcolor3, // رنگ متن عمومی صفحه
      }}
    >
      {/* دکمه تغییر تم */}
      <div className="absolute top-4 left-4 cursor-pointer z-10">
        {isDark ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7"
            viewBox="0 0 24 24"
            fill={palette.lightcolor3}
            onClick={() => setIsDark(false)}
          >
            <circle cx="12" cy="12" r="5" />
            <g stroke={palette.lightcolor3} strokeWidth="2">
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
            fill={palette.darkcolor3}
            onClick={() => setIsDark(true)}
          >
            <path d="M21 12.79A9 9 0 0 1 11.21 3 7 7 0 1 0 21 12.79z" />
          </svg>
        )}
      </div>

      {/* کانتینر کارت‌ها */}
      <div className="flex flex-col md:flex-row w-full max-w-6xl gap-4 md:gap-6 px-4 md:px-6 animate-[fadeInUp_700ms_ease-out]">
        {/* کارت خوش‌آمد فقط دسکتاپ */}
        <div
          className="hidden md:flex w-full md:w-1/2 rounded-[1.5rem] min-h-[640px] flex-col items-center justify-center p-10"
          style={{
            background: isDark
              ? gradient(palette.darkcolor2, palette.darkcolor4)
              : gradient(palette.darkcolor2, palette.darkcolor1),
            boxShadow: isDark
              ? `0 0 20px ${palette.lightcolor1}`
              : `0 0 50px ${palette.darkcolor4}`,
            color: palette.lightcolor1,
          }}
        >
          <Image
            src="/adminloginicon.png"
            alt="Admin Login Icon"
            width={250}
            height={250}
            className="mb-6 object-contain"
          />
          <h1 className="text-5xl font-bold font-vazir text-center">
            ورود به پنل مدیریت
          </h1>
          <p className="mt-4 text-xl opacity-90 font-vazir text-center">
            خوش آمدید! لطفاً اطلاعات ورود خود را وارد کنید.
          </p>
          <p className="mt-6 text-md font-vazir text-center opacity-80">
            در صورت فراموشی نام کاربری یا رمز عبور با مدیریت تماس بگیرید
          </p>
        </div>

        {/* کارت ورود اطلاعات */}
        <div
          className="w-full md:w-1/2 rounded-[1.5rem] min-h-[480px] md:min-h-[640px] flex flex-col justify-start items-center p-6 md:p-10"
          style={{
            background: isDark
              ? gradient(palette.darkcolor4, palette.darkcolor2)
              : gradient(palette.lightcolor1, palette.lightcolor1),
            boxShadow: isDark
              ? `0 0 20px ${palette.lightcolor1}`
              : `0 0 50px ${palette.darkcolor4}`,
            color: isDark ? palette.darkcolor3 : palette.darkcolor4,
          }}
        >
          {/* لوگو و تیتر فقط موبایل */}
          <div className="w-full flex flex-col items-center mt-4 mb-6 md:hidden">
            <Image
              src={isDark ? "/logofordark.png" : "/logoforlight.png"}
              alt="NOWEX Logo"
              width={160}
              height={160}
              className="object-contain"
            />
            <h1 className="mt-4 text-2xl font-bold font-vazir text-center">
              ورود به پنل مدیریت
            </h1>
            <p className="mt-2 text-sm font-vazir text-center opacity-80">
              اگر نام کاربری و رمز عبور خود را فراموش کرده‌اید با مدیریت تماس بگیرید
            </p>
          </div>

          {/* فرم ورود */}
          <div className="w-full max-w-md flex flex-col items-center mt-2 md:mt-4">
            {/* لوگو فقط دسکتاپ */}
            <div className="hidden md:flex justify-center mb-6">
              <Image
                src={isDark ? "/logofordark.png" : "/logoforlight.png"}
                alt="NOWEX Logo"
                width={200}
                height={250}
                className="object-contain"
              />
            </div>

            {/* فیلد نام کاربری */}
            <div className="w-full flex flex-col gap-y-1 mb-3 md:mb-4">
              <div
                className="text-right font-vazir text-sm md:text-base pr-2 mb-1"
                style={{
                  color: isDark ? palette.darkcolor8 : palette.darkcolor9,
                }}
              >
                نام کاربری
              </div>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="font-vazir w-full text-right pr-3 md:pr-4 rounded-full"
                dir="rtl"
                variant="flat"
                style={{
                  background: "transparent",
                  border: "none",
                  color: isDark ? palette.lightcolor1 : palette.darkcolor3,
                }}
              />
            </div>

            {/* فیلد رمز عبور */}
            <div className="w-full flex flex-col gap-y-1 mb-4 md:mb-6">
              <div
                className="text-right font-vazir text-sm md:text-base pr-2 mb-1"
                style={{
                  color: isDark ? palette.darkcolor8 : palette.darkcolor9,
                }}
              >
                رمز ورود
              </div>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="font-vazir w-full text-right pr-3 md:pr-4 rounded-full"
                dir="rtl"
                variant="flat"
                style={{
                  background: "transparent",
                  border: "none",
                  color: isDark ? palette.lightcolor2 : palette.lightcolor3,
                }}
              />
            </div>

            {/* پیام خطا */}
            {error && (
              <p
                className="font-vazir mb-3 md:mb-4"
                style={{
                  color: isDark ? palette.darkcolor5 : palette.darkcolor3,
                }}
              >
                {error}
              </p>
            )}

            {/* دکمه ورود */}
            <Button
              onPress={handleLogin}
              className="mt-20 mb-4 font-vazir rounded-full transition-all duration-250 w-full py-4 md:py-6 text-base md:text-lg"
              style={{
                background: isDark ? palette.darkcolor7 : palette.darkcolor2,
                color: palette.lightcolor1,
              }}
            >
              ورود
            </Button>
          </div>
        </div>
      </div>

       <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(24px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
