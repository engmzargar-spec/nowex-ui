"use client";

import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

type SymbolsPieCardProps = {
  byCount?: { symbol: string; count: number }[];
  className?: string;
};

const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#0088FE", "#AA33FF"];

export default function SymbolsPieCard({ byCount, className }: SymbolsPieCardProps) {
  return (
    <div className={`p-4 rounded-xl shadow-sm bg-transparent border-2 border-cyan-500 ${className}`}>
      <h3 className="text-base font-semibold mb-3">نمودار دایره‌ای معاملات روی نمادها</h3>
      {byCount && byCount.length > 0 ? (
        <div style={{ width: "100%", height: 250 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={byCount}
                dataKey="count"
                nameKey="symbol"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {byCount.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-sm text-gray-500">داده‌ای موجود نیست</p>
      )}
    </div>
  );
}
