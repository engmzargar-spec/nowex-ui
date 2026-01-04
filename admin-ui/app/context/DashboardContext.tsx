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
  // سایر منوها همینطور اضافه شوند
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
