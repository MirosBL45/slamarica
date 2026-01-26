import AddMemberForm from '@/components/AddMemberForm';
import MemberList from '@/components/MemberList';
import { getTranslations } from 'next-intl/server';

export default async function HouseholdSettings() {
  const t = await getTranslations('settings');

  return (
    <div style={{ padding: '1rem' }}>
      <h1>{t('title')}</h1>

      <AddMemberForm />
      <MemberList />
    </div>
  );
}
