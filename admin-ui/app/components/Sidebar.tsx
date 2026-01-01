"use client";

import {Accordion, AccordionItem, Button} from "@nextui-org/react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  HomeIcon,
  UserGroupIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon,
  BanknotesIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  DocumentChartBarIcon,
} from "@heroicons/react/24/outline";
import {useTheme} from "next-themes";
import {palette} from "../theme/palette";
import {useState} from "react";

// ✅ تعریف منوها و زیرمنوها
const menuItems = [
  {
    id: "dashboard",
    title: "داشبورد",
    icon: <HomeIcon className="w-5 h-5" />, // 👈 آیکن منو
    submenus: [
      {id: "overview", title: "نمای کلی"},
      {id: "reports", title: "گزارش‌ها"}
    ]
  },
  {
    id: "adminusers",
    title: "کاربران ادمین",
    icon: <UserCircleIcon className="w-5 h-5" />, // 👈 آیکن منو
    submenus: [
      {id: "list", title: "پروفایل ادمین"},
      {id: "roles", title: "داشبورد وظایف"}
    ]
  },
    {
    id: "users",
    title: "کاربران سایت",
    icon: <UserGroupIcon className="w-5 h-5" />, // 👈 آیکن منو
    submenus: [
      {id: "list", title: "لیست کاربران"},
      {id: "roles", title: "ویرایش اطلاعات کاربر"}
    ]
  },
    {
    id: "mali",
    title: "بررسی های مالی",
    icon: <BanknotesIcon className="w-5 h-5" />, // 👈 آیکن منو
    submenus: [
      {id: "deposits", title: "واریزی ها"},
      {id: "withdraworders", title: "درخواستهای برداشت"},
      {id: "bankckeck", title: "بررسی حسابها"},
    ]
  },  
  {
    id: "settings",
    title: "تنظیمات",
    icon: <Cog6ToothIcon className="w-5 h-5" />, // 👈 آیکن منو
    submenus: [
      {id: "profile", title: "پروفایل"},
      {id: "security", title: "امنیت"}
    ]
  }
];

export default function Sidebar() {
  const {theme} = useTheme();
  const [isOpen, setIsOpen] = useState(true); // 👈 وضعیت باز/بسته بودن سایدبار
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]); // 👈 لیست منوهای باز شده

  // 🎨 رنگ‌ها
  const bgColor = theme === "dark" ? palette.darkcolor1 : palette.darkcolor7; // 👈 رنگ پس‌زمینه کل سایدبار
  const headerTextColor = theme === "dark" ? palette.lightcolor1 : palette.lightcolor1; // 👈 رنگ متن عنوان بالای سایدبار
  const menuTextColor = theme === "dark" ? palette.darkcolor1 : palette.darkcolor1; // 👈 رنگ متن منوها
  const menuBgColor = theme === "dark" ? palette.lightcolor1 : palette.lightcolor1; // 👈 رنگ پس‌زمینه دکمه‌های منو
  const submenuBgColor = theme === "dark" ? palette.lightcolor1 : palette.lightcolor1; // 👈 رنگ پس‌زمینه دکمه‌های زیرمنو

  // ⚙️ فاصله‌ها
  const headerPaddingTop = "55px"; // 👈 فاصله عنوان هدر از لبه بالایی سایدبار
  const firstMenuMarginTop = "15px"; // 👈 فاصله دکمه همبرگری از هدر
  const menuSpacing = "12px"; // 👈 فاصله بین منوها
  const submenuSpacing = "8px"; // 👈 فاصله بین زیرمنوها

  // هندل باز/بسته کردن سایدبار
  const toggleSidebar = () => {
    if (isOpen) {
      setExpandedKeys([]); // 👈 وقتی بسته میشه، همه منوها بسته بشن
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  // هندل کلیک روی منو
  const handleMenuClick = (menuId: string) => {
    if (!isOpen) {
      setIsOpen(true); // 👈 وقتی بسته است، خودکار باز بشه
      setExpandedKeys([menuId]); // 👈 و همون منو باز بشه
    }
  };

  return (
    <aside
      style={{backgroundColor: bgColor}} // 👈 رنگ پس‌زمینه سایدبار
      className={`h-screen shadow-md transition-all duration-300 flex flex-col ${
        isOpen ? "w-50" : "w-15" // 👈 عرض سایدبار در حالت باز/بسته
      }`}
    >
      {/* هدر سایدبار: فقط عنوان */}
      <div
        className="flex flex-col items-center p-4"
        style={{paddingTop: headerPaddingTop}} // 👈 فاصله عنوان از لبه بالایی
      >
        <span
          className="text-lg font-bold mb-2"
          style={{color: headerTextColor}}
        >
          {isOpen ? "داشبورد مدیریت NOW‑EX" : "NOW-EX"}
        </span>
      </div>

      {/* دکمه همبرگری داخل بدنه، بالای منوها */}
      <div
        className="flex justify-center p-2"
        style={{marginTop: firstMenuMarginTop}} // 👈 فاصله از هدر
      >
        <Button isIconOnly variant="light" onClick={toggleSidebar}>
          {isOpen ? (
            <ArrowRightIcon className="w-6 h-6" style={{color: headerTextColor}} /> // 👈 آیکن بستن
          ) : (
            <Bars3Icon className="w-6 h-6" style={{color: headerTextColor}} /> // 👈 آیکن باز کردن
          )}
        </Button>
      </div>

      {/* منوها */}
      <nav className="flex-1 overflow-y-auto">
        <Accordion
          variant="splitted"
          selectedKeys={expandedKeys}
          onSelectionChange={(keys) => setExpandedKeys(Array.from(keys) as string[])}
          className="transition-all duration-300" // 👈 انیمیشن ساده باز/بسته شدن
        >
          {menuItems.map((menu) => (
            <AccordionItem
              key={menu.id}
              aria-label={menu.title}
              style={{
                marginBottom: menuSpacing, // 👈 فاصله بین منوها
                backgroundColor: palette.lightcolor1 // 👈 رنگ پس‌زمینه آیتم منو
              }}
              title={
                <div
                  className="flex items-center gap-2 px-2 py-2 rounded-md"
                  onClick={() => handleMenuClick(menu.id)}
                  style={{
                    backgroundColor: menuBgColor, // 👈 رنگ پس‌زمینه دکمه منو
                    color: menuTextColor, // 👈 رنگ متن منو
                    fontSize: "16px" // 👈 اندازه فونت منو
                  }}
                >
                  {menu.icon} {/* 👈 آیکن منو */}
                  {isOpen && <span>{menu.title}</span>} {/* 👈 متن منو */}
                </div>
              }
            >
              {menu.submenus.map((sub, index) => (
                <div
                  key={sub.id}
                  className="pl-8 py-2 rounded-md transition-all duration-300"
                  style={{
                    backgroundColor: submenuBgColor, // 👈 رنگ پس‌زمینه زیرمنو
                    color: menuTextColor, // 👈 رنگ متن زیرمنو
                    fontSize: "13px", // 👈 اندازه فونت زیرمنو
                    marginBottom: index !== menu.submenus.length - 1 ? submenuSpacing : "0px" // 👈 فاصله بین زیرمنوها
                  }}
                >
                  {sub.title}
                </div>
              ))}
            </AccordionItem>
          ))}
        </Accordion>
      </nav>
    </aside>
  );
}
