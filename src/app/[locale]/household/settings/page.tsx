import AddMemberForm from '@/components/AddMemberForm';
import MemberList from '@/components/MemberList';
import { getTranslations } from 'next-intl/server';

export default async function HouseholdSettings({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: 'settings',
  });

  return (
    <div style={{ padding: '1rem' }}>
      <h1>{t('title')}</h1>

      <AddMemberForm />
      <MemberList />
    </div>
  );
}
