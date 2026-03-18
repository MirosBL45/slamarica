"use client";

import { useState, useEffect } from "react";
import MonthSelector from "@/components/MonthSelector";
import AddIncomeForm from "@/components/AddIncomeForm";
import MonthlyIncomeList from "@/components/MonthlyIncomeList";
import MonthlyTotals from "@/components/MonthlyTotals";
import BudgetSettings from "@/components/BudgetSettings";
import { BaseHasPermission } from "@/components/BaseHasPermission";
import dayjs from "dayjs";
import { useStores } from "@/stores/StoreContext";

export default function HouseholdClient() {
  const [month, setMonth] = useState(() => dayjs().format("YYYY-MM"));

  const { membersStore, householdStore } = useStores();

  useEffect(() => {
    householdStore.loadFromServer();
  }, []);

  const activeUserId = membersStore.members[0]?.id;

  return (
    <>
      <BaseHasPermission permission={membersStore.isAdmin(activeUserId)}>
        <BudgetSettings month={month} />
      </BaseHasPermission>
      <MonthSelector value={month} onChange={setMonth} />
      <AddIncomeForm month={month} />
      <MonthlyIncomeList month={month} />
      <MonthlyTotals month={month} />
    </>
  );
}
