'use client';

import { observer } from 'mobx-react-lite';
import { Card } from 'antd';
import { useStores } from '@/stores/StoreContext';
import { useLocale } from 'next-intl';
import { formatNumber } from '@/lib/format';

interface Props {
  month: string;
}

const MonthlyTotals = observer(({ month }: Props) => {
  const { monthlyIncomeStore } = useStores();
  const locale = useLocale();

  const totals = monthlyIncomeStore.getTotalsByMonth(month);

  return (
    <Card style={{ marginTop: '1rem' }}>
      <div>Lični: {formatNumber(totals.personal, locale)}</div>
      <div>Računi: {formatNumber(totals.bills, locale)}</div>
      <div>Putovanja: {formatNumber(totals.travel, locale)}</div>
      <div>Hrana: {formatNumber(totals.food, locale)}</div>
      <div>Štednja: {formatNumber(totals.savings, locale)}</div>
    </Card>
  );
});

export default MonthlyTotals;
