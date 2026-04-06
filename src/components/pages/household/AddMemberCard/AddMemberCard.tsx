"use client";

import { useTranslations } from "next-intl";

import { Form, Input, Select } from "antd";
import { observer } from "mobx-react-lite";

import { BaseHasPermission } from "@/components/BaseHasPermission";
import ActionButton from "@/components/ui/ActionButtons/ActionButton";
import ContainerCard from "@/components/ui/ContainerCard/ContainerCard";
import { useStores } from "@/stores/StoreContext";
import { MoneyCurrency } from "@/types/household.types";

import styles from "./AddMemberCard.module.scss";

interface IFormValues {
  name: string;
}

const AddMemberCard = observer(() => {
  const t = useTranslations("members");

  const { membersStore, householdStore } = useStores();

  const [form] = Form.useForm<IFormValues>();

  const currency = householdStore.activeHousehold?.currency;
  const activeUserId = membersStore.members[0]?.id;

  const onFinish = (values: IFormValues) => {
    try {
      const trimmed = values.name.trim();

      if (!trimmed) return;

      membersStore.addMember(trimmed);

      form.resetFields();
    } catch {
      form.setFields([
        {
          name: "name",
          errors: [t("duplicate")],
        },
      ]);
    }
  };

  return (
    <ContainerCard className={styles.card}>
      {/* HEADER */}
      <div className={styles.header}>
        <h3>{t("addMember")}</h3>

        <BaseHasPermission permission={membersStore.isAdmin(activeUserId)}>
          <Select
            value={currency}
            onChange={(value) => householdStore.setCurrency(value)}
            disabled={!!householdStore.activeHousehold?.currencyLocked}
            className={styles.currency}
            options={[
              { value: MoneyCurrency.RSD, label: "RSD" },
              { value: MoneyCurrency.EUR, label: "EUR" },
              { value: MoneyCurrency.USD, label: "USD" },
            ]}
          />
        </BaseHasPermission>
      </div>

      {/* FORM */}
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label={t("name")}
          name="name"
          rules={[
            { required: true, message: t("enterName") },
            { min: 2, message: t("minLength") },
          ]}
        >
          <Input placeholder={t("placeholder")} className={styles.input} />
        </Form.Item>

        {/* 🔥 BITNO - OVO REŠAVA PROBLEM */}
        <Form.Item shouldUpdate>
          {() => {
            const value = form.getFieldValue("name");

            return (
              <ActionButton
                onClick={() => form.submit()}
                disabled={!value || value.trim().length < 2}
              >
                + {t("addMember")}
              </ActionButton>
            );
          }}
        </Form.Item>
      </Form>
    </ContainerCard>
  );
});

export default AddMemberCard;
