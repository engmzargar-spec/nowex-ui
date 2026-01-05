"use client";

import React from "react";

type NetPnLCardProps = {
  netPnL?: number;
  className?: string;
};

export default function NetPnLCard({ netPnL, className }: NetPnLCardProps) {
  return (
    <div className={`p-4 rounded-xl shadow-sm bg-transparent border-2 border-pink-500 ${className}`}>
      <h3 className="text-base font-semibold mb-3">سود/زیان خالص</h3>
      {netPnL !== undefined ? (
        <p className="text-lg font-bold">{netPnL.toLocaleString()} ریال</p>
      ) : (
        <p className="text-sm text-gray-500">داده‌ای موجود نیست</p>
      )}
    </div>
  );
}
