"use client";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { dashboardConfig } from "../../config/dashboardConfig";

interface UsersTotalCardProps {
  count: number;
}

export default function UsersTotalCard({ count }: UsersTotalCardProps) {
  const { card } = dashboardConfig;
  return (
    <Card
      shadow={card.shadow ? "sm" : "none"}
      style={{ borderRadius: card.radius, border: `1px solid ${card.borderColor}` }}
    >
      <CardHeader className="font-bold">تعداد کل کاربران</CardHeader>
      <CardBody>
        <div className="text-2xl font-extrabold">
          {count.toLocaleString("fa-IR")} نفر
        </div>
      </CardBody>
    </Card>
  );
}
