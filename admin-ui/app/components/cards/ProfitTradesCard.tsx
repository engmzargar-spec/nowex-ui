"use client";

import React from "react";

type ProfitTradesCardProps = {
  count?: number;
  totalProfit?: number;
  className?: string;
};

export default function ProfitTradesCard({ count, totalProfit, className }: ProfitTradesCardProps) {
  return (
    <div className={`p-4 rounded-xl shadow-sm bg-transparent border-2 border-emerald-500 ${className}`}>
      <h3 className="text-base font-semibold mb-3">معاملات سودده</h3>
      {count !== undefined && totalProfit !== undefined ? (
        <ul className="space-y-1 text-sm">
          <li>تعداد: <span className="font-bold">{count.toLocaleString()}</span></li>
          <li>سود کل: <span className="font-bold">{totalProfit.toLocaleString()} ریال</span></li>
        </ul>
      ) : (
        <p className="text-sm text-gray-500">داده‌ای موجود نیست</p>
      )}
    </div>
  );
}
