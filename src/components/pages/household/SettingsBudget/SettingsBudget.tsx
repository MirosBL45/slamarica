"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { Button, Card, InputNumber, Slider } from "antd";
import { observer } from "mobx-react-lite";

import { useStores } from "@/stores/StoreContext";
import { BudgetPoolType } from "@/types/budget.types";

import styles from "./SettingsBudget.module.scss";

interface Props {
  month: string;
}

const SettingsBudget = observer(({ month }: Props) => {
  const { budgetStore, monthlyIncomeStore } = useStores();
  const t = useTranslations("budget");

  const isLocked = monthlyIncomeStore.getByMonth(month).length > 0;

  // 🔥 lokalni state (više nema spam API poziva)
  const [localPools, setLocalPools] = useState<Record<BudgetPoolType, number>>({
    [BudgetPoolType.PERSONAL]: 0,
    [BudgetPoolType.BILLS]: 0,
    [BudgetPoolType.TRAVEL]: 0,
    [BudgetPoolType.FOOD]: 0,
    [BudgetPoolType.SAVINGS]: 0,
    [BudgetPoolType.INVESTMENTS]: 0,
  });

  useEffect(() => {
    budgetStore.initMonth(month);

    const pools = budgetStore.getPools(month);

    const initial: Record<BudgetPoolType, number> = {
      [BudgetPoolType.PERSONAL]: 0,
      [BudgetPoolType.BILLS]: 0,
      [BudgetPoolType.TRAVEL]: 0,
      [BudgetPoolType.FOOD]: 0,
      [BudgetPoolType.SAVINGS]: 0,
      [BudgetPoolType.INVESTMENTS]: 0,
    };

    pools.forEach((p) => {
      initial[p.type] = p.percentage;
    });

    setLocalPools(initial);
  }, [budgetStore, month]);

  const handleChange = (type: BudgetPoolType, value: number) => {
    setLocalPools((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const total = Object.values(localPools).reduce((a, b) => a + b, 0);

  const handleSave = async () => {
    await budgetStore.setAllPercentages(month, localPools);
  };

  return (
    <div className={styles.wrapper}>
      <Card className={styles.card}>
        <div className={styles.header}>
          <h3>{t("title")}</h3>
        </div>

        <div className={styles.list}>
          {Object.entries(localPools).map(([type, value]) => (
            <div key={type} className={styles.row}>
              <div className={styles.rowTop}>
                <span>{t(type)}</span>
                <span className={styles.percent}>{value}%</span>
              </div>

              <div className={styles.controls}>
                <Slider
                  min={0}
                  max={100}
                  value={value}
                  disabled={isLocked}
                  onChange={(val) => handleChange(type as BudgetPoolType, val as number)}
                  className={styles.slider}
                />

                <InputNumber
                  min={0}
                  max={100}
                  value={value}
                  disabled={isLocked}
                  onChange={(val) => handleChange(type as BudgetPoolType, Number(val ?? 0))}
                  className={styles.input}
                />
              </div>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <div className={`${styles.total} ${total !== 100 ? styles.error : ""}`}>
            {t("total")}: {total}%
          </div>

          {!isLocked && (
            <Button type="primary" disabled={total !== 100} onClick={handleSave}>
              Sačuvaj
            </Button>
          )}
        </div>

        {isLocked && <div className={styles.locked}>{t("locked")}</div>}
      </Card>
    </div>
  );
});

export default SettingsBudget;
