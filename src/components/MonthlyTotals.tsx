'use client';

import { observer } from 'mobx-react-lite';
import { Card } from 'antd';
import { useStores } from '@/stores/StoreContext';
import { useLocale, useTranslations } from 'next-intl';
import { formatNumber } from '@/lib/format';

interface Props {
  month: string;
}

const MonthlyTotals = observer(({ month }: Props) => {
  const { monthlyIncomeStore } = useStores();
  const locale = useLocale();
  const t = useTranslations('totals');

  const totals = monthlyIncomeStore.getTotalsByMonth(month);

  return (
    <Card style={{ marginTop: '1rem' }}>
      <div>
        {t('personal')}: {formatNumber(totals.personal, locale)}
      </div>
      <div>
        {t('bills')}: {formatNumber(totals.bills, locale)}
      </div>
      <div>
        {t('travel')}: {formatNumber(totals.travel, locale)}
      </div>
      <div>
        {t('food')}: {formatNumber(totals.food, locale)}
      </div>
      <div>
        {t('savings')}: {formatNumber(totals.savings, locale)}
      </div>
    </Card>
  );
});

export default MonthlyTotals;
