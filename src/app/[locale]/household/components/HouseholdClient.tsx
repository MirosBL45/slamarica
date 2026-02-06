"use client";

import { useState } from "react";
import MonthSelector from "@/components/MonthSelector";
import AddIncomeForm from "@/components/AddIncomeForm";
import MonthlyIncomeList from "@/components/MonthlyIncomeList";
import MonthlyTotals from "@/components/MonthlyTotals";
import BudgetSettings from "@/components/BudgetSettings";
import dayjs from "dayjs";

export default function HouseholdClient() {
  const [month, setMonth] = useState(() => dayjs().format("YYYY-MM"));

  return (
    <>
      <BudgetSettings month={month} />
      <MonthSelector value={month} onChange={setMonth} />
      <AddIncomeForm month={month} />
      <MonthlyIncomeList month={month} />
      <MonthlyTotals month={month} />
    </>
  );
}
