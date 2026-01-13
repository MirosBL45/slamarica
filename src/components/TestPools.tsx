'use client';

import { observer } from 'mobx-react-lite';
import { useStores } from '@/stores/StoreContext';
import { InputNumber, Card } from 'antd';

const BudgetTest = observer(() => {
  const { budgetStore } = useStores();

  return (
    <Card style={{ maxWidth: 420 }}>
      {budgetStore.pools.map((pool) => (
        <div key={pool.type} style={{ marginBottom: '1rem' }}>
          <span>{pool.label}</span>
          <InputNumber
            min={0}
            max={100}
            value={pool.percentage}
            onChange={(v) => budgetStore.setPercentage(pool.type, Number(v))}
            style={{ marginLeft: '1rem' }}
          />
        </div>
      ))}

      <strong>
        Zbir: {budgetStore.totalPercentage}% {!budgetStore.isValid && '❌'}
      </strong>
    </Card>
  );
});

export default BudgetTest;
