import { DashboardData, ComputedDashboard } from "../types";

export function computeDashboard(data: DashboardData): ComputedDashboard {
  const { account, users, trades, symbols } = data;

  const pnlTotal = (account.realizedPnL ?? 0) + (account.unrealizedPnL ?? 0);
  const currentBalance = (account.initialBalance ?? 0) + pnlTotal - (account.totalFees ?? 0);
  const netPnL = (trades.totalProfit ?? 0) - (trades.totalLoss ?? 0);

  return {
    balanceCard: {
      initialBalance: account.initialBalance,
      pnl: pnlTotal,
      currentBalance,
      fees: account.totalFees,
    },
    usersTotal: users.totalUsers,
    usersActive: users.activeUsers,
    openTrades: {
      count: trades.openTradesCount,
      totalVolume: trades.totalVolume,
    },
    feesRevenue: account.totalFees,
    symbolsPie: symbols,
    profitTrades: {
      count: trades.profitTradesCount,
      totalProfit: trades.totalProfit,
    },
    lossTrades: {
      count: trades.lossTradesCount,
      totalLoss: trades.totalLoss,
    },
    netPnL,
  };
}
