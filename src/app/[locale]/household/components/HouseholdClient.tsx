"use client";

import { useEffect, useState } from "react";

// import { BaseHasPermission } from "@/components/BaseHasPermission";
import dayjs from "dayjs";

import AddIncomeForm from "@/components/AddIncomeForm";
import BudgetSettings from "@/components/BudgetSettings";
import MonthlyIncomeList from "@/components/MonthlyIncomeList";
import MonthlyTotals from "@/components/MonthlyTotals";
import MonthSelector from "@/components/MonthSelector";
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
  }, []);

  // const activeUserId = membersStore.members[0]?.id;

  return (
    <>
      {/* <BaseHasPermission permission={membersStore.isAdmin(activeUserId)}> */}
      <BudgetSettings month={month} />
      {/* </BaseHasPermission> */}
      <MonthSelector value={month} onChange={setMonth} />
      <AddIncomeForm month={month} />
      <MonthlyIncomeList month={month} />
      <MonthlyTotals month={month} />
    </>
  );
}
