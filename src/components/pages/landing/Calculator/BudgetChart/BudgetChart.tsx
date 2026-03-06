"use client";

// MOŽDA ZA KORISTITI KASNIJE, ALI ZA SAD NE TREBA. TEK EVENTUALNO KADA BUDE TREBALO DA SE PRIKAŽE CHART U HOUSEHOLD STRANICI

import { Pie } from "@ant-design/plots";

export function BudgetChart({ categories }: { categories: { id: string; percent: number; color: string }[] }) {
  const data = categories.map((c) => ({
    type: c.id,
    value: c.percent,
  }));

  const config = {
    data,
    angleField: "value",
    colorField: "type",
    innerRadius: 0.25,
    legend: false,
    label: false,
    interactions: [{ type: "element-active" }],
  };

  return <Pie {...config} />;
}