"use client";

import React from "react";

type UsersTotalCardProps = {
  count?: number;
  className?: string;
};

export default function UsersTotalCard({ count, className }: UsersTotalCardProps) {
  return (
    <div className={`p-4 rounded-xl shadow-sm bg-transparent border-2 border-blue-500 ${className}`}>
      <h3 className="text-base font-semibold mb-3">تعداد کل کاربران</h3>
      {count !== undefined ? (
        <p className="text-lg font-bold">{count.toLocaleString()}</p>
      ) : (
        <p className="text-sm text-gray-500">داده‌ای موجود نیست</p>
      )}
    </div>
  );
}
