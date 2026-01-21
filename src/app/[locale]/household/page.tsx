import TextLangComp from '@/components/TextLangComp';
import AddIncomeForm from '@/components/AddIncomeForm';

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
      <p>ispod ide ovoo</p>
      <AddIncomeForm />
    </div>
  );
}
