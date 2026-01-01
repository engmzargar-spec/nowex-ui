"use client";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { dashboardConfig } from "../../config/dashboardConfig";

interface NetPnLCardProps {
  netPnL: number;
}

export default function NetPnLCard({ netPnL }: NetPnLCardProps) {
  const { card } = dashboardConfig;
  return (
    <Card
      shadow={card.shadow ? "sm" : "none"}
      style={{ borderRadius: card.radius, border: `1px solid ${card.borderColor}` }}
    >
      <CardHeader className="font-bold">تفاضل سود و ضرر</CardHeader>
      <CardBody>
        <div className="text-2xl font-extrabold">{netPnL.toLocaleString("fa-IR")} ریال</div>
      </CardBody>
    </Card>
  );
}
