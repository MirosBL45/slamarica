'use client';

import { Button } from 'antd';
import { useStores } from '@/stores/StoreContext';
import AddIncomeForm from '@/components/AddIncomeForm';
import MonthlyIncomeList from '@/components/MonthlyIncomeList';
import MonthlyTotals from '@/components/MonthlyTotals';

export default function Page() {
  const { membersStore } = useStores();

  return (
    <div style={{ padding: '1rem' }}>
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

      <AddIncomeForm />
      <MonthlyIncomeList month="2026-01" />
      <MonthlyTotals month="2026-01" />
    </div>
  );
}
