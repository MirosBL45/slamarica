"use client";

import { useTranslations } from "next-intl";

import { Button, Card, InputNumber, Slider } from "antd";
import { observer } from "mobx-react-lite";

import { useStores } from "@/stores/StoreContext";
import { BudgetPoolType } from "@/types/budget.types";

import styles from "./SettingsBudget.module.scss";

interface Props {
  month: string;
  activeType: BudgetPoolType | null;
  localPools: Record<BudgetPoolType, number>;
  setLocalPools: React.Dispatch<
    React.SetStateAction<Record<BudgetPoolType, number>>
  >;
}

const SettingsBudget = observer(
  ({ month, activeType, localPools, setLocalPools }: Props) => {
    const { budgetStore, monthlyIncomeStore } = useStores();
    const t = useTranslations("budget");

    const isLocked = monthlyIncomeStore.getByMonth(month).length > 0;

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
              <div
                key={type}
                className={`${styles.row} ${
                  activeType === type ? styles.activeRow : ""
                }`}
              >
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
                    onChange={(val) =>
                      handleChange(type as BudgetPoolType, val as number)
                    }
                    className={`${styles.slider} ${
                      styles[type as BudgetPoolType]
                    }`}
                  />

                  <InputNumber
                    min={0}
                    max={100}
                    value={value}
                    disabled={isLocked}
                    onChange={(val) =>
                      handleChange(type as BudgetPoolType, Number(val ?? 0))
                    }
                    className={styles.input}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className={styles.footer}>
            <div
              className={`${styles.total} ${total !== 100 ? styles.error : ""}`}
            >
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
  }
);

export default SettingsBudget;