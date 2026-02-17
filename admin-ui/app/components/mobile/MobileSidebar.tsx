"use client";

import {
  XMarkIcon,
  HomeIcon,
  UserGroupIcon,
  BanknotesIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { palette } from "../../theme/palette";
import { useRouter } from "next/navigation";

const menuItems = [
  { id: "dashboard", title: "داشبورد", icon: HomeIcon },

  {
    id: "adminusers",
    title: "کاربران ادمین",
    icon: UserGroupIcon,
    children: [
      { id: "admins-list", title: "مشاهده کلیه کاربران", route: "/dashboard/adminusers" },
      { id: "admins-add", title: "ایجاد کاربر ادمین جدید", route: "/dashboard/adminusers/create" },
    ],
  },

  {
    id: "users",
    title: "کاربران سایت",
    icon: UserGroupIcon,
    children: [
      { id: "users-list", title: "لیست کاربران" },
      { id: "users-add", title: "افزودن کاربر" },
    ],
  },

  {
    id: "mali",
    title: "بررسی‌های مالی",
    icon: BanknotesIcon,
    children: [
      { id: "transactions", title: "تراکنش‌ها" },
      { id: "reports", title: "گزارش‌های مالی" },
      { id: "fees", title: "کارمزدها" },
    ],
  },

  {
    id: "messaging",
    title: "سیستم پیام",
    icon: ChatBubbleLeftRightIcon,
    children: [
      { id: "inbox", title: "صندوق پیام‌ها" },
      { id: "compose", title: "ارسال پیام جدید" },
      { id: "templates", title: "قالب‌های پیام" },
    ],
  },

  { id: "analytics", title: "آمارها", icon: ChartBarIcon },
  { id: "settings", title: "تنظیمات", icon: Cog6ToothIcon },
];

export default function MobileSidebar({ open, onClose }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const router = useRouter();

  if (!open) return null; // ⬅ مهم‌ترین خط برای رفع مشکل Overlay

  return (
    <div className="fixed inset-0 z-50 pointer-events-auto">

      {/* بک‌دراب */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      />

      {/* سایدبار */}
      <aside
        className="absolute top-0 right-0 w-[14rem] h-full shadow-lg flex flex-col transform transition-transform duration-300 translate-x-0"
        style={{
          backgroundColor: palette.darkcolor14,
          color: palette.lightcolor1,
          borderRadius: 12,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* هدر */}
        <div className="flex justify-between items-center px-4 py-4 font-bold text-base">
          <span>منو</span>
          <Button isIconOnly variant="light" onClick={onClose}>
            <XMarkIcon className="w-5 h-5 text-white" />
          </Button>
        </div>

        {/* آیتم‌ها */}
        <nav className="flex-1 overflow-y-auto px-3 py-2">
          {menuItems.map((menu, idx) => {
            const Icon = menu.icon;
            const isExpanded = expanded === menu.id;

            return (
              <div key={menu.id}>
                <button
                  onClick={() => setExpanded(isExpanded ? null : menu.id)}
                  className="w-full flex items-center gap-2 py-2 px-2 rounded-md hover:bg-white/10 text-left"
                >
                  {Icon && <Icon className="w-4 h-4 shrink-0" />}
                  <span className="text-sm whitespace-nowrap">{menu.title}</span>
                </button>

                {menu.children && isExpanded && (
                  <div className="ml-6 mt-1 space-y-1">
                    {menu.children.map((child) => (
                      <button
                        key={child.id}
                        className="w-full text-xs py-1 px-2 rounded-md hover:bg-white/5 text-left"
                        onClick={() => {
                          if (child.route) router.push(child.route);
                        }}
                      >
                        {child.title}
                      </button>
                    ))}
                  </div>
                )}

                {idx < menuItems.length - 1 && (
                  <div className="border-t border-white/20 my-2" />
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}
