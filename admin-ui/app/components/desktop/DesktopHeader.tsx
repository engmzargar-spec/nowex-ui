"use client";

import { Avatar, Button } from "@nextui-org/react";
import {
  ArrowRightOnRectangleIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { palette } from "../../theme/palette";
import { useThemeContext } from "../../context/ThemeContext";

// مسیر صحیح ThemeSwitcher
import ThemeSwitcher from "../ThemeSwitcher";

interface DesktopHeaderProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export default function DesktopHeader({ onToggleSidebar }: DesktopHeaderProps) {
  const { desktopTheme } = useThemeContext();
  const router = useRouter();

  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    setDate(new Date());
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const time = date
    ? new Intl.DateTimeFormat("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(date)
    : "";

  const persianDate = date
    ? new Intl.DateTimeFormat("fa-IR", { dateStyle: "full" }).format(date)
    : "";

  const gregorianDate = date
    ? new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(date)
    : "";

  return (
    <header
      className="h-36 flex items-center justify-between px-8 shadow-md"
      style={{
        backgroundColor: palette.darkcolor16,
        color: palette.lightcolor1,
      }}
    >
      {/* LEFT */}
      <div className="flex items-center gap-6">

        {/* Sidebar Toggle */}
        <Button
          isIconOnly
          variant="flat"
          onClick={onToggleSidebar}
          style={{ backgroundColor: palette.lightcolor16 }}
        >
          <Bars3Icon className="w-6 h-6" style={{ color: palette.darkcolor16 }} />
        </Button>

        {/* Logout */}
        <Button
          isIconOnly
          variant="flat"
          onClick={() => router.push("/login")}
          style={{ backgroundColor: palette.lightcolor16 }}
        >
          <ArrowRightOnRectangleIcon
            className="w-6 h-6"
            style={{ color: palette.darkcolor16 }}
          />
        </Button>

        {/* Profile */}
        <Avatar src="/avatar.png" size="sm" />
        <div className="text-xs">
          <span className="font-semibold">mehdi</span>
          <div>مدیر سیستم</div>
        </div>

        {/* Theme Switcher */}
        <div className="flex items-center justify-center">
          <ThemeSwitcher />
        </div>
      </div>

      {/* CENTER */}
      <div className="flex flex-col items-center">
        <span className="text-3xl font-bold">{time}</span>

        <div className="flex items-center gap-2 text-xs">
          <span>{persianDate}</span>

          <span
            style={{
              width: "1px",
              height: "14px",
              backgroundColor: palette.lightcolor1,
              display: "inline-block",
            }}
          />

          <span>{gregorianDate}</span>
        </div>
      </div>

      {/* RIGHT */}
      <Image
        src="/nowex-logo-green.png"
        alt="Logo"
        width={200}
        height={200}
        priority
      />
    </header>
  );
}
