'use client';

import { Button } from 'antd';
import { useStores } from '@/stores/StoreContext';
import AddIncomeForm from '@/components/AddIncomeForm';
import MonthlyIncomeList from '@/components/MonthlyIncomeList';
import MonthlyTotals from '@/components/MonthlyTotals';
import MonthSelector from '@/components/MonthSelector';
import { useState } from 'react';

export default function Page() {
  const { membersStore } = useStores();
  const [month, setMonth] = useState('2026-01');

  return (
    <div style={{ padding: '1rem' }}>
      <MonthSelector value={month} onChange={setMonth} />
      <Button
        onClick={() =>
          membersStore.addMember({
            id: crypto.randomUUID(),
            name: 'Pera',
          })
        }
        style={{ marginBottom: '1rem' }}
      >
        Dodaj test člana
      </Button>

      <AddIncomeForm month={month} />
      <MonthlyIncomeList month={month} />
      <MonthlyTotals month={month} />
    </div>
  );
}
