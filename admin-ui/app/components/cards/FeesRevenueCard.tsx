"use client";

import React from "react";

type FeesRevenueCardProps = {
  totalVolume?: number;
  className?: string;
};

export default function FeesRevenueCard({ totalVolume, className }: FeesRevenueCardProps) {
  return (
    <div className={`p-4 rounded-xl shadow-sm bg-transparent border-2 border-purple-500 ${className}`}>
      <h3 className="text-base font-semibold mb-3">درآمد حاصل از کارمزدها</h3>
      {totalVolume !== undefined ? (
        <p className="text-lg font-bold">{totalVolume.toLocaleString()} ریال</p>
      ) : (
        <p className="text-sm text-gray-500">داده‌ای موجود نیست</p>
      )}
    </div>
  );
}
