"use client";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { dashboardConfig } from "../../config/dashboardConfig";

export default function OpenTradesCard({ count, totalVolume }: { count: number; totalVolume: number }) {
  const { card } = dashboardConfig;
  return (
    <Card shadow={card.shadow ? "sm" : "none"} style={{ borderRadius: card.radius, border: `1px solid ${card.borderColor}` }}>
      <CardHeader className="font-bold">معاملات باز و مجموع حجم</CardHeader>
      <CardBody>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <span className="text-gray-500">تعداد معاملات باز:</span>
            <div className="font-semibold">{count.toLocaleString("fa-IR")}</div>
          </div>
          <div>
            <span className="text-gray-500">مجموع حجم:</span>
            <div className="font-semibold">{totalVolume.toLocaleString("fa-IR")}</div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
