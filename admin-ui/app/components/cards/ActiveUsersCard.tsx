"use client";

import React from "react";

type ActiveUsersCardProps = {
  count?: number;
  className?: string;
};

export default function ActiveUsersCard({ count, className }: ActiveUsersCardProps) {
  return (
    <div className={`p-4 rounded-xl shadow-sm bg-transparent border-2 border-indigo-500 ${className}`}>
      <h3 className="text-base font-semibold mb-3">کاربران فعال</h3>
      {count !== undefined ? (
        <p className="text-lg font-bold">{count.toLocaleString()}</p>
      ) : (
        <p className="text-sm text-gray-500">داده‌ای موجود نیست</p>
      )}
    </div>
  );
}
