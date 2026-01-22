'use client';

import { observer } from 'mobx-react-lite';
import { Form, Select, InputNumber, Button, Card } from 'antd';
import { useTranslations } from 'next-intl';

import { useStores } from '@/stores/StoreContext';

interface Props {
  month: string;
}

interface IFormValues {
  memberId: string;
  salary: number;
}

const AddIncomeForm = observer(({ month }: Props) => {
  const t = useTranslations('income');
  const { membersStore, budgetStore, monthlyIncomeStore } = useStores();
  const [form] = Form.useForm<IFormValues>();

  const onFinish = (values: IFormValues) => {
    try {
      monthlyIncomeStore.createIncome(
        values.memberId,
        month,
        values.salary,
        budgetStore,
      );

      form.resetFields(['salary']);
    } catch (error) {
      form.setFields([
        {
          name: 'memberId',
          errors: [t('duplicate')],
        },
      ]);
    }
  };

  return (
    <Card style={{ maxWidth: 420 }}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label={t('member')}
          name="memberId"
          rules={[{ required: true, message: t('selectMember') }]}
        >
          <Select
            placeholder={t('selectMember')}
            options={membersStore.members.map((m) => ({
              label: m.name,
              value: m.id,
            }))}
          />
        </Form.Item>

        <Form.Item
          label={t('salary')}
          name="salary"
          rules={[
            { required: true, message: t('enterAmount') },
            { type: 'number', min: 1, message: t('greaterThanZero') },
          ]}
        >
          <InputNumber style={{ width: '100%' }} min={0} step={1000} />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          block
          disabled={!budgetStore.isValid}
        >
          {t('addIncome')}
        </Button>

        {!budgetStore.isValid && (
          <div style={{ marginTop: '0.5rem', color: '#b94a48' }}>
            {t('percentageError')}
          </div>
        )}
      </Form>
    </Card>
  );
});

export default AddIncomeForm;
