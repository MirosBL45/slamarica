'use client';

import { useState } from 'react';
import MonthSelector from '@/components/MonthSelector';
import AddIncomeForm from '@/components/AddIncomeForm';
import MonthlyIncomeList from '@/components/MonthlyIncomeList';
import MonthlyTotals from '@/components/MonthlyTotals';
import AddMemberForm from '@/components/AddMemberForm';
import MemberList from '@/components/MemberList';
import { useEffect } from 'react';
import { useStores } from '@/stores/StoreContext';
import BudgetSettings from '@/components/BudgetSettings';

export default function HouseholdClient() {
  const [month, setMonth] = useState('2026-01');

  const { membersStore, monthlyIncomeStore, budgetStore } = useStores();

  useEffect(() => {
    membersStore.hydrate();
    monthlyIncomeStore.hydrate();
    budgetStore.hydrate();
  }, []);

  return (
    <>
      <BudgetSettings month={month} />
      <AddMemberForm />
      <MemberList />
      <MonthSelector value={month} onChange={setMonth} />
      <AddIncomeForm month={month} />
      <MonthlyIncomeList month={month} />
      <MonthlyTotals month={month} />
    </>
  );
}
