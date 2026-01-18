import TextLangComp from '@/components/TextLangComp';
import TestIncome from '@/components/TestIncome';

export default async function Household({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div>
      <p>Household page</p>
      <TextLangComp locale={locale} />
      <p>ispod ide</p>
      <TestIncome />
    </div>
  );
}
