'use client';

import { observer } from 'mobx-react-lite';
import { useStores } from '@/stores/StoreContext';
import { Button } from 'antd';

const TestPage = observer(() => {
  const { householdStore, membersStore } = useStores();

  return (
    <div style={{ padding: '1rem' }}>
      <Button
        onClick={() =>
          householdStore.setHousehold({
            id: '1',
            name: 'Topli dom',
          })
        }
      >
        Postavi kuću
      </Button>

      <Button
        style={{ marginLeft: '1rem' }}
        onClick={() =>
          membersStore.addMember({
            id: crypto.randomUUID(),
            name: 'Pera',
          })
        }
      >
        Dodaj člana
      </Button>

      <pre>{JSON.stringify(householdStore.household, null, 2)}</pre>
      <pre>{JSON.stringify(membersStore.members, null, 2)}</pre>
    </div>
  );
});

export default TestPage;
