import { DashboardData, FetchOptions } from "../types";

export async function fetchDashboardData(opts: FetchOptions): Promise<DashboardData> {
  const url = `/api/dashboard?start=${encodeURIComponent(opts.timeRange.startJalali)}&end=${encodeURIComponent(opts.timeRange.endJalali)}`;
  const res = await fetch(url, { method: "GET", cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch dashboard data");
  return res.json();
}
