"use client";

import { useLocale, useTranslations } from "next-intl";

import { observer } from "mobx-react-lite";

import ContainerCard from "@/components/ui/ContainerCard/ContainerCard";
import { useStores } from "@/stores/StoreContext";
import { formatCurrency } from "@/utils/helpers/formatCurrency";
import { BudgetPoolType } from "@/types/budget.types";
import { MoneyCurrency } from "@/types/household.types";

import styles from "./IncomeList.module.scss";

interface Props {
  month: string;
}

const IncomeList = observer(({ month }: Props) => {
  const { monthlyIncomeStore, membersStore, householdStore } = useStores();

  const locale = useLocale();
  const t = useTranslations("incomeTable");

  const currency = householdStore.activeHousehold?.currency ?? MoneyCurrency.RSD;

  const incomes = monthlyIncomeStore.getByMonth(month);

  const members = incomes.map((income) => {
    const member = membersStore.members.find((m) => m.id === income.memberId);

    return {
      name: member?.name ?? t("unknown"),
      salary: income.salary,
      breakdown: income.breakdown,
    };
  });

  const rows = [
    { key: "salary", label: t("salary") },
    { key: BudgetPoolType.PERSONAL, label: t("personal") },
    { key: BudgetPoolType.BILLS, label: t("bills") },
    { key: BudgetPoolType.TRAVEL, label: t("travel") },
    { key: BudgetPoolType.FOOD, label: t("food") },
    { key: BudgetPoolType.SAVINGS, label: t("savings") },
    { key: BudgetPoolType.INVESTMENTS, label: t("investments") },
  ];

  return (
    <ContainerCard className={styles.card}>
      <h3 className={styles.title}>{t("title") || "Monthly Summary"}</h3>

      <div className={styles.gridWrapper}>
        {/* HEADER */}
        <div className={styles.header}>
          <div className={styles.empty} />

          {members.map((m, i) => (
            <div key={i} className={`${styles.member} ${styles[`col${i % 6}`]}`}>
              {m.name}
            </div>
          ))}
        </div>

        {/* ROWS */}
        {rows.map((row) => (
          <div key={row.key} className={styles.row}>
            <div className={styles.label}>{row.label}</div>

            {members.map((m, i) => {
              let value = 0;

              if (row.key === "salary") {
                value = m.salary;
              } else {
                value = m.breakdown[row.key as BudgetPoolType];
              }

              return (
                <div key={i} className={`${styles.cell} ${styles[`col${i % 6}`]}`}>
                  {formatCurrency(value, locale, currency)}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </ContainerCard>
  );
});

export default IncomeList;
