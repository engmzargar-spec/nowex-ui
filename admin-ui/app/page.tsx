"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Input,
  Accordion,
  AccordionItem
} from "@nextui-org/react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import Image from "next/image"; // اضافه شد

export default function TestPage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleClick = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const sidebarTextClass = theme === "dark" ? "text-nowex-gold" : "text-nowex-black";
  const sidebarBgClass = theme === "dark" ? "bg-nowex-black text-nowex-gold" : "bg-nowex-minimal text-nowex-black";

  const itemClasses = {
    base: "font-vazir",
    heading: "",
    trigger: "",
    indicator: sidebarTextClass,
    title: `${sidebarTextClass} font-vazir`,
    content: ""
  };

  return (
    <div className={`flex min-h-screen transition-colors duration-500 ${sidebarBgClass}`}>
      {/* سایدبار */}
      <motion.aside
        initial={{ x: 250 }}
        animate={{ x: sidebarOpen ? 0 : 250 }}
        transition={{ duration: 0.4 }}
        className={`w-64 h-screen fixed top-0 right-0 p-4 shadow-lg z-50 transition-colors duration-500 font-vazir ${sidebarBgClass}`}
      >
        <h2 className={`text-xl font-bold mb-4 ${sidebarTextClass}`}>منو اصلی</h2>

        <Accordion itemClasses={itemClasses}>
          <AccordionItem key="1" aria-label="داشبورد" title={<span className={`${sidebarTextClass} font-vazir`}>داشبورد</span>}>
            <Button variant="light" fullWidth className={`${sidebarTextClass} font-vazir`}>خانه</Button>
            <Button variant="light" fullWidth className={`${sidebarTextClass} font-vazir`}>گزارش‌ها</Button>
          </AccordionItem>
          <AccordionItem key="2" aria-label="کاربران" title={<span className={`${sidebarTextClass} font-vazir`}>کاربران</span>}>
            <Button variant="light" fullWidth className={`${sidebarTextClass} font-vazir`}>لیست کاربران</Button>
            <Button variant="light" fullWidth className={`${sidebarTextClass} font-vazir`}>سطوح دسترسی</Button>
          </AccordionItem>
          <AccordionItem key="3" aria-label="تنظیمات" title={<span className={`${sidebarTextClass} font-vazir`}>تنظیمات</span>}>
            <Button variant="light" fullWidth className={`${sidebarTextClass} font-vazir`}>پروفایل</Button>
            <Button variant="light" fullWidth className={`${sidebarTextClass} font-vazir`}>امنیت</Button>
          </AccordionItem>
        </Accordion>
      </motion.aside>

      {/* محتوای اصلی */}
      <div className="flex-1 flex flex-col items-center gap-8 p-8 mr-0 md:mr-64">
        {/* لوگو با Image */}
        <Image
          src={theme === "dark" ? "/logofordark.png" : "/logoforlight.png"}
          alt="NOWEX Logo"
          width={128}
          height={128}
          className="mb-4 transition-all duration-500"
          priority
        />

        {/* دکمه‌ها */}
        <Button className="rounded-full px-6 py-2 bg-nowex-gold text-nowex-black font-vazir hover:opacity-80 transition-all duration-300" onClick={toggleSidebar}>
          {sidebarOpen ? "بستن منو" : "باز کردن منو"}
        </Button>

        <Button className="rounded-full px-6 py-2 bg-nowex-gold text-nowex-black font-vazir hover:opacity-80 transition-all duration-300" onClick={toggleTheme}>
          تغییر تم به {theme === "dark" ? "روشن" : "تیره"}
        </Button>

        {/* نوار جستجو */}
        <Input type="text" placeholder="جستجو..." className="w-full max-w-md rounded-full px-4" />

        {/* بخش انگلیسی */}
        <motion.section lang="en" className="font-inter w-full max-w-md text-left" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-3xl font-bold">Welcome to NOWEX</h1>
          <p className="mt-2">This is a test page using the Inter Regular font for English content.</p>
        </motion.section>

        {/* بخش فارسی */}
        <motion.section lang="fa" className="font-vazir w-full max-w-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-3xl font-bold">به نوکس خوش آمدید</h1>
          <p className="mt-2">این یک صفحهٔ تست است که از فونت Vazir Regular برای محتوای فارسی استفاده می‌کند.</p>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            <Card className="mt-6 shadow-lg font-vazir">
              <CardHeader className="font-bold">کارت تست</CardHeader>
              <CardBody>این یک کارت نمونه است برای بررسی استایل‌ها و فونت‌ها.</CardBody>
            </Card>
          </motion.div>

          <div className="mt-6 flex justify-center">
            <Button className="rounded-full px-8 bg-nowex-gold text-nowex-black hover:opacity-80 transition-all duration-300 font-vazir" onClick={handleClick}>
              کلیک کن و جشن بگیر 🎉
            </Button>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
