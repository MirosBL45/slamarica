// "use client";

// import { useTranslations } from "next-intl";

// import { Modal } from "antd";
// import { observer } from "mobx-react-lite";

// import ActionButton from "@/components/ui/ActionButtons/ActionButton";
// import ContainerCard from "@/components/ui/ContainerCard/ContainerCard";
// import { useStores } from "@/stores/StoreContext";
// import { MemberStatus } from "@/types/member.types";

// import styles from "./ListMember.module.scss";

// interface ITableMember {
//   id: string;
//   name: string;
//   status: MemberStatus;
//   hasIncome: boolean;
// }

// const ListMember = observer(() => {
//   const t = useTranslations("members");
//   const { membersStore, monthlyIncomeStore } = useStores();

//   const data: ITableMember[] = membersStore.members.map((member) => ({
//     id: member.id,
//     name: member.name,
//     status: member.status,
//     hasIncome: monthlyIncomeStore.hasIncomeForMember(member.id),
//   }));

//   return (
//     <ContainerCard className={styles.card}>
//       <h3 className={styles.title}>{t("householdMembers")}</h3>

//       {/* HEADER */}
//       <div className={styles.headerRow}>
//         <span>{t("name")}</span>
//         <span>{t("role")}</span>
//         <span>{t("status")}</span>
//         <span>{t("actions")}</span>
//       </div>

//       {/* ROWS */}
//       <div className={styles.list}>
//         {data.length === 0 && <div className={styles.empty}>{t("empty")}</div>}

//         {data.map((member) => {
//           const isInactive = member.status === MemberStatus.INACTIVE;

//           return (
//             <div key={member.id} className={`${styles.row} ${isInactive ? styles.inactive : ""}`}>
//               {/* NAME */}
//               <div className={styles.name}>{member.name}</div>

//               {/* ROLE */}
//               <div className={styles.role}>Member</div>

//               {/* STATUS */}
//               <div className={styles.status}>
//                 <span
//                   className={`${styles.badge} ${
//                     isInactive ? styles.inactiveBadge : styles.activeBadge
//                   }`}
//                 >
//                   {isInactive ? t("inactive") : t("active")}
//                 </span>
//               </div>

//               {/* ACTIONS */}
//               <div className={styles.actions}>
//                 {isInactive ? (
//                   <ActionButton
//                     onClick={() => {
//                       Modal.confirm({
//                         title: t("confirmRestoreTitle"),
//                         content: t("confirmRestoreText"),
//                         okText: t("restore"),
//                         cancelText: t("cancel"),
//                         onOk: () => {
//                           membersStore.restoreMember(member.id);
//                         },
//                       });
//                     }}
//                   >
//                     {t("restore")}
//                   </ActionButton>
//                 ) : (
//                   <ActionButton
//                     variant="outline"
//                     onClick={() => {
//                       Modal.confirm({
//                         title: member.hasIncome
//                           ? t("confirmInactiveTitle")
//                           : t("confirmDeleteTitle"),
//                         content: member.hasIncome
//                           ? t("confirmInactiveText")
//                           : t("confirmDeleteText"),
//                         okText: member.hasIncome ? t("setInactive") : t("delete"),
//                         cancelText: t("cancel"),
//                         onOk: () => {
//                           membersStore.removeMember(member.id);
//                         },
//                       });
//                     }}
//                   >
//                     {t("delete")}
//                   </ActionButton>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </ContainerCard>
//   );
// });

// export default ListMember;

"use client";

import { useTranslations } from "next-intl";

import { Modal } from "antd";
import { observer } from "mobx-react-lite";

import ActionButton from "@/components/ui/ActionButtons/ActionButton";
import ContainerCard from "@/components/ui/ContainerCard/ContainerCard";
import { useStores } from "@/stores/StoreContext";
import { MemberRole, MemberStatus } from "@/types/member.types";

import styles from "./ListMember.module.scss";

const ListMember = observer(() => {
  const t = useTranslations("members");
  const { membersStore, monthlyIncomeStore } = useStores();

  const members = membersStore.members;

  const handleAction = (memberId: string, isInactive: boolean, hasIncome: boolean) => {
    if (isInactive) {
      Modal.confirm({
        title: t("confirmRestoreTitle"),
        content: t("confirmRestoreText"),
        okText: t("restore"),
        cancelText: t("cancel"),
        onOk: () => membersStore.restoreMember(memberId),
      });
      return;
    }

    Modal.confirm({
      title: hasIncome ? t("confirmInactiveTitle") : t("confirmDeleteTitle"),
      content: hasIncome ? t("confirmInactiveText") : t("confirmDeleteText"),
      okText: hasIncome ? t("setInactive") : t("delete"),
      cancelText: t("cancel"),
      onOk: () => membersStore.removeMember(memberId),
    });
  };

  return (
    <ContainerCard className={styles.card}>
      <h3 className={styles.title}>{t("householdMembers")}</h3>

      {/* HEADER */}
      <div className={styles.header}>
        <span>{t("name")}</span>
        <span>{t("role")}</span>
        <span>{t("status")}</span>
        <span>{t("actions")}</span>
      </div>

      {/* LIST */}
      <div className={styles.list}>
        {members.length === 0 && <div className={styles.empty}>{t("empty")}</div>}

        {members.map((member) => {
          const hasIncome = monthlyIncomeStore.hasIncomeForMember(member.id);
          const isInactive = member.status === MemberStatus.INACTIVE;

          return (
            <div key={member.id} className={styles.row}>
              {/* NAME */}
              <div className={styles.name} style={{ opacity: isInactive ? 0.6 : 1 }}>
                {member.name}
              </div>

              {/* ROLE */}
              <div
                className={`${styles.role} ${
                  member.role === MemberRole.ADMIN ? styles.admin : styles.member
                }`}
              >
                {member.role === MemberRole.ADMIN ? t("admin") : t("member")}
              </div>

              {/* STATUS */}
              <div className={`${styles.status} ${isInactive ? styles.inactive : styles.active}`}>
                {isInactive ? t("inactive") : t("active")}
              </div>

              {/* ACTION */}
              <div className={styles.actions}>
                <ActionButton
                  variant={isInactive ? "primary" : "outline"}
                  onClick={() => handleAction(member.id, isInactive, hasIncome)}
                >
                  {isInactive ? t("restore") : t("delete")}
                </ActionButton>
              </div>
            </div>
          );
        })}
      </div>
    </ContainerCard>
  );
});

export default ListMember;
