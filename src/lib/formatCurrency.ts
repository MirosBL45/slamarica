import { MoneyCurrency } from "@/stores/household/household.types";

export function formatCurrency(
  value: number,
  locale: string,
  currency: MoneyCurrency
) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
}
