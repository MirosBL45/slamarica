'use client';

import { observer } from 'mobx-react-lite';
import { Form, Input, Button, Card } from 'antd';
import { useStores } from '@/stores/StoreContext';

interface IFormValues {
  name: string;
}

const AddMemberForm = observer(() => {
  const { membersStore } = useStores();
  const [form] = Form.useForm<IFormValues>();

  const onFinish = (values: IFormValues) => {
    membersStore.addMember({
      id: crypto.randomUUID(),
      name: values.name.trim(),
    });

    form.resetFields();
  };

  return (
    <Card style={{ maxWidth: 420, marginBottom: '1rem' }}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Ime člana"
          name="name"
          rules={[
            { required: true, message: 'Unesi ime člana' },
            { min: 2, message: 'Ime mora imati bar 2 slova' },
          ]}
        >
          <Input placeholder="Unesi ime" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Dodaj člana
        </Button>
      </Form>
    </Card>
  );
});

export default AddMemberForm;
