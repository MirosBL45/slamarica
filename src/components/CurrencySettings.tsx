"use client";

import { Select, Card } from "antd";
import { observer } from "mobx-react-lite";
import { useStores } from "@/stores/StoreContext";
import { MoneyCurrency } from "@/stores/household/household.types";

const CurrencySettings = observer(() => {
  const { householdStore } = useStores();

  const currency = householdStore.activeHousehold?.currency;

  return (
    <Card style={{ marginBottom: "1rem" }}>
      <Select
        value={currency}
        style={{ width: 200 }}
        onChange={(value) => householdStore.setCurrency(value)}
        disabled={householdStore.currencyLocked}
        options={[
          { value: MoneyCurrency.RSD, label: "Dinar (RSD)" },
          { value: MoneyCurrency.EUR, label: "Euro (EUR)" },
          { value: MoneyCurrency.USD, label: "Dollar (USD)" },
        ]}
      />
    </Card>
  );
});

export default CurrencySettings;
