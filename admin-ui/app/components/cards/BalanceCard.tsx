"use client";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { dashboardConfig } from "../../config/dashboardConfig";

export interface BalanceCardProps {
  data: {
    initialBalance: number;
    pnl: number;
    currentBalance: number;
    fees: number;
  };
  title?: string;
}

export default function BalanceCard({ data, title = "وضعیت حساب پلتفرم" }: BalanceCardProps) {
  const { card } = dashboardConfig;
  return (
    <Card
      shadow={card.shadow ? "sm" : "none"}
      className="w-full"
      style={{
        borderRadius: card.radius,
        border: `1px solid ${card.borderColor}`,
      }}
    >
      <CardHeader className="font-bold">{title}</CardHeader>
      <CardBody className="text-sm">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <span className="text-gray-500">بالانس اولیه:</span>
            <div className="font-semibold">{data.initialBalance.toLocaleString("fa-IR")} ریال</div>
          </div>
          <div>
            <span className="text-gray-500">سود/زیان:</span>
            <div className="font-semibold">{data.pnl.toLocaleString("fa-IR")} ریال</div>
          </div>
          <div>
            <span className="text-gray-500">کارمزدها:</span>
            <div className="font-semibold">{data.fees.toLocaleString("fa-IR")} ریال</div>
          </div>
          <div>
            <span className="text-gray-500">بالانس فعلی:</span>
            <div className="font-semibold">{data.currentBalance.toLocaleString("fa-IR")} ریال</div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
