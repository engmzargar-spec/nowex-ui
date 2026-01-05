"use client";

import React from "react";

type BalanceCardProps = {
  data?: {
    initialBalance?: number;
    totalFees?: number;
    realizedPnL?: number;
    unrealizedPnL?: number;
  };
  className?: string;
};

export default function BalanceCard({ data, className }: BalanceCardProps) {
  return (
    <div className={`p-4 rounded-xl shadow-sm bg-transparent border-2 border-yellow-500 ${className}`}>
      <h3 className="text-base font-semibold mb-3">وضعیت حساب پلتفرم</h3>
      {data ? (
        <ul className="space-y-1 text-sm">
          <li>
            بالانس اولیه:{" "}
            <span className="font-bold">
              {data.initialBalance !== undefined ? data.initialBalance.toLocaleString() : "—"}
            </span>{" "}
            ریال
          </li>
          <li>
            کارمزدها:{" "}
            <span className="font-bold">
              {data.totalFees !== undefined ? data.totalFees.toLocaleString() : "—"}
            </span>{" "}
            ریال
          </li>
          <li>
            سود تحقق‌یافته:{" "}
            <span className="font-bold">
              {data.realizedPnL !== undefined ? data.realizedPnL.toLocaleString() : "—"}
            </span>{" "}
            ریال
          </li>
          <li>
            سود/زیان تحقق‌نیافته:{" "}
            <span className="font-bold">
              {data.unrealizedPnL !== undefined ? data.unrealizedPnL.toLocaleString() : "—"}
            </span>{" "}
            ریال
          </li>
        </ul>
      ) : (
        <p className="text-sm text-gray-500">داده‌ای موجود نیست</p>
      )}
    </div>
  );
}
