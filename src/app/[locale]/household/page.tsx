'use client';

import { useState } from 'react';
import MonthSelector from '@/components/MonthSelector';
import AddIncomeForm from '@/components/AddIncomeForm';
import MonthlyIncomeList from '@/components/MonthlyIncomeList';
import MonthlyTotals from '@/components/MonthlyTotals';

export default function Household() {
  const [month, setMonth] = useState('2026-01');

  return (
    <div style={{ padding: '1rem' }}>
      <MonthSelector value={month} onChange={setMonth} />
      <AddIncomeForm month={month} />
      <MonthlyIncomeList month={month} />
      <MonthlyTotals month={month} />
    </div>
  );
}
