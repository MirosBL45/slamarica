'use client';

import { observer } from 'mobx-react-lite';
import { Table, Card } from 'antd';
import { useStores } from '@/stores/StoreContext';
import { useLocale, useTranslations } from 'next-intl';
import { formatCurrency } from '@/lib/formatCurrency';
import { MoneyCurrency } from '@/stores/household/household.types';

interface Props {
  month: string;
}

const MonthlyIncomeList = observer(({ month }: Props) => {
  const { monthlyIncomeStore, membersStore, householdStore } = useStores();

  const currency =
    householdStore.activeHousehold?.currency ?? MoneyCurrency.RSD;

  const locale = useLocale();
  const t = useTranslations('incomeTable');

  const data = monthlyIncomeStore.getByMonth(month).map((income) => {
    const member = membersStore.members.find((m) => m.id === income.memberId);

    return {
      key: income.id,
      member: member?.name ?? t('unknown'),
      salary: income.salary,
      personal: income.breakdown.personal,
      bills: income.breakdown.bills,
      travel: income.breakdown.travel,
      food: income.breakdown.food,
      savings: income.breakdown.savings,
      investments: income.breakdown.investments,
    };
  });

  const columns = [
    { title: t('member'), dataIndex: 'member' },
    {
      title: t('salary'),
      dataIndex: 'salary',
      render: (value: number) => formatCurrency(value, locale, currency),
    },
    {
      title: t('personal'),
      dataIndex: 'personal',
      render: (value: number) => formatCurrency(value, locale, currency),
    },
    {
      title: t('bills'),
      dataIndex: 'bills',
      render: (value: number) => formatCurrency(value, locale, currency),
    },
    {
      title: t('travel'),
      dataIndex: 'travel',
      render: (value: number) => formatCurrency(value, locale, currency),
    },
    {
      title: t('food'),
      dataIndex: 'food',
      render: (value: number) => formatCurrency(value, locale, currency),
    },
    {
      title: t('savings'),
      dataIndex: 'savings',
      render: (value: number) => formatCurrency(value, locale, currency),
    },
    {
      title: t('investments'),
      dataIndex: 'investments',
      render: (value: number) => formatCurrency(value, locale, currency),
    },
  ];

  return (
    <Card style={{ marginTop: '1rem' }}>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        locale={{ emptyText: t('empty') }}
      />
    </Card>
  );
});

export default MonthlyIncomeList;
