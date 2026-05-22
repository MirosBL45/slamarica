"use client";

import { useEffect, useState } from "react";

// import { BaseHasPermission } from "@/components/BaseHasPermission";
import dayjs from "dayjs";

import AddIncomeCard from "@/components/pages/household/AddIncomeCard/AddIncomeCard";
import IncomeList from "@/components/pages/household/IncomeList/IncomeList";
import PercentagePreview from "@/components/pages/household/PercentagePreview/PercentagePreview";
import TotalsMonthly from "@/components/pages/household/TotalsMonthly/TotalsMonthly";
import { useStores } from "@/stores/StoreContext";

export default function HouseholdClient() {
  const [month, setMonth] = useState(() => dayjs().format("YYYY-MM"));
  const { membersStore, householdStore, monthlyIncomeStore } = useStores();

  useEffect(() => {
    async function load() {
      try {
        await householdStore.loadFromServer();
        await monthlyIncomeStore.loadIncomes();
        await membersStore.loadMembers();
      } catch {
        // fallback → ništa ne radiš
        // već imaš podatke iz localStorage (hydrate)
      }
    }

    load();
  }, [householdStore, monthlyIncomeStore, membersStore]);

  // const activeUserId = membersStore.members[0]?.id;

  return (
    <>
      <PercentagePreview month={month} />
      <AddIncomeCard month={month} onMonthChange={setMonth} />
      {/* <BaseHasPermission permission={membersStore.isAdmin(activeUserId)}> */}

      <IncomeList month={month} />

      <TotalsMonthly month={month} />
    </>
  );
}
