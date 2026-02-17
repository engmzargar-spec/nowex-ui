"use client";

import { Card, Button } from "@nextui-org/react";
import { palette } from "../../theme/palette";
import { useRouter } from "next/navigation";

export default function MobileDashboardPanel({ bgColor }: { bgColor: string }) {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/mobile/login");
  };

  return (
    <div
      className={`flex flex-col gap-4 p-3 transition-colors duration-300 ${bgColor}`}
    >
      {/* -------------------------------------------------- */}
      {/* کارت وضعیت حساب – رنگ طلایی برند NOWEX */}
      {/* -------------------------------------------------- */}
      <Card
        className="p-3 rounded-xl shadow-md"
        style={{
          backgroundColor: palette.lightcolor16, // 🎨 طلایی برند NOWEX
          color: palette.darkcolor1, // 🎨 متن تیره برای کنتراست
        }}
      >
        <h2 className="text-sm font-bold mb-2">وضعیت حساب پلتفرم</h2>
        <div className="text-xs space-y-1">
          <p>بالانس اولیه: 100,000,000 ریال</p>
          <p>کارمزدها: 500,000 ریال</p>
        </div>
      </Card>

      {/* -------------------------------------------------- */}
      {/* کارت کاربران – رنگ روشن آبی از پالت */}
      {/* -------------------------------------------------- */}
      <Card
        className="p-3 rounded-xl shadow-md"
        style={{
          backgroundColor: palette.lightcolor10, // 🎨 آبی روشن (جایگزین #3B82F6)
          color: palette.lightcolor1, // 🎨 متن تیره برای خوانایی
        }}
      >
        <h2 className="text-sm font-bold mb-2">کاربران</h2>
        <div className="flex justify-between text-xs">
          <span>تعداد کل: 1200</span>
          <span>فعال: 350</span>
        </div>
      </Card>

      {/* -------------------------------------------------- */}
      {/* کارت معاملات – رنگ سبز روشن از پالت */}
      {/* -------------------------------------------------- */}
      <Card
        className="p-3 rounded-xl shadow-md"
        style={{
          backgroundColor: palette.lightcolor19, // 🎨 زرد/سبز روشن (جایگزین #10B981)
          color: palette.darkcolor5,
        }}
      >
        <h2 className="text-sm font-bold mb-2">معاملات</h2>
        <div className="text-xs space-y-1">
          <p>تعداد معاملات باز: 25</p>
          <p>مجموع حجم: 75,000,000 ریال</p>
        </div>
      </Card>

      {/* -------------------------------------------------- */}
      {/* کارت درآمد کارمزدها – رنگ بنفش/طلایی از پالت */}
      {/* -------------------------------------------------- */}
      <Card
        className="p-3 rounded-xl shadow-md"
        style={{
          backgroundColor: palette.lightcolor9, // 🎨 قهوه‌ای/بنفش تیره (جایگزین #8B5CF6)
          color: palette.lightcolor1,
        }}
      >
        <h2 className="text-sm font-bold mb-2">درآمد کارمزدها</h2>
        <p className="text-xs">500,000 ریال</p>
      </Card>

      {/* -------------------------------------------------- */}
      {/* کارت معاملات سودده – رنگ نارنجی برند NOWEX */}
      {/* -------------------------------------------------- */}
      <Card
        className="p-3 rounded-xl shadow-md"
        style={{
          backgroundColor: palette.lightcolor20, // 🎨 نارنجی برند NOWEX (جایگزین #F59E0B)
          color: palette.lightcolor1,
        }}
      >
        <h2 className="text-sm font-bold mb-2">معاملات سودده</h2>
        <p className="text-xs">2,500,000 ریال</p>
      </Card>
    </div>
  );
}
