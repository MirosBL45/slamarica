'use client';

import { observer } from 'mobx-react-lite';
import { Table, Button, Card } from 'antd';
import { useStores } from '@/stores/StoreContext';

const MemberList = observer(() => {
  const { membersStore, monthlyIncomeStore } = useStores();

  const data = membersStore.members.map((member) => ({
    key: member.id,
    name: member.name,
    id: member.id,
  }));

  const columns = [
    {
      title: 'Ime',
      dataIndex: 'name',
    },
    {
      title: 'Akcije',
      render: (_: any, record: any) => {
        const hasIncome = monthlyIncomeStore.hasIncomeForMember(record.id);

        return (
          <Button
            danger
            size="small"
            disabled={hasIncome}
            onClick={() => membersStore.removeMember(record.id, hasIncome)}
          >
            Obriši
          </Button>
        );
      },
    },
  ];

  return (
    <Card style={{ marginBottom: '1rem' }}>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        locale={{ emptyText: 'Nema članova' }}
      />
    </Card>
  );
});

export default MemberList;
