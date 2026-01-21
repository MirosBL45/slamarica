'use client';

import { observer } from 'mobx-react-lite';
import { Table, Card } from 'antd';
import { useStores } from '@/stores/StoreContext';
import { useLocale } from 'next-intl';
import { formatNumber } from '@/lib/format';

interface Props {
  month: string; // npr. "2026-01"
}

const MonthlyIncomeList = observer(({ month }: Props) => {
  const { monthlyIncomeStore, membersStore } = useStores();
  const locale = useLocale();

  const data = monthlyIncomeStore.getByMonth(month).map((income) => {
    const member = membersStore.members.find((m) => m.id === income.memberId);

    return {
      key: income.id,
      member: member?.name ?? 'Nepoznat',
      salary: income.salary,
      ...income.breakdown,
    };
  });

  const columns = [
    { title: 'Član', dataIndex: 'member' },
    {
      title: 'Plata',
      dataIndex: 'salary',
      render: (value: number) => formatNumber(value, locale),
    },
    { title: 'Lični', dataIndex: 'personal' },
    { title: 'Računi', dataIndex: 'bills' },
    { title: 'Putovanja', dataIndex: 'travel' },
    { title: 'Hrana', dataIndex: 'food' },
    { title: 'Štednja', dataIndex: 'savings' },
  ];

  return (
    <Card style={{ marginTop: '1rem' }}>
      <Table columns={columns} dataSource={data} pagination={false} />
    </Card>
  );
});

export default MonthlyIncomeList;
