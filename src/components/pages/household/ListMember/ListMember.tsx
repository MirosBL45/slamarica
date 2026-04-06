"use client";

import { useTranslations } from "next-intl";

import { Modal } from "antd";
import { observer } from "mobx-react-lite";

import ActionButton from "@/components/ui/ActionButtons/ActionButton";
import ContainerCard from "@/components/ui/ContainerCard/ContainerCard";
import { useStores } from "@/stores/StoreContext";
import { MemberStatus } from "@/types/member.types";

import styles from "./ListMember.module.scss";

interface ITableMember {
  id: string;
  name: string;
  status: MemberStatus;
  hasIncome: boolean;
}

const ListMember = observer(() => {
  const t = useTranslations("members");
  const { membersStore, monthlyIncomeStore } = useStores();

  const data: ITableMember[] = membersStore.members.map((member) => ({
    id: member.id,
    name: member.name,
    status: member.status,
    hasIncome: monthlyIncomeStore.hasIncomeForMember(member.id),
  }));

  return (
    <ContainerCard className={styles.card}>
      <h3 className={styles.title}>Household Members</h3>

      {/* HEADER */}
      <div className={styles.headerRow}>
        <span>{t("name")}</span>
        <span>{t("role")}</span>
        <span>{t("status")}</span>
        <span>{t("actions")}</span>
      </div>

      {/* ROWS */}
      <div className={styles.list}>
        {data.length === 0 && <div className={styles.empty}>{t("empty")}</div>}

        {data.map((member) => {
          const isInactive = member.status === MemberStatus.INACTIVE;

          return (
            <div key={member.id} className={`${styles.row} ${isInactive ? styles.inactive : ""}`}>
              {/* NAME */}
              <div className={styles.name}>{member.name}</div>

              {/* ROLE */}
              <div className={styles.role}>Member</div>

              {/* STATUS */}
              <div className={styles.status}>
                <span
                  className={`${styles.badge} ${
                    isInactive ? styles.inactiveBadge : styles.activeBadge
                  }`}
                >
                  {isInactive ? t("inactive") : t("active")}
                </span>
              </div>

              {/* ACTIONS */}
              <div className={styles.actions}>
                {isInactive ? (
                  <ActionButton
                    onClick={() => {
                      Modal.confirm({
                        title: t("confirmRestoreTitle"),
                        content: t("confirmRestoreText"),
                        okText: t("restore"),
                        cancelText: t("cancel"),
                        onOk: () => {
                          membersStore.restoreMember(member.id);
                        },
                      });
                    }}
                  >
                    {t("restore")}
                  </ActionButton>
                ) : (
                  <ActionButton
                    variant="outline"
                    onClick={() => {
                      Modal.confirm({
                        title: member.hasIncome
                          ? t("confirmInactiveTitle")
                          : t("confirmDeleteTitle"),
                        content: member.hasIncome
                          ? t("confirmInactiveText")
                          : t("confirmDeleteText"),
                        okText: member.hasIncome ? t("setInactive") : t("delete"),
                        cancelText: t("cancel"),
                        onOk: () => {
                          membersStore.removeMember(member.id);
                        },
                      });
                    }}
                  >
                    {t("delete")}
                  </ActionButton>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </ContainerCard>
  );
});

export default ListMember;
