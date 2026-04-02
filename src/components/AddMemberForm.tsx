"use client";

import { useTranslations } from "next-intl";

import { Button, Card, Form, Input } from "antd";
import { observer } from "mobx-react-lite";

import { useStores } from "@/stores/StoreContext";

interface IFormValues {
  name: string;
}

const AddMemberForm = observer(() => {
  const t = useTranslations("members");
  const { membersStore } = useStores();
  const [form] = Form.useForm<IFormValues>();

  const onFinish = (values: IFormValues) => {
    try {
      membersStore.addMember(values.name.trim());

      if (!values.name.trim()) return;

      form.resetFields();
    } catch (error) {
      form.setFields([
        {
          name: "name",
          errors: [t("duplicate")],
        },
      ]);
      alert(error);
    }
  };

  return (
    <Card style={{ maxWidth: 420, marginBottom: "1rem" }}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label={t("name")}
          name="name"
          rules={[
            { required: true, message: t("enterName") },
            { min: 2, message: t("minLength") },
          ]}
        >
          <Input placeholder={t("placeholder")} />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          {t("addMember")}
        </Button>
      </Form>
    </Card>
  );
});

export default AddMemberForm;
