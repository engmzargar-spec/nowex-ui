"use client";

import {Button, Avatar, Switch} from "@nextui-org/react";
import {SunIcon, MoonIcon, ArrowRightOnRectangleIcon} from "@heroicons/react/24/outline";
import Image from "next/image";
import {useState, useEffect} from "react";
import {useTheme} from "next-themes";
import {useRouter} from "next/navigation";
import {palette} from "../theme/palette";

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const {theme, setTheme} = useTheme();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    setDate(new Date());
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted || !date) {
    return (
      <header
        style={{
          backgroundColor: palette.lightcolor5,
          color: palette.darkcolor5,
          height: "100px" // 👈 اینجا ارتفاع هدر رو تغییر بده
        }}
        className="w-full flex items-center px-0"
      >
        <div className="flex justify-center w-full">
          <span>در حال بارگذاری...</span>
        </div>
      </header>
    );
  }

  const time = new Intl.DateTimeFormat("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(date);

  const persianDate = new Intl.DateTimeFormat("fa-IR", {dateStyle: "full"}).format(date);
  const gregorianDate = new Intl.DateTimeFormat("en-US", {dateStyle: "full"}).format(date);

  const bgColor = theme === "dark" ? palette.darkcolor1 : palette.darkcolor7;
  const textColor = theme === "dark" ? palette.lightcolor6 : palette.lightcolor6;
  const logoSrc = theme === "dark" ? "/logofordark.png" : "/logoforlight.png";

  return (
    <header
      style={{
        backgroundColor: bgColor,
        color: textColor,
        height: "130px" // 👈 اینجا ارتفاع هدر رو تغییر بده
      }}
      className="w-full flex items-center justify-between px-0 shadow-md"
    >
      {/* چپ: خروج / آواتار / سوئیچ تم */}
      <div className="flex items-center gap-4 ml-4">
        <Button
          isIconOnly
          variant="light"
          aria-label="خروج"
          onClick={() => router.push("/login")}
        >
          <ArrowRightOnRectangleIcon className="w-6 h-6" style={{color: textColor}} />
        </Button>

        <span className="border-l h-6" style={{borderColor: textColor}}></span>

        <div className="flex items-center gap-2">
          <Avatar src="/avatar.png" size="sm" />
          <div className="flex flex-col text-sm" style={{color: textColor}}>
            <span className="font-semibold">mehdi</span>
            <span>مدیر سیستم</span>
          </div>
        </div>

        <span className="border-l h-6" style={{borderColor: textColor}}></span>

        <Switch
          isSelected={theme === "dark"}
          onValueChange={(val) => setTheme(val ? "dark" : "light")}
          size="sm"
          thumbIcon={({isSelected}) =>
            isSelected ? (
              <MoonIcon className="w-4 h-4" style={{color: textColor}} />
            ) : (
              <SunIcon className="w-4 h-4" style={{color: textColor}} />
            )
          }
        />
      </div>

      {/* وسط: ساعت و تاریخ */}
      <div className="flex flex-col items-center">
        <span className="text-4xl font-bold" style={{color: textColor}}>
          {time}
        </span>
        <div className="flex items-center gap-2 text-sm" style={{color: textColor}}>
          <span>{persianDate}</span>
          <span className="border-l h-4" style={{borderColor: textColor}}></span>
          <span>{gregorianDate}</span>
        </div>
      </div>

      {/* راست: لوگو */}
      <div className="mr-4">
        <Image src={logoSrc} alt="Logo" width={220} height={80} priority />
      </div>
    </header>
  );
}
