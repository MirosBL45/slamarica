'use client';

import { DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/sr';
import 'dayjs/locale/en';
import { useLocale, useTranslations } from 'next-intl';

interface Props {
  value: string;
  onChange: (month: string) => void;
}

export default function MonthSelector({ value, onChange }: Props) {
  const locale = useLocale();
  const t = useTranslations('month');

  dayjs.locale(locale);

  const handleChange = (date: Dayjs | null) => {
    if (!date) return;
    onChange(date.format('YYYY-MM')); // interno UVEK isto
  };

  return (
    <DatePicker
      picker="month"
      value={dayjs(value)}
      onChange={handleChange}
      placeholder={t('selectMonth')}
      format={locale === 'sr' ? 'MM-YYYY' : 'YYYY-MM'}
      style={{ marginBottom: '1rem' }}
    />
  );
}
