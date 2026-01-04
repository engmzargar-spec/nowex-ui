"use client";

import { Bars3Icon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { Button, Avatar } from "@nextui-org/react";
import { palette } from "../../theme/palette";

export default function MobileHeader({
  isSidebarOpen,
  onToggleSidebar,
}: {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}) {
  return (
    <header
      className="flex items-center justify-between px-4 h-14 shadow-md"
      style={{ backgroundColor: palette.darkcolor1, color: palette.lightcolor1 }}
    >
      {/* راست چین: دکمه منو + آواتار */}
      <div className="flex items-center gap-3">
        <Button
          isIconOnly
          variant="light"
          onClick={onToggleSidebar}
          className="text-yellow-400"
          aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
        >
          <Bars3Icon className="w-6 h-6" />
        </Button>
        <Avatar name="M" size="sm" />
      </div>

      {/* لوگو وسط-راست */}
      <div className="text-lg font-bold select-none">NOW‑EX</div>

      {/* خروج */}
      <Button isIconOnly variant="light" className="text-red-500" aria-label="Logout">
        <ArrowRightOnRectangleIcon className="w-6 h-6" />
      </Button>
    </header>
  );
}
