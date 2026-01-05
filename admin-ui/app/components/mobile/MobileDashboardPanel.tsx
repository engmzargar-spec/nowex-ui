"use client";

import { Card } from "@nextui-org/react";
import { palette } from "../../theme/palette";

export default function MobileDashboardPanel({ bgColor }: { bgColor: string }) {
  return (
    <div className={`flex flex-col gap-4 p-3 transition-colors duration-300 ${bgColor}`}>
      {/* وضعیت حساب */}
      <Card
        className="p-3 rounded-xl shadow-md"
        style={{ backgroundColor: palette.gold, color: palette.darkcolor1 }}
      >
        <h2 className="text-sm font-bold mb-2">وضعیت حساب پلتفرم</h2>
        <div className="text-xs space-y-1">
          <p>بالانس اولیه: 100,000,000 ریال</p>
          <p>کارمزدها: 500,000 ریال</p>
        </div>
      </Card>

      {/* کاربران */}
      <Card
        className="p-3 rounded-xl shadow-md"
        style={{ backgroundColor: "#3B82F6", color: "white" }}
      >
        <h2 className="text-sm font-bold mb-2">کاربران</h2>
        <div className="flex justify-between text-xs">
          <span>تعداد کل: 1200</span>
          <span>فعال: 350</span>
        </div>
      </Card>

      {/* معاملات */}
      <Card
        className="p-3 rounded-xl shadow-md"
        style={{ backgroundColor: "#10B981", color: "white" }}
      >
        <h2 className="text-sm font-bold mb-2">معاملات</h2>
        <div className="text-xs space-y-1">
          <p>تعداد معاملات باز: 25</p>
          <p>مجموع حجم: 75,000,000 ریال</p>
        </div>
      </Card>

      {/* درآمد حاصل از کارمزدها */}
      <Card
        className="p-3 rounded-xl shadow-md"
        style={{ backgroundColor: "#8B5CF6", color: "white" }}
      >
        <h2 className="text-sm font-bold mb-2">درآمد کارمزدها</h2>
        <p className="text-xs">500,000 ریال</p>
      </Card>

      {/* معاملات سودده */}
      <Card
        className="p-3 rounded-xl shadow-md"
        style={{ backgroundColor: "#F59E0B", color: "white" }}
      >
        <h2 className="text-sm font-bold mb-2">معاملات سودده</h2>
        <p className="text-xs">2,500,000 ریال</p>
      </Card>
    </div>
  );
}
