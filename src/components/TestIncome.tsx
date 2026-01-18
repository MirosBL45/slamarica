'use client';

import { observer } from 'mobx-react-lite';
import { useStores } from '@/stores/StoreContext';
import { Button } from 'antd';

const TestIncome = observer(() => {
  const { membersStore, budgetStore, monthlyIncomeStore } = useStores();
  //   const member = membersStore.members[0];
  //   if (!member) return;

  return (
    <div>
      <div>
        <Button
          onClick={() =>
            membersStore.addMember({
              id: crypto.randomUUID(),
              name: 'Pera',
            })
          }
        >
          Dodaj člana
        </Button>
      </div>
      <Button
        onClick={() => {
          if (membersStore.members.length === 0)
            alert('Nema članova u sistemu!');
          monthlyIncomeStore.createIncome(
            membersStore.members[0].id,
            '2026-01',
            170000,
            budgetStore
          );
        }}
      >
        Dodaj platu
      </Button>

      <pre>
        {JSON.stringify(monthlyIncomeStore.getByMonth('2026-01'), null, 2)}
      </pre>
    </div>
  );
});

export default TestIncome;
