"use client";

import { useState } from "react";
import { Input, Button, Card } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { palette, gradient } from "../../theme/palette";
import { useAuth } from "../../context/AuthContext";

export default function MobileLoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isDark, setIsDark] = useState(false);

  const handleLogin = async () => {
    try {
      setError("");

      await login(username, password);

      // ذخیره توکن در cookie برای middleware
      document.cookie = `nowex_admin_token=${localStorage.getItem(
        "nowex_admin_token"
      )}; path=/;`;

      router.push("/mobile/dashboard");
    } catch (err) {
      setError("نام کاربری یا رمز عبور اشتباه است");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-6"
      dir="rtl"
      style={{
        background: isDark
          ? gradient(palette.darkcolor16, palette.darkcolor16)
          : gradient(palette.darkcolor16, palette.darkcolor16),
        color: isDark ? palette.lightcolor16 : palette.darkcolor3,
      }}
    >
      {/* لوگو بالای صفحه */}
      <div className="mb-8">
        <Image
          src="/nowex-logo-green.png"
          alt="NOWEX Logo"
          width={180}
          height={180}
          className="object-contain"
        />
      </div>

      {/* کارت فرم ورود */}
      <Card
        className="w-full max-w-sm p-6 rounded-2xl shadow-2xl"
        style={{
          background: isDark
            ? gradient(palette.darkcolor3, palette.darkcolor4)
            : gradient(palette.lightcolor1, palette.lightcolor1),
          color: isDark ? palette.lightcolor1 : palette.darkcolor4,
        }}
      >
        <h1 className="text-2xl font-bold font-vazir text-center mb-6">
          ورود به حساب کاربری
        </h1>

        {/* فیلد نام کاربری */}
        <div className="mb-4">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="نام کاربری"
            dir="rtl"
            className="font-vazir text-right"
          />
        </div>

        {/* فیلد رمز عبور */}
        <div className="mb-4">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="رمز عبور"
            dir="rtl"
            className="font-vazir text-right"
          />
        </div>

        {/* پیام خطا */}
        {error && (
          <p className="text-red-500 text-sm font-vazir mb-4 text-center">
            {error}
          </p>
        )}

        {/* دکمه ورود */}
        <Button
          onPress={handleLogin}
          className="w-full py-3 rounded-2 font-vazir text-lg"
          style={{
            background: palette.lightcolor16,
            color: palette.darkcolor16,
          }}
        >
          ورود
        </Button>

        {/* دکمه تغییر تم */}
        <Button
          isIconOnly
          variant="light"
          className="mt-4 mx-auto text-yellow-400"
          onClick={() => setIsDark(!isDark)}
        >
          {isDark ? "☀️" : "🌙"}
        </Button>
      </Card>
    </div>
  );
}
