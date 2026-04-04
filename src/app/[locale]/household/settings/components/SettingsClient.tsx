"use client";

import { useEffect, useState } from "react";

import dayjs from "dayjs";

import SettingsBudget from "@/components/pages/household/SettingsBudget/SettingsBudget";
import { useStores } from "@/stores/StoreContext";

const SettingsClient = () => {
  const [month, setMonth] = useState(() => dayjs().format("YYYY-MM"));

  const { householdStore, monthlyIncomeStore } = useStores();

  useEffect(() => {
    const load = async () => {
      try {
        await householdStore.loadFromServer();
        await monthlyIncomeStore.loadIncomes();
      } catch {
        // fallback (localStorage već radi)
      }
    };

    load();
  }, [householdStore, monthlyIncomeStore]);

  return (
    <div>
      <SettingsBudget month={month} />
    </div>
  );
};

export default SettingsClient;
