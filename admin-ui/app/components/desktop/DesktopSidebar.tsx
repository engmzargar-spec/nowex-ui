"use client";

import { useState } from "react";
import { Button } from "@nextui-org/react";
import {
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  BanknotesIcon,
  XMarkIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import { palette } from "../../theme/palette";

const menuItems = [
  { id: "dashboard", title: "داشبورد", icon: HomeIcon, submenus: ["نمای کلی", "گزارش‌ها"] },
  { id: "adminusers", title: "کاربران ادمین", icon: UserGroupIcon, submenus: ["پروفایل ادمین", "داشبورد وظایف"] },
  { id: "users", title: "کاربران سایت", icon: UserGroupIcon, submenus: ["لیست کاربران", "ویرایش اطلاعات کاربر"] },
  { id: "mali", title: "بررسی‌های مالی", icon: BanknotesIcon, submenus: ["واریزی‌ها", "برداشت‌ها", "بررسی حساب‌ها"] },
  { id: "messaging", title: "سیستم پیام", icon: ChatBubbleLeftRightIcon, submenus: ["درون سازمانی", "عمومی", "اختصاصی", "پیامک", "ایمیل"] },
  { id: "analytics", title: "آنالیزها", icon: ChartBarIcon, submenus: ["آمار کلی", "نمودارها"] },
];

export default function DesktopSidebar({
  isOpen,
  onOpen,
  onClose,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const { theme } = useTheme();
  const [expanded, setExpanded] = useState<string | null>(null);

  const bgColor = theme === "dark" ? palette.darkcolor1 : palette.darkcolor7;
  const textColor = palette.lightcolor1;

  const handleMenuClick = (menuId: string) => {
    if (!isOpen) {
      onOpen();
      setExpanded(menuId);
    } else {
      setExpanded(expanded === menuId ? null : menuId);
    }
  };

  const handleClose = () => {
    setExpanded(null);
    onClose();
  };

  return (
    <aside
      style={{ backgroundColor: bgColor, color: textColor }}
      className={`${isOpen ? "w-56" : "w-16"} flex-shrink-0 h-screen shadow-md flex flex-col transition-all duration-300 border-r border-white/10`}
    >
      {/* عنوان + دکمه بستن */}
      <div className="flex justify-between items-center px-4 py-4 font-bold text-lg">
        <span>{isOpen ? "داشبورد مدیریت NOW‑EX" : "N"}</span>
        {isOpen && (
          <Button isIconOnly variant="light" onClick={handleClose}>
            <XMarkIcon className="w-5 h-5" />
          </Button>
        )}
      </div>

      {/* منوها */}
      <nav className="flex-1 overflow-y-auto">
        {menuItems.map((menu, index) => {
          const Icon = menu.icon;
          const isExpanded = expanded === menu.id;
          return (
            <div key={menu.id} className="mb-3">
              {/* آیتم منو */}
              <div
                className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/10"
                onClick={() => handleMenuClick(menu.id)}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {isOpen && <span className="leading-6">{menu.title}</span>}
                {isOpen && (
                  <ChevronDownIcon
                    className={`w-4 h-4 ml-auto transition-transform ${isExpanded ? "rotate-180" : ""}`}
                  />
                )}
              </div>

              {/* زیرمنوها */}
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  isExpanded && isOpen ? "max-h-64" : "max-h-0"
                }`}
              >
                <div className="pl-16 pr-4 py-2 space-y-3 bg-white/5 rounded-md">
                  {menu.submenus.map((sub) => (
                    <div
                      key={sub}
                      className="text-sm cursor-pointer hover:text-gray-300 py-2"
                    >
                      {sub}
                    </div>
                  ))}
                </div>
              </div>

              {/* خط جداکننده */}
              {index < menuItems.length - 1 && (
                <hr className="border-t border-white/10 mx-4 mt-2" />
              )}
            </div>
          );
        })}
      </nav>

      {/* فوتر با دکمه تنظیمات */}
      <div className={`${isOpen ? "px-4" : "px-0"} py-3 border-t border-white/10`}>
        <Button
          className={`transition-all duration-300 ${
            isOpen ? "w-full" : "w-14 mx-auto min-w-0 p-2"
          }`}
        >
          {isOpen ? "تنظیمات" : <Cog6ToothIcon className="w-5 h-5" />}
        </Button>
      </div>
    </aside>
  );
}
