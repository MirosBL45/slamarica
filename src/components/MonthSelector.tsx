'use client';

import { DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useLocale } from 'next-intl';

interface Props {
  value: string; // "YYYY-MM"
  onChange: (month: string) => void;
}

export default function MonthSelector({ value, onChange }: Props) {
  const locale = useLocale();

  const format = locale === 'sr' ? 'MM-YYYY' : 'YYYY-MM';

  const handleChange = (date: Dayjs | null) => {
    if (!date) return;
    onChange(date.format('YYYY-MM')); // interno UVEK isto
  };

  return (
    <DatePicker
      picker="month"
      value={dayjs(value)}
      onChange={handleChange}
      format={format}
      style={{ marginBottom: '1rem' }}
    />
  );
}
