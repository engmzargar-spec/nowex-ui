export interface AccountSnapshot {
  initialBalance: number;
  totalFees: number;
  realizedPnL: number;
  unrealizedPnL: number;
}

export interface UsersStats {
  totalUsers: number;
  activeUsers: number;
}

export interface TradesStats {
  openTradesCount: number;
  totalVolume: number;
  profitTradesCount: number;
  totalProfit: number;
  lossTradesCount: number;
  totalLoss: number;
}

export interface SymbolsDistribution {
  byCount: Array<{ symbol: string; count: number }>;
  byVolume: Array<{ symbol: string; volume: number }>;
}

export interface DashboardData {
  account: AccountSnapshot;
  users: UsersStats;
  trades: TradesStats;
  symbols: SymbolsDistribution;
}

export interface FetchOptions {
  timeRange: { startJalali: string; endJalali: string };
}

export interface ComputedDashboard {
  balanceCard: {
    initialBalance: number;
    pnl: number;
    currentBalance: number;
    fees: number;
  };
  usersTotal: number;
  usersActive: number;
  openTrades: { count: number; totalVolume: number };
  feesRevenue: number;
  symbolsPie: SymbolsDistribution;
  profitTrades: { count: number; totalProfit: number };
  lossTrades: { count: number; totalLoss: number };
  netPnL: number;
}
