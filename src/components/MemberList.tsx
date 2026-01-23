'use client';

import { observer } from 'mobx-react-lite';
import { Table, Button, Card, Tag, Modal } from 'antd';
import { useTranslations } from 'next-intl';
import { useStores } from '@/stores/StoreContext';

const MemberList = observer(() => {
  const t = useTranslations('members');
  const { membersStore, monthlyIncomeStore } = useStores();

  const data = membersStore.members.map((member) => ({
    key: member.id,
    name: member.name,
    id: member.id,
    status: member.status,
  }));

  const columns = [
    {
      title: t('name'),
      dataIndex: 'name',
      render: (value: string, record: any) => (
        <span
          style={{
            opacity: record.status === 'inactive' ? 0.6 : 1,
          }}
        >
          {value}
        </span>
      ),
    },
    {
      title: t('status'),
      dataIndex: 'status',
      render: (status: string) =>
        status === 'active' ? (
          <Tag color="green">{t('active')}</Tag>
        ) : (
          <Tag color="red">{t('inactive')}</Tag>
        ),
    },
    {
      title: t('actions'),
      render: (_: any, record: any) => {
        const hasIncome = monthlyIncomeStore.hasIncomeForMember(record.id);

        return (
          <Button
            danger
            size="small"
            onClick={() => {
              const hasIncome = monthlyIncomeStore.hasIncomeForMember(
                record.id,
              );

              Modal.confirm({
                title: hasIncome
                  ? t('confirmInactiveTitle')
                  : t('confirmDeleteTitle'),
                content: hasIncome
                  ? t('confirmInactiveText')
                  : t('confirmDeleteText'),
                okText: hasIncome ? t('setInactive') : t('delete'),
                cancelText: t('cancel'),
                onOk: () => {
                  membersStore.removeMember(record.id, hasIncome);
                },
              });
            }}
          >
            {t('delete')}
          </Button>
        );
      },
    },
  ];

  return (
    <Card style={{ marginBottom: '1rem' }}>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        locale={{ emptyText: t('empty') }}
      />
    </Card>
  );
});

export default MemberList;
