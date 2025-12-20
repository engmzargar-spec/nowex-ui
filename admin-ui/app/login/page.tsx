"use client";

import { useState } from "react";
import { Input, Button, Card, CardHeader, CardBody } from "@nextui-org/react";
import Image from "next/image";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

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
          <SunIcon
            className="w-6 h-6 text-nowex-gold"
            onClick={() => setIsDark(false)}
          />
        ) : (
          <MoonIcon
            className="w-6 h-6 text-purple-600"
            onClick={() => setIsDark(true)}
          />
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
