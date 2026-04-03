"use client";

import { useLocale, useTranslations } from "next-intl";

import { Card } from "antd";
import { observer } from "mobx-react-lite";

import { useStores } from "@/stores/StoreContext";
import { formatCurrency } from "@/utils/helpers/formatCurrency";
import { BudgetPoolType } from "@/types/budget.types";
import { MoneyCurrency } from "@/types/household.types";

import styles from "./TotalsMonthly.module.scss";

interface Props {
  month: string;
}

const TotalsMonthly = observer(({ month }: Props) => {
  const { monthlyIncomeStore, householdStore } = useStores();

  const currency = householdStore.activeHousehold?.currency ?? MoneyCurrency.RSD;

  const locale = useLocale();
  const t = useTranslations("totals");

  const totals = monthlyIncomeStore.getTotalsByMonth(month);

  return (
    <Card className={styles.card}>
      <div className={styles.list}>
        <div className={styles.row}>
          <span>{t("personal")}</span>
          <span className={styles.value}>
            {formatCurrency(totals[BudgetPoolType.PERSONAL], locale, currency)}
          </span>
        </div>

        <div className={styles.row}>
          <span>{t("bills")}</span>
          <span className={styles.value}>
            {formatCurrency(totals[BudgetPoolType.BILLS], locale, currency)}
          </span>
        </div>

        <div className={styles.row}>
          <span>{t("travel")}</span>
          <span className={styles.value}>
            {formatCurrency(totals[BudgetPoolType.TRAVEL], locale, currency)}
          </span>
        </div>

        <div className={styles.row}>
          <span>{t("food")}</span>
          <span className={styles.value}>
            {formatCurrency(totals[BudgetPoolType.FOOD], locale, currency)}
          </span>
        </div>

        <div className={styles.row}>
          <span>{t("savings")}</span>
          <span className={styles.value}>
            {formatCurrency(totals[BudgetPoolType.SAVINGS], locale, currency)}
          </span>
        </div>

        <div className={styles.row}>
          <span>{t("investments")}</span>
          <span className={styles.value}>
            {formatCurrency(totals[BudgetPoolType.INVESTMENTS], locale, currency)}
          </span>
        </div>
      </div>
    </Card>
  );
});

export default TotalsMonthly;
