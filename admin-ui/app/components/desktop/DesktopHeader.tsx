"use client";

import { Avatar, Switch, Button } from "@nextui-org/react";
import { SunIcon, MoonIcon, ArrowRightOnRectangleIcon, Bars3Icon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { palette } from "../../theme/palette";

export default function DesktopHeader({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    setDate(new Date());
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const time = date
    ? new Intl.DateTimeFormat("fa-IR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(date)
    : "";

  const persianDate = date
    ? new Intl.DateTimeFormat("fa-IR", { dateStyle: "full" }).format(date)
    : "";

  const bgColor = theme === "dark" ? palette.darkcolor1 : palette.darkcolor7;
  const textColor = palette.lightcolor1;
  const logoSrc = theme === "dark" ? "/logofordark.png" : "/logoforlight.png";

  return (
    <header
      style={{ backgroundColor: bgColor, color: textColor }}
      className="h-20 flex items-center justify-between px-8 shadow-md"
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        {/* دکمه همبرگری برای باز/بسته کردن Sidebar */}
        <Button isIconOnly variant="light" onClick={onToggleSidebar}>
          <Bars3Icon className="w-6 h-6" />
        </Button>

        {/* دکمه خروج */}
        <Button isIconOnly variant="light" onClick={() => router.push("/login")}>
          <ArrowRightOnRectangleIcon className="w-6 h-6" />
        </Button>

        {/* پروفایل */}
        <Avatar src="/avatar.png" size="sm" />
        <div className="text-xs">
          <span className="font-semibold">mehdi</span>
          <div>مدیر سیستم</div>
        </div>

        {/* تغییر تم */}
        <Switch
          isSelected={theme === "dark"}
          onValueChange={(v) => setTheme(v ? "dark" : "light")}
          size="sm"
          thumbIcon={({ isSelected }) =>
            isSelected ? <MoonIcon className="w-4 h-4" /> : <SunIcon className="w-4 h-4" />
          }
        />
      </div>

      {/* Center */}
      <div className="flex flex-col items-center">
        <span className="text-3xl font-bold">{time}</span>
        <span className="text-xs">{persianDate}</span>
      </div>

      {/* Right */}
      <Image src={logoSrc} alt="Logo" width={220} height={60} priority />
    </header>
  );
}
