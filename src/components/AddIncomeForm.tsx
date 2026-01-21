'use client';

import { observer } from 'mobx-react-lite';
import { Form, Select, InputNumber, Button, Card } from 'antd';
import dayjs from 'dayjs';

import { useStores } from '@/stores/StoreContext';

interface IFormValues {
  memberId: string;
  month: string; // YYYY-MM
  salary: number;
}

const AddIncomeForm = observer(() => {
  const { membersStore, budgetStore, monthlyIncomeStore } = useStores();
  const [form] = Form.useForm<IFormValues>();

  const onFinish = (values: IFormValues) => {
    monthlyIncomeStore.createIncome(
      values.memberId,
      values.month,
      values.salary,
      budgetStore,
    );

    form.resetFields(['salary']);
  };

  return (
    <Card style={{ maxWidth: 420 }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          month: dayjs().format('YYYY-MM'),
        }}
      >
        <Form.Item
          label="Član"
          name="memberId"
          rules={[{ required: true, message: 'Izaberi člana' }]}
        >
          <Select
            placeholder="Izaberi člana"
            options={membersStore.members.map((m) => ({
              label: m.name,
              value: m.id,
            }))}
          />
        </Form.Item>

        <Form.Item
          label="Mesec"
          name="month"
          rules={[{ required: true, message: 'Unesi mesec' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            placeholder="YYYY-MM"
            stringMode
          />
        </Form.Item>

        <Form.Item
          label="Plata"
          name="salary"
          rules={[
            { required: true, message: 'Unesi iznos' },
            { type: 'number', min: 1, message: 'Mora biti veće od 0' },
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
          Dodaj platu
        </Button>

        {!budgetStore.isValid && (
          <div style={{ marginTop: '0.5rem', color: '#b94a48' }}>
            Procenti moraju biti 100%
          </div>
        )}
      </Form>
    </Card>
  );
});

export default AddIncomeForm;
