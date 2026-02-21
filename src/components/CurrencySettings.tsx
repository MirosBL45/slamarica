"use client";

import { Select, Card } from "antd";
import { observer } from "mobx-react-lite";
import { useStores } from "@/stores/StoreContext";
import { MoneyCurrency } from "@/stores/household/household.types";
import { BaseHasPermission } from "@/components/BaseHasPermission";

const CurrencySettings = observer(() => {
  const { householdStore, membersStore } = useStores();

  const currency = householdStore.activeHousehold?.currency;

  const activeUserId = membersStore.members[0]?.id;
  console.log(activeUserId);

  return (
    <Card style={{ marginBottom: "1rem" }}>
      <BaseHasPermission permission={membersStore.isAdmin(activeUserId)}>
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
      </BaseHasPermission>
    </Card>
  );
});

export default CurrencySettings;
