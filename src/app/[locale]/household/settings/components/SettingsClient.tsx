"use client";

import { useEffect, useState } from "react";

import dayjs from "dayjs";

import BudgetDonutChart from "@/components/pages/household/BudgetDonutChart/BudgetDonutChart";
import SettingsBudget from "@/components/pages/household/SettingsBudget/SettingsBudget";
import { useStores } from "@/stores/StoreContext";
import { BudgetPoolType } from "@/types/budget.types";

import styles from "./SettingsClient.module.scss";

const EMPTY_POOLS: Record<BudgetPoolType, number> = {
  [BudgetPoolType.PERSONAL]: 16,
  [BudgetPoolType.BILLS]: 12,
  [BudgetPoolType.TRAVEL]: 23,
  [BudgetPoolType.FOOD]: 15,
  [BudgetPoolType.SAVINGS]: 21,
  [BudgetPoolType.INVESTMENTS]: 13,
};

const SettingsClient = () => {
  const [month] = useState(() => dayjs().format("YYYY-MM"));
  const [activeType, setActiveType] = useState<BudgetPoolType | null>(null);
  const [localPools, setLocalPools] = useState<Record<BudgetPoolType, number>>(EMPTY_POOLS);

  const { householdStore, monthlyIncomeStore, budgetStore } = useStores();

  useEffect(() => {
    const load = async () => {
      try {
        await householdStore.loadFromServer();
        await monthlyIncomeStore.loadIncomes();

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
      } catch {
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
      }
    };

    load();
  }, [budgetStore, householdStore, monthlyIncomeStore, month]);

  return (
    <div className={styles.main}>
      <SettingsBudget
        month={month}
        activeType={activeType}
        localPools={localPools}
        setLocalPools={setLocalPools}
      />

      <BudgetDonutChart
        localPools={localPools}
        activeType={activeType}
        setActiveType={setActiveType}
      />
    </div>
  );
};

export default SettingsClient;
