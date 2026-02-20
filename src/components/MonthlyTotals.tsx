'use client';

import { observer } from 'mobx-react-lite';
import { Card } from 'antd';
import { useStores } from '@/stores/StoreContext';
import { useLocale, useTranslations } from 'next-intl';
import { formatCurrency } from '@/lib/formatCurrency';
import { MoneyCurrency } from '@/stores/household/household.types';

interface Props {
  month: string;
}

const MonthlyTotals = observer(({ month }: Props) => {
  const { monthlyIncomeStore, householdStore } = useStores();

  const currency =
    householdStore.activeHousehold?.currency ?? MoneyCurrency.RSD;

  const locale = useLocale();
  const t = useTranslations('totals');

  const totals = monthlyIncomeStore.getTotalsByMonth(month);

  return (
    <Card style={{ marginTop: '1rem' }}>
      <div>
        {t('personal')}: {formatCurrency(totals.personal, locale, currency)}
      </div>
      <div>
        {t('bills')}: {formatCurrency(totals.bills, locale, currency)}
      </div>
      <div>
        {t('travel')}: {formatCurrency(totals.travel, locale, currency)}
      </div>
      <div>
        {t('food')}: {formatCurrency(totals.food, locale, currency)}
      </div>
      <div>
        {t('savings')}: {formatCurrency(totals.savings, locale, currency)}
      </div>
      <div>
        {t('investments')}:{' '}
        {formatCurrency(totals.investments, locale, currency)}
      </div>
    </Card>
  );
});

export default MonthlyTotals;
