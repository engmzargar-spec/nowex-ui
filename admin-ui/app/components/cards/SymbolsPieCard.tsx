"use client";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { dashboardConfig } from "../../config/dashboardConfig";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function SymbolsPieCard({
  byCount,
}: {
  byCount: Array<{ symbol: string; count: number }>;
}) {
  const { card } = dashboardConfig;

  return (
    <Card shadow={card.shadow ? "sm" : "none"} style={{ borderRadius: card.radius, border: `1px solid ${card.borderColor}` }}>
      <CardHeader className="font-bold">نمودار دایره‌ای معاملات روی نمادها</CardHeader>
      <CardBody>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={byCount}
              dataKey="count"
              nameKey="symbol"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {byCount.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
}
