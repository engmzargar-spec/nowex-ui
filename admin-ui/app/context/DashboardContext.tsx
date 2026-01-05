"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type MenuItem = {
  id: string;
  title: string;
  icon: React.ReactNode;
  submenus?: { id: string; title: string }[];
};

type UserInfo = {
  name: string;
  role: string;
};

type DashboardContextType = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  menuItems: MenuItem[];
  userInfo: UserInfo;
};

const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    title: "داشبورد مدیریت NOW-EX",
    icon: null,
    submenus: [
      { id: "overview", title: "نمای کلی" },
      { id: "reports", title: "گزارش‌ها" },
    ],
  },
  {
    id: "users",
    title: "کاربران",
    icon: null,
    submenus: [
      { id: "list", title: "لیست کاربران" },
      { id: "roles", title: "ویرایش اطلاعات" },
    ],
  },
];

const userInfo: UserInfo = {
  name: "mehdi",
  role: "مدیر سیستم",
};

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <DashboardContext.Provider value={{ sidebarOpen, setSidebarOpen, menuItems, userInfo }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};

// 🎨 رنگ‌های حاشیه کارت‌ها
export const cardBorderColors: Record<string, string> = {
  balance: "border-yellow-500",
  usersTotal: "border-blue-500",
  usersActive: "border-indigo-500",
  openTrades: "border-green-500",
  feesRevenue: "border-purple-500",
  profitTrades: "border-emerald-500",
  lossTrades: "border-red-500",
  netPnL: "border-pink-500",
  symbolsPie: "border-cyan-500",
};
