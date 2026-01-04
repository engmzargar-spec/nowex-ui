"use client";

import { useEffect, useState } from "react";
import { dashboardConfig } from "../config/dashboardConfig";

// کارت‌ها
import BalanceCard from "../components/cards/BalanceCard";
import UsersTotalCard from "../components/cards/UsersTotalCard";
import ActiveUsersCard from "../components/cards/ActiveUsersCard";
import OpenTradesCard from "../components/cards/OpenTradesCard";
import FeesRevenueCard from "../components/cards/FeesRevenueCard";
import ProfitTradesCard from "../components/cards/ProfitTradesCard";
import LossTradesCard from "../components/cards/LossTradesCard";
import NetPnLCard from "../components/cards/NetPnLCard";
import SymbolsPieCard from "../components/cards/SymbolsPieCard";

// سرویس‌ها
import { fetchDashboardData } from "../services/dataService";
import { computeDashboard } from "../services/computeEngine";
import { ComputedDashboard } from "../types";

// کنترل بازه زمانی
import TimeRangeSelector from "../components/TimeRangeSelector";
import { TimeRange, getDefaultDailyRange } from "../services/timeRange";

export default function Dashboard() {
  const { card } = dashboardConfig;
  const [computed, setComputed] = useState<ComputedDashboard | null>(null);
  const [loading, setLoading] = useState(false);
  const [range, setRange] = useState<TimeRange>(getDefaultDailyRange());

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        // داده‌ی تستی (فعلاً تا اتصال واقعی به بک‌اند)
        const fakeData = {
          account: {
            initialBalance: 100000000,
            totalFees: 500000,
            realizedPnL: 2000000,
            unrealizedPnL: 500000,
          },
          users: {
            totalUsers: 1200,
            activeUsers: 350,
          },
          trades: {
            openTradesCount: 25,
            totalVolume: 750000,
            profitTradesCount: 15,
            totalProfit: 300000,
            lossTradesCount: 10,
            totalLoss: 150000,
          },
          symbols: {
            byCount: [
              { symbol: "BTCUSDT", count: 10 },
              { symbol: "ETHUSDT", count: 8 },
            ],
            byVolume: [
              { symbol: "BTCUSDT", volume: 500000 },
              { symbol: "ETHUSDT", volume: 250000 },
            ],
          },
        };

        const result = computeDashboard(fakeData);
        if (mounted) setComputed(result);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [range]);

  return (
    <div className="p-2 sm:p-4 md:p-6">
      {/* کنترل بازه زمانی */}
      <div className="mb-4">
        <TimeRangeSelector onChange={setRange} />
      </div>

      {/* شبکه کارت‌ها */}
      <div
        className="
          grid grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-4
        "
        style={{ gap: card.gap }}
      >
        {computed ? (
          <>
            <BalanceCard data={computed.balanceCard} />
            <UsersTotalCard count={computed.usersTotal} />
            <ActiveUsersCard count={computed.usersActive} />
            <OpenTradesCard
              count={computed.openTrades.count}
              totalVolume={computed.openTrades.totalVolume}
            />
            <FeesRevenueCard totalVolume={computed.openTrades.totalVolume} />
            <ProfitTradesCard
              count={computed.profitTrades.count}
              totalProfit={computed.profitTrades.totalProfit}
            />
            <LossTradesCard
              count={computed.lossTrades.count}
              totalLoss={computed.lossTrades.totalLoss}
            />
            <NetPnLCard netPnL={computed.netPnL} />
            <SymbolsPieCard byCount={computed.symbolsPie.byCount} />
          </>
        ) : (
          <div className="col-span-full text-center text-gray-500 text-sm md:text-base">
            {loading ? "در حال بارگذاری..." : "داده‌ای یافت نشد"}
          </div>
        )}
      </div>
    </div>
  );
}
