"use client";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { dashboardConfig } from "../../config/dashboardConfig";

interface FeesRevenueCardProps {
  totalVolume: number; // مجموع معاملات باز
}

export default function FeesRevenueCard({ totalVolume }: FeesRevenueCardProps) {
  const { card } = dashboardConfig;

  // فرمول محاسبه کارمزد: هر واحد معامله = 100000 ریال
  const feesRevenue = totalVolume * 100000;

  return (
    <Card
      shadow={card.shadow ? "sm" : "none"}
      style={{ borderRadius: card.radius, border: `1px solid ${card.borderColor}` }}
    >
      <CardHeader className="font-bold">درآمد حاصل از کارمزدها</CardHeader>
      <CardBody>
        <div className="text-2xl font-extrabold">
          {feesRevenue.toLocaleString("fa-IR")} ریال
        </div>
      </CardBody>
    </Card>
  );
}
