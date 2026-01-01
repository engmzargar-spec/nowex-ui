"use client";

import {Card, CardHeader, CardBody} from "@nextui-org/react";

interface CardWidgetProps {
  title: string;
  value: string | number;
}

export default function CardWidget({ title, value }: CardWidgetProps) {
  return (
    <Card className="w-full shadow-md">
      <CardHeader className="font-bold text-lg">{title}</CardHeader>
      <CardBody>
        <p className="text-2xl font-semibold">{value}</p>
      </CardBody>
    </Card>
  );
}
