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

import { palette } from "../../theme/palette";
import { useThemeContext } from "../../context/ThemeContext";
import { useRouter } from "next/navigation";

// 🟦 تعریف مسیرهای هر منو و زیرمنو
const menuRoutes: any = {
  dashboard: {
    "نمای کلی": "/dashboard",
    "گزارش‌ها": "/dashboard/reports",
  },

  adminusers: {
    "پروفایل ادمین": "/dashboard/adminusers/profile",
    "داشبورد وظایف": "/dashboard/adminusers/tasks",
    "ایجاد کاربر ادمین جدید": "/dashboard/adminusers/create",
    "مشاهده کلیه کاربران": "/dashboard/adminusers",
  },

  users: {
    "لیست کاربران": "/dashboard/users/list",
    "ویرایش اطلاعات کاربر": "/dashboard/users/edit",
  },

  mali: {
    "واریزی‌ها": "/dashboard/mali/deposits",
    "برداشت‌ها": "/dashboard/mali/withdraws",
    "بررسی حساب‌ها": "/dashboard/mali/accounts",
  },

  messaging: {
    "درون سازمانی": "/dashboard/messaging/internal",
    "عمومی": "/dashboard/messaging/public",
    "اختصاصی": "/dashboard/messaging/private",
    "پیامک": "/dashboard/messaging/sms",
    "ایمیل": "/dashboard/messaging/email",
  },

  analytics: {
    "آمار کلی": "/dashboard/analytics/overview",
    "نمودارها": "/dashboard/analytics/charts",
  },
};

// 🟦 تعریف ساختار منو
const menuItems = [
  { id: "dashboard", title: "داشبورد", icon: HomeIcon, submenus: ["نمای کلی", "گزارش‌ها"] },

  {
    id: "adminusers",
    title: "کاربران ادمین",
    icon: UserGroupIcon,
    submenus: [
      "پروفایل ادمین",
      "داشبورد وظایف",
      "ایجاد کاربر ادمین جدید",
      "مشاهده کلیه کاربران",
    ],
  },

  {
    id: "users",
    title: "کاربران سایت",
    icon: UserGroupIcon,
    submenus: ["لیست کاربران", "ویرایش اطلاعات کاربر"],
  },

  {
    id: "mali",
    title: "بررسی‌های مالی",
    icon: BanknotesIcon,
    submenus: ["واریزی‌ها", "برداشت‌ها", "بررسی حساب‌ها"],
  },

  {
    id: "messaging",
    title: "سیستم پیام",
    icon: ChatBubbleLeftRightIcon,
    submenus: ["درون سازمانی", "عمومی", "اختصاصی", "پیامک", "ایمیل"],
  },

  {
    id: "analytics",
    title: "آنالیزها",
    icon: ChartBarIcon,
    submenus: ["آمار کلی", "نمودارها"],
  },
];

export default function DesktopSidebar({ isOpen, onOpen, onClose }) {
  const router = useRouter();
  const { desktopTheme } = useThemeContext();
  const [expanded, setExpanded] = useState<string | null>(null);

  const bgColor =
    desktopTheme === "dark" ? palette.darkcolor16 : palette.darkcolor16;

  const textColor =
    desktopTheme === "dark" ? palette.lightcolor1 : palette.lightcolor1;

  const iconColor =
    desktopTheme === "dark" ? palette.lightcolor1 : palette.lightcolor1;

  const buttonBg =
    desktopTheme === "dark" ? palette.lightcolor16 : palette.lightcolor16;

  const dividerColor =
    desktopTheme === "dark"
      ? "rgba(255,255,255,0.15)"
      : "rgba(255,255,255,0.15)";

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
      style={{
        backgroundColor: bgColor,
        color: textColor,
        borderRight: `1px solid ${dividerColor}`,
      }}
      className={`${isOpen ? "w-56" : "w-16"} flex-shrink-0 h-screen shadow-md flex flex-col transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-16 font-bold text-md">
        <span>{isOpen ? "داشبورد مدیریت NOW‑EX" : "N"}</span>

        {isOpen && (
          <Button
            isIconOnly
            variant="flat"
            onClick={handleClose}
            style={{ backgroundColor: buttonBg }}
          >
            <XMarkIcon className="w-5 h-5" style={{ color: iconColor }} />
          </Button>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto">
        {menuItems.map((menu, index) => {
          const Icon = menu.icon;
          const isExpanded = expanded === menu.id;

          return (
            <div key={menu.id} className="mb-3">
              {/* Main Menu Item */}
              <div
                className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:opacity-80"
                onClick={() => handleMenuClick(menu.id)}
              >
                <Icon className="w-5 h-5 shrink-0" style={{ color: iconColor }} />

                {isOpen && <span>{menu.title}</span>}

                {isOpen && (
                  <ChevronDownIcon
                    className={`w-4 h-4 ml-auto transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                    style={{ color: iconColor }}
                  />
                )}
              </div>

              {/* Submenu */}
              <div
                className={`transition-all duration-500 overflow-hidden ${
                  isExpanded && isOpen ? "max-h-64" : "max-h-0"
                }`}
              >
                <div
                  className="pl-16 pr-4 py-2 space-y-3 rounded-md"
                  style={{
                    backgroundColor:
                      desktopTheme === "dark"
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.05)",
                  }}
                >
                  {menu.submenus.map((sub) => (
                    <div
                      key={sub}
                      className="text-sm cursor-pointer py-2 hover:opacity-80"
                      onClick={() => router.push(menuRoutes[menu.id][sub])}
                    >
                      {sub}
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              {index < menuItems.length - 1 && (
                <hr
                  style={{
                    borderColor: dividerColor,
                    marginLeft: "1rem",
                    marginRight: "1rem",
                    marginTop: "0.5rem",
                  }}
                />
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        style={{
          borderTop: `1px solid ${dividerColor}`,
        }}
        className={`${isOpen ? "px-4" : "px-0"} py-3`}
      >
        <Button
          className={`${isOpen ? "w-full" : "w-14 mx-auto min-w-0 p-2"}`}
          style={{
            backgroundColor: buttonBg,
            color: textColor,
          }}
        >
          {isOpen ? (
            "تنظیمات"
          ) : (
            <Cog6ToothIcon className="w-5 h-5" style={{ color: iconColor }} />
          )}
        </Button>
      </div>
    </aside>
  );
}
