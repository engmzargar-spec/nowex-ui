"use client";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { dashboardConfig } from "../../config/dashboardConfig";

interface ActiveUsersCardProps {
  count: number;
}

export default function ActiveUsersCard({ count }: ActiveUsersCardProps) {
  const { card } = dashboardConfig;
  return (
    <Card
      shadow={card.shadow ? "sm" : "none"}
      style={{ borderRadius: card.radius, border: `1px solid ${card.borderColor}` }}
    >
      <CardHeader className="font-bold">تعداد کاربران فعال</CardHeader>
      <CardBody>
        <div className="text-2xl font-extrabold">
          {count.toLocaleString("fa-IR")} نفر
        </div>
      </CardBody>
    </Card>
  );
}
