"use client";

import { observer } from "mobx-react-lite";
import { Form, Select, InputNumber, Button, Card } from "antd";
import { useLocale, useTranslations } from "next-intl";

import { useStores } from "@/stores/StoreContext";
import { formatNumber } from "@/utils/helpers/formatNumber";
import { MemberStatus } from "@/types/member.types";

interface Props {
  month: string;
}

interface IFormValues {
  memberId: string;
  salary: number;
}

const AddIncomeForm = observer(({ month }: Props) => {
  const t = useTranslations("income");
  const { membersStore, budgetStore, monthlyIncomeStore } = useStores();
  const [form] = Form.useForm<IFormValues>();
  const locale = useLocale();

  const onFinish = async (values: IFormValues) => {
    try {
      await monthlyIncomeStore.createIncome(values.memberId, month, values.salary, budgetStore);

      form.resetFields();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Something went wrong";

      form.setFields([
        {
          name: "memberId",
          errors: [t("duplicate")],
        },
      ]);

      alert(message);
    }
  };

  return (
    <Card style={{ maxWidth: 420 }}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label={t("member")}
          name="memberId"
          rules={[{ required: true, message: t("selectMember") }]}
        >
          <Select
            placeholder={t("selectMember")}
            notFoundContent={t("noMembers")}
            options={membersStore.members
              .filter((m) => m.status === MemberStatus.ACTIVE)
              .map((m) => ({
                label: m.name,
                value: m.id,
              }))}
          />
        </Form.Item>

        <Form.Item
          label={t("salary")}
          name="salary"
          rules={[
            { required: true, message: t("salaryRequired") },
            {
              validator: (_, value) => {
                if (typeof value !== "number" || Number.isNaN(value)) {
                  return Promise.reject(t("salaryMustBeNumber"));
                }
                if (value <= 0) {
                  return Promise.reject(t("salaryMustBePositive"));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            inputMode="numeric"
            min={0}
            step={1000}
            parser={(value) => {
              const onlyDigits = (value || "").replace(/[^\d]/g, "");
              return Number(onlyDigits || 0);
            }}
            formatter={(value) => {
              if (value == null) return "";
              return formatNumber(Number(value), locale);
            }}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" block disabled={!budgetStore.isValid(month)}>
          {t("addIncome")}
        </Button>

        {!budgetStore.isValid(month) && (
          <div style={{ marginTop: "0.5rem", color: "#b94a48" }}>{t("percentageError")}</div>
        )}
      </Form>
    </Card>
  );
});

export default AddIncomeForm;
