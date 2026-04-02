"use client";

import { useLocale, useTranslations } from "next-intl";

import { Card, Table } from "antd";
import { observer } from "mobx-react-lite";

import { useStores } from "@/stores/StoreContext";
import { formatCurrency } from "@/utils/helpers/formatCurrency";
import { BudgetPoolType } from "@/types/budget.types";
import { MoneyCurrency } from "@/types/household.types";

interface Props {
  month: string;
}

const MonthlyIncomeList = observer(({ month }: Props) => {
  const { monthlyIncomeStore, membersStore, householdStore } = useStores();

  const currency = householdStore.activeHousehold?.currency ?? MoneyCurrency.RSD;

  const locale = useLocale();
  const t = useTranslations("incomeTable");

  const data = monthlyIncomeStore.getByMonth(month).map((income) => {
    const member = membersStore.members.find((m) => m.id === income.memberId);

    return {
      key: income.id,
      member: member?.name ?? t("unknown"),
      salary: income.salary,
      personal: income.breakdown[BudgetPoolType.PERSONAL],
      bills: income.breakdown[BudgetPoolType.BILLS],
      travel: income.breakdown[BudgetPoolType.TRAVEL],
      food: income.breakdown[BudgetPoolType.FOOD],
      savings: income.breakdown[BudgetPoolType.SAVINGS],
      investments: income.breakdown[BudgetPoolType.INVESTMENTS],
    };
  });

  const columns = [
    { title: t("member"), dataIndex: "member" },
    {
      title: t("salary"),
      dataIndex: "salary",
      render: (value: number) => formatCurrency(value, locale, currency),
    },
    {
      title: t("personal"),
      dataIndex: "personal",
      render: (value: number) => formatCurrency(value, locale, currency),
    },
    {
      title: t("bills"),
      dataIndex: "bills",
      render: (value: number) => formatCurrency(value, locale, currency),
    },
    {
      title: t("travel"),
      dataIndex: "travel",
      render: (value: number) => formatCurrency(value, locale, currency),
    },
    {
      title: t("food"),
      dataIndex: "food",
      render: (value: number) => formatCurrency(value, locale, currency),
    },
    {
      title: t("savings"),
      dataIndex: "savings",
      render: (value: number) => formatCurrency(value, locale, currency),
    },
    {
      title: t("investments"),
      dataIndex: "investments",
      render: (value: number) => formatCurrency(value, locale, currency),
    },
  ];

  return (
    <Card style={{ marginTop: "1rem" }}>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        locale={{ emptyText: t("empty") }}
      />
    </Card>
  );
});

export default MonthlyIncomeList;
