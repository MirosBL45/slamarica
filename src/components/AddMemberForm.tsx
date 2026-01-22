'use client';

import { observer } from 'mobx-react-lite';
import { Form, Input, Button, Card } from 'antd';
import { useTranslations } from 'next-intl';
import { useStores } from '@/stores/StoreContext';

interface IFormValues {
  name: string;
}

const AddMemberForm = observer(() => {
  const t = useTranslations('members');
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
          label={t('name')}
          name="name"
          rules={[
            { required: true, message: t('enterName') },
            { min: 2, message: t('minLength') },
          ]}
        >
          <Input placeholder={t('placeholder')} />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          {t('addMember')}
        </Button>
      </Form>
    </Card>
  );
});

export default AddMemberForm;
