import TextLangComp from '@/components/TextLangComp';

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
    </div>
  );
}
