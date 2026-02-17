"use client";

import {
  Bars3Icon,
  ArrowRightOnRectangleIcon,
  MoonIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { Button, Avatar } from "@nextui-org/react";
import { palette } from "../../theme/palette";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; // اضافه‌شده برای نمایش لوگو

export default function MobileHeader({
  isSidebarOpen,
  onToggleSidebar,
  onToggleDashboardBg,
}: {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onToggleDashboardBg: () => void;
}) {
  const [isMoon, setIsMoon] = useState(true);
  const router = useRouter();

  const handleToggleBg = () => {
    setIsMoon(!isMoon);
    onToggleDashboardBg();
  };

  const handleLogout = () => {
    router.push("/mobile/login");
  };

  return (
    <header
      className="flex items-center justify-between px-4 h-[72px] shadow-md"
      style={{
        backgroundColor: palette.darkcolor16,
        color: palette.lightcolor1,
      }}
    >
      <div className="flex items-center gap-3">
        <Button
          isIconOnly
          variant="light"
          onClick={onToggleSidebar}
          className="text-white-400"
          aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
        >
          <Bars3Icon className="w-6 h-6" />
        </Button>
        <Avatar name="M" size="sm" />
      </div>

      {/* لوگوی مرکزی به‌جای متن NOW‑EX */}
      <div className="flex items-center justify-center">
        <Image
          src="/nowex-logo-green.png"
          alt="NOW‑EX Logo"
          width={100}
          height={32}
          className="object-contain"
        />
      </div>

      <div className="flex items-center gap-2">
        <Button
          isIconOnly
          variant="light"
          className="text-with-400"
          aria-label="Toggle dashboard background"
          onClick={handleToggleBg}
        >
          {isMoon ? <MoonIcon className="w-6 h-6" /> : <StarIcon className="w-6 h-6" />}
        </Button>

        <Button
          isIconOnly
          variant="light"
          className="text-with-500"
          aria-label="Logout"
          onClick={handleLogout}
        >
          <ArrowRightOnRectangleIcon className="w-6 h-6" />
        </Button>
      </div>
    </header>
  );
}
