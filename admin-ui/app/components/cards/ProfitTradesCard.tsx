"use client";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { dashboardConfig } from "../../config/dashboardConfig";

interface ProfitTradesCardProps {
  count: number;
  totalProfit: number;
}

export default function ProfitTradesCard({ count, totalProfit }: ProfitTradesCardProps) {
  const { card } = dashboardConfig;
  return (
    <Card
      shadow={card.shadow ? "sm" : "none"}
      style={{ borderRadius: card.radius, border: `1px solid ${card.borderColor}` }}
    >
      <CardHeader className="font-bold">معاملات در سود و مجموع سود</CardHeader>
      <CardBody>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <span className="text-gray-500">تعداد:</span>
            <div className="font-semibold">{count.toLocaleString("fa-IR")}</div>
          </div>
          <div>
            <span className="text-gray-500">مجموع سود:</span>
            <div className="font-semibold">{totalProfit.toLocaleString("fa-IR")} ریال</div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
