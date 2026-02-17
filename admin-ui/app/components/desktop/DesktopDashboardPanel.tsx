"use client";

import TimeRangeSelector from "../TimeRangeSelector";

import ActiveUsersCard from "../cards/ActiveUsersCard";
import BalanceCard from "../cards/BalanceCard";
import FeesRevenueCard from "../cards/FeesRevenueCard";
import LossTradesCard from "../cards/LossTradesCard";
import NetPnLCard from "../cards/NetPnLCard";
import OpenTradesCard from "../cards/OpenTradesCard";
import ProfitTradesCard from "../cards/ProfitTradesCard";
import SymbolsPieCard from "../cards/SymbolsPieCard";
import UsersTotalCard from "../cards/UsersTotalCard";

// 🎨 ThemeContext برای تشخیص تم فعلی
import { useThemeContext } from "../../context/ThemeContext";

// 🎨 پالت رنگ برند NOWEX
import { palette } from "../../theme/palette";

export default function DesktopDashboardPanel() {
  const { desktopTheme } = useThemeContext();

  // 🎨 رنگ پس‌زمینه پنل بر اساس تم
  const panelBg =
    desktopTheme === "dark"
      ? palette.darkcolor14 // پس‌زمینه تیره
      : palette.lightcolor1; // پس‌زمینه روشن

  // 🎨 رنگ کارت‌ها بر اساس تم
  const cardClasses =
    desktopTheme === "dark"
      ? `${palette.darkcolor12} text-gray-100` // کارت تیره
      : `${palette.lightcolor3} text-gray-900`; // کارت روشن

  return (
    <main
      className="flex-1 p-6 overflow-y-auto"
      style={{
        backgroundColor: panelBg, // 🎨 اعمال رنگ پس‌زمینه از پالت
      }}
    >
      {/* 🎛 انتخاب بازه زمانی */}
      <div className="mb-6">
        <TimeRangeSelector />
      </div>

      {/* 📊 شبکه کارت‌های داشبورد */}
      <div className="grid grid-cols-3 gap-6">
        <ActiveUsersCard className={cardClasses} count={120} />
        <UsersTotalCard className={cardClasses} count={500} />

        <BalanceCard
          className={cardClasses}
          data={{
            initialBalance: 1_000_000,
            totalFees: 25_000,
            realizedPnL: 15_000,
            unrealizedPnL: -5_000,
          }}
        />

        <FeesRevenueCard className={cardClasses} totalVolume={3_200} />
        <ProfitTradesCard className={cardClasses} count={85} totalProfit={1_500_000} />
        <LossTradesCard className={cardClasses} count={15} totalLoss={750_000} />
        <OpenTradesCard className={cardClasses} count={40} totalVolume={2_500_000} />
        <NetPnLCard className={cardClasses} netPnL={12_000} />

        <SymbolsPieCard
          className={cardClasses}
          byCount={[
            { symbol: "BTC", count: 40 },
            { symbol: "ETH", count: 30 },
            { symbol: "XRP", count: 20 },
            { symbol: "ADA", count: 10 },
          ]}
        />
      </div>
    </main>
  );
}
