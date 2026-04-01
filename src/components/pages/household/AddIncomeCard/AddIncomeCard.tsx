"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

// import dayjs from "dayjs";
import { observer } from "mobx-react-lite";

import { ActionButton } from "@/components/ui";
import ContainerCard from "@/components/ui/ContainerCard/ContainerCard";
import { useStores } from "@/stores/StoreContext";
import { formatNumber } from "@/utils/helpers/formatNumber";
import { MemberStatus } from "@/types/member.types";

import styles from "./AddIncomeCard.module.scss";

interface Props {
  month: string;
  onMonthChange: (m: string) => void;
}

const AddIncomeCard = observer(({ month, onMonthChange }: Props) => {
  const { membersStore, budgetStore, monthlyIncomeStore } = useStores();

  const t = useTranslations("income");
  const locale = useLocale();

  const [memberId, setMemberId] = useState("");
  const [salary, setSalary] = useState<number | null>(null);
  const [error, setError] = useState("");

  const isLocked = budgetStore.isLocked(month);

  const handleSubmit = async () => {
    setError("");

    if (!salary || salary <= 0) {
      setError(t("salaryMustBePositive") || "Invalid salary");
      return;
    }

    try {
      await monthlyIncomeStore.createIncome(memberId, month, salary, budgetStore);

      setSalary(null);
      setMemberId("");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Error";
      setError(message);
      alert(message);
    }
  };

  return (
    <ContainerCard className={styles.card}>
      {/* HEADER */}
      <div className={styles.header}>
        <h3>{t("addIncome")}</h3>

        <input
          type="month"
          value={month}
          onChange={(e) => onMonthChange(e.target.value)}
          className={styles.month}
          disabled={isLocked}
        />
      </div>

      {/* FORM */}
      <div className={styles.form}>
        {/* MEMBER */}
        <div className={styles.selectWrapper}>
          <label>* {t("member")}</label>

          <select
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            className={styles.select}
            disabled={isLocked}
          >
            <option value="">{t("selectMember")}</option>

            {membersStore.members
              .filter((m) => m.status === MemberStatus.ACTIVE)
              .map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
          </select>
        </div>

        {/* SALARY */}
        <div className={styles.inputWrapper}>
          <label>* {t("salary")}</label>

          <input
            type="text"
            value={salary !== null ? formatNumber(salary, locale) : ""}
            onChange={(e) => {
              const onlyDigits = e.target.value.replace(/[^\d]/g, "");
              setSalary(Number(onlyDigits || 0));
            }}
            className={styles.input}
            disabled={isLocked}
          />
        </div>

        {/* BUTTON */}
        <ActionButton
          onClick={handleSubmit}
          disabled={!memberId || !salary || !budgetStore.isValid(month) || isLocked}
        >
          + {t("addIncome")}
        </ActionButton>

        {/* ERRORS */}
        {!budgetStore.isValid(month) && <p className={styles.error}>{t("percentageError")}</p>}

        {isLocked && <p className={styles.error}>{t("monthLocked") || "Month is locked"}</p>}

        {error && <p className={styles.error}>{error}</p>}
      </div>
    </ContainerCard>
  );
});

export default AddIncomeCard;
