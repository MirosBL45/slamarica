"use client";

import { observer } from "mobx-react-lite";
import { Card } from "antd";
import { useStores } from "@/stores/StoreContext";
import { useLocale, useTranslations } from "next-intl";
import { formatCurrency } from "@/utils/helpers/formatCurrency";
import { MoneyCurrency } from "@/types/household.types";
import { BudgetPoolType } from "@/types/budget.types";

interface Props {
  month: string;
}

const MonthlyTotals = observer(({ month }: Props) => {
  const { monthlyIncomeStore, householdStore } = useStores();

  const currency =
    householdStore.activeHousehold?.currency ?? MoneyCurrency.RSD;

  const locale = useLocale();
  const t = useTranslations("totals");

  const totals = monthlyIncomeStore.getTotalsByMonth(month);

  return (
    <Card style={{ marginTop: "1rem" }}>
      <div>
        {t("personal")}:{" "}
        {formatCurrency(totals[BudgetPoolType.PERSONAL], locale, currency)}
      </div>
      <div>
        {t("bills")}:{" "}
        {formatCurrency(totals[BudgetPoolType.BILLS], locale, currency)}
      </div>
      <div>
        {t("travel")}:{" "}
        {formatCurrency(totals[BudgetPoolType.TRAVEL], locale, currency)}
      </div>
      <div>
        {t("food")}:{" "}
        {formatCurrency(totals[BudgetPoolType.FOOD], locale, currency)}
      </div>
      <div>
        {t("savings")}:{" "}
        {formatCurrency(totals[BudgetPoolType.SAVINGS], locale, currency)}
      </div>
      <div>
        {t("investments")}:{" "}
        {formatCurrency(totals[BudgetPoolType.INVESTMENTS], locale, currency)}
      </div>
    </Card>
  );
});

export default MonthlyTotals;
