"use client";

import { useState } from "react";
import { Input, Button, Card, CardHeader, CardBody } from "@nextui-org/react";
import Image from "next/image";

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
      className={`flex items-center justify-center min-h-screen ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
      dir="rtl"
    >
      {/* آیکون تغییر تم */}
      <div className="absolute top-4 left-4 cursor-pointer z-10">
        {isDark ? (
          // ☀️ خورشید
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-nowex-gold"
            viewBox="0 0 24 24"
            fill="currentColor"
            onClick={() => setIsDark(false)}
          >
            <circle cx="12" cy="12" r="5" />
            <g stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="4" />
              <line x1="12" y1="20" x2="12" y2="23" />
              <line x1="1" y1="12" x2="4" y2="12" />
              <line x1="20" y1="12" x2="23" y2="12" />
              <line x1="4.2" y1="4.2" x2="6.3" y2="6.3" />
              <line x1="17.7" y1="17.7" x2="19.8" y2="19.8" />
              <line x1="4.2" y1="19.8" x2="6.3" y2="17.7" />
              <line x1="17.7" y1="6.3" x2="19.8" y2="4.2" />
            </g>
          </svg>
        ) : (
          // 🌙 ماه
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-purple-600"
            viewBox="0 0 24 24"
            fill="currentColor"
            onClick={() => setIsDark(true)}
          >
            <path d="M21 12.79A9 9 0 0 1 11.21 3 7 7 0 1 0 21 12.79z" />
          </svg>
        )}
      </div>

      {/* فرم ورود */}
      <Card
        className={`w-full max-w-md p-6 z-10 ${
          isDark
            ? "bg-black text-white shadow-[0_0_20px_#ec4899]" // فرم تیره با سایه صورتی
            : "bg-white text-black shadow-[0_0_20px_#a855f7]" // فرم روشن با سایه بنفش
        }`}
      >
        <CardHeader className="flex flex-col items-center gap-4">
          <Image
            src={isDark ? "/logofordark.png" : "/logoforlight.png"}
            alt="NOWEX Logo"
            width={140}
            height={140}
          />
          <h1 className="text-2xl font-bold font-vazir">ورود به پنل مدیریت</h1>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            label="نام کاربری"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="font-vazir w-full"
          />
          <Input
            label="رمز عبور"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="font-vazir w-full"
          />
          {error && <p className="text-red-500 font-vazir">{error}</p>}
          <Button
            onPress={handleLogin}
            className={`font-vazir rounded-full transition-all duration-300 w-full ${
              isDark
                ? "bg-nowex-gold text-black hover:opacity-80"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
          >
            ورود
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
