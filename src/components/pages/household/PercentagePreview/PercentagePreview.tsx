"use client";

import { useParams } from "next/navigation";

import { observer } from "mobx-react-lite";

import ActionLink from "@/components/ui/ActionButtons/ActionLink";
import ContainerCard from "@/components/ui/ContainerCard/ContainerCard";
import { useStores } from "@/stores/StoreContext";

import styles from "./PercentagePreview.module.scss";

interface Props {
  month: string;
}

const PercentagePreview = observer(({ month }: Props) => {
  const { budgetStore } = useStores();
  const { locale } = useParams<{ locale: string }>();

  const pools = budgetStore.getPools(month);

  return (
    <ContainerCard className={styles.card}>
      <div className={styles.header}>
        <h3>Monthly distribution</h3>

        <ActionLink href={`/${locale}/household/settings`} variant="primary">
          Edit
        </ActionLink>
      </div>

      <div className={styles.pools}>
        {pools.map((p) => (
          <div key={p.type} className={styles.pool}>
            <span className={styles.label}>{p.label}</span>
            <span className={styles.value}>{p.percentage}%</span>
          </div>
        ))}
      </div>
    </ContainerCard>
  );
});

export default PercentagePreview;
