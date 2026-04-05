"use client";

import { Pie } from "@ant-design/plots";
import { Card } from "antd";
import { observer } from "mobx-react-lite";

import { BudgetPoolType } from "@/types/budget.types";

import styles from "./BudgetDonutChart.module.scss";

interface Props {
  localPools: Record<BudgetPoolType, number>;
  activeType: BudgetPoolType | null;
  setActiveType: (type: BudgetPoolType | null) => void;
}

type DonutDataItem = {
  type: string;
  value: number;
  rawType: BudgetPoolType;
};

const COLORS: Record<BudgetPoolType, string> = {
  [BudgetPoolType.PERSONAL]: "#3f5f5a",
  [BudgetPoolType.BILLS]: "#6f8f8a",
  [BudgetPoolType.TRAVEL]: "#c2a36b",
  [BudgetPoolType.FOOD]: "#9bb5b0",
  [BudgetPoolType.SAVINGS]: "#8c734b",
  [BudgetPoolType.INVESTMENTS]: "#e6d6b3",
};

const BudgetDonutChart = observer(({ localPools, activeType, setActiveType }: Props) => {
  const orderedTypes: BudgetPoolType[] = [
    BudgetPoolType.PERSONAL,
    BudgetPoolType.BILLS,
    BudgetPoolType.TRAVEL,
    BudgetPoolType.FOOD,
    BudgetPoolType.SAVINGS,
    BudgetPoolType.INVESTMENTS,
  ];

  const data: DonutDataItem[] = orderedTypes.map((type) => ({
    type: getLabel(type),
    value: localPools[type],
    rawType: type,
  }));

  const total = Object.values(localPools).reduce((sum, value) => sum + value, 0);

  const centerText = activeType
    ? `${getLabel(activeType)}\n${localPools[activeType]}%`
    : `${total}%`;

  const config = {
    data,
    angleField: "value",
    colorField: "type",
    innerRadius: 0.7,
    autoFit: true,
    padding: 0,

    scale: {
      color: {
        range: Object.values(COLORS),
      },
    },

    animate: {
      enter: {
        type: "scaleInY",
        duration: 500,
      },
      update: {
        type: "morphing",
        duration: 500,
      },
    },

    label: {
      text: (datum: DonutDataItem) => `${datum.value}%`,
      style: {
        fontWeight: 600,
        fontSize: 12,
      },
    },

    legend: false,

    tooltip: {
      items: (datum: DonutDataItem) => ({
        name: datum.type,
        value: `${datum.value}%`,
      }),
    },

    interaction: {
      elementHighlight: true,
    },

    annotations: [
      {
        type: "text",
        style: {
          text: centerText,
          x: "50%",
          y: "50%",
          textAlign: "center",
          textBaseline: "middle",
          fontSize: activeType ? 16 : 28,
          fontWeight: 600,
          fill: "#1f2a2a",
          whiteSpace: "pre-line",
        },
      },
    ],

    onReady: (plot: any) => {
      plot.on("element:click", (evt: any) => {
        const type = evt.data?.data?.rawType as BudgetPoolType | undefined;
        if (!type) return;

        setActiveType(type === activeType ? null : type);
      });

      plot.on("element:mouseenter", (evt: any) => {
        const type = evt.data?.data?.rawType as BudgetPoolType | undefined;
        if (!type) return;

        setActiveType(type);
      });

      plot.on("element:mouseleave", () => {
        setActiveType(null);
      });
    },
  };

  return (
    <div className={styles.wrapper}>
      <Card className={styles.card}>
        <h3 className={styles.title}>Raspodela budžeta</h3>
        <Pie {...config} className={styles.chart} />
      </Card>
    </div>
  );
});

export default BudgetDonutChart;

const getLabel = (type: BudgetPoolType | string) => {
  switch (type) {
    case BudgetPoolType.PERSONAL:
      return "Lični";
    case BudgetPoolType.BILLS:
      return "Računi";
    case BudgetPoolType.TRAVEL:
      return "Putovanja";
    case BudgetPoolType.FOOD:
      return "Hrana";
    case BudgetPoolType.SAVINGS:
      return "Štednja";
    case BudgetPoolType.INVESTMENTS:
      return "Investicije";
    default:
      return type;
  }
};
