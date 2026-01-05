"use client";

import React from "react";

type OpenTradesCardProps = {
  count?: number;
  totalVolume?: number;
  className?: string;
};

export default function OpenTradesCard({ count, totalVolume, className }: OpenTradesCardProps) {
  return (
    <div className={`p-4 rounded-xl shadow-sm bg-transparent border-2 border-green-500 ${className}`}>
      <h3 className="text-base font-semibold mb-3">معاملات باز</h3>
      {count !== undefined && totalVolume !== undefined ? (
        <ul className="space-y-1 text-sm">
          <li>تعداد: <span className="font-bold">{count.toLocaleString()}</span></li>
          <li>حجم کل: <span className="font-bold">{totalVolume.toLocaleString()}</span></li>
        </ul>
      ) : (
        <p className="text-sm text-gray-500">داده‌ای موجود نیست</p>
      )}
    </div>
  );
}
