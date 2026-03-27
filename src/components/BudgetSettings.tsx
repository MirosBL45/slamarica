"use client";

import { observer } from "mobx-react-lite";
import { Card, InputNumber, Row, Col } from "antd";
import { useStores } from "@/stores/StoreContext";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

interface Props {
  month: string;
}

const BudgetSettings = observer(({ month }: Props) => {
  const { budgetStore, monthlyIncomeStore } = useStores();
  const t = useTranslations("budget");

  // 🔒 zaključano ako već postoji bar jedna plata za taj mesec
  const isLocked = monthlyIncomeStore.getByMonth(month).length > 0;

  useEffect(() => {
    budgetStore.initMonth(month);
  }, [budgetStore, month]);

  // 📦 procenti za taj mesec
  const pools = budgetStore.getPools(month);

  return (
    <Card style={{ marginBottom: "1rem" }}>
      <h3>{t("title")}</h3>

      {pools.map((pool) => (
        <Row key={pool.type} gutter={16} style={{ marginBottom: "0.5rem" }}>
          <Col span={16}>{t(pool.type)}</Col>
          <Col span={8}>
            <InputNumber
              min={0}
              max={100}
              value={pool.percentage}
              disabled={isLocked}
              onChange={(value) => budgetStore.setPercentage(month, pool.type, Number(value ?? 0))}
              style={{ width: "100%" }}
            />
          </Col>
        </Row>
      ))}

      <div style={{ marginTop: "0.5rem", fontWeight: 500 }}>
        {t("total")}: {budgetStore.getTotalPercentage(month)}%
      </div>

      {isLocked && <div style={{ marginTop: "0.5rem", color: "#b94a48" }}>{t("locked")}</div>}
    </Card>
  );
});

export default BudgetSettings;
