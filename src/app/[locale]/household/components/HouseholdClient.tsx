"use client";

import { useEffect, useState } from "react";

// import { BaseHasPermission } from "@/components/BaseHasPermission";
import dayjs from "dayjs";

// import AddIncomeForm from "@/components/AddIncomeForm";
// import BudgetSettings from "@/components/BudgetSettings";
// import MonthlyIncomeList from "@/components/MonthlyIncomeList";
// import MonthlyTotals from "@/components/MonthlyTotals";
// import MonthSelector from "@/components/MonthSelector";
import AddIncomeCard from "@/components/pages/household/AddIncomeCard/AddIncomeCard";
import BudgetTrendChart from "@/components/pages/household/BudgetTrendChart/BudgetTrendChart";
import IncomeList from "@/components/pages/household/IncomeList/IncomeList";
import PercentagePreview from "@/components/pages/household/PercentagePreview/PercentagePreview";
// import SettingsBudget from "@/components/pages/household/SettingsBudget/SettingsBudget";
import TotalsMonthly from "@/components/pages/household/TotalsMonthly/TotalsMonthly";
import { useStores } from "@/stores/StoreContext";

export default function HouseholdClient() {
  const [month, setMonth] = useState(() => dayjs().format("YYYY-MM"));
  const { membersStore, householdStore, monthlyIncomeStore } = useStores();

  useEffect(() => {
    const load = async () => {
      try {
        await householdStore.loadFromServer();
        await monthlyIncomeStore.loadIncomes();
        await membersStore.loadMembers();
      } catch {
        // fallback → ništa ne radiš
        // već imaš podatke iz localStorage (hydrate)
      }
    };

    load();
  }, [householdStore, monthlyIncomeStore, membersStore]);

  // const activeUserId = membersStore.members[0]?.id;

  return (
    <>
      <PercentagePreview month={month} />
      <AddIncomeCard month={month} onMonthChange={setMonth} />
      {/* <BaseHasPermission permission={membersStore.isAdmin(activeUserId)}> */}
      {/* <BudgetSettings month={month} /> */}
      {/* </BaseHasPermission> */}
      {/* <MonthSelector value={month} onChange={setMonth} /> */}
      {/* <AddIncomeForm month={month} /> */}
      {/* <MonthlyIncomeList month={month} /> */}
      <IncomeList month={month} />
      {/* <MonthlyTotals month={month} /> */}
      <TotalsMonthly month={month} />
      <BudgetTrendChart />
      {/* <SettingsBudget month={month} /> */}
    </>
  );
}
