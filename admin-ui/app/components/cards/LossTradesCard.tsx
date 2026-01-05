"use client";

import React from "react";

type LossTradesCardProps = {
  count?: number;
  totalLoss?: number;
  className?: string;
};

export default function LossTradesCard({ count, totalLoss, className }: LossTradesCardProps) {
  return (
    <div className={`p-4 rounded-xl shadow-sm bg-transparent border-2 border-red-500 ${className}`}>
      <h3 className="text-base font-semibold mb-3">معاملات زیان‌ده</h3>
      {count !== undefined && totalLoss !== undefined ? (
        <ul className="space-y-1 text-sm">
          <li>تعداد: <span className="font-bold">{count.toLocaleString()}</span></li>
          <li>زیان کل: <span className="font-bold">{totalLoss.toLocaleString()} ریال</span></li>
        </ul>
      ) : (
        <p className="text-sm text-gray-500">داده‌ای موجود نیست</p>
      )}
    </div>
  );
}
