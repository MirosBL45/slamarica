import { makeAutoObservable } from "mobx";
import { RootStore } from "../RootStore";

export class MembersStore {
  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }

  get members() {
    return this.rootStore.householdStore.activeHousehold?.members ?? [];
  }

  addMember(member: { id: string; name: string }) {
    const household = this.rootStore.householdStore.activeHousehold;
    if (!household) return;

    const exists = household.members.some(
      (m) => m.name.toLowerCase() === member.name.toLowerCase(),
    );

    if (exists) {
      throw new Error("Member already exists");
    }

    household.members.push({
      ...member,
      status: "active",
    });

    this.rootStore.householdStore.persist();
  }

  removeMember(memberId: string) {
    const household = this.rootStore.householdStore.activeHousehold;
    if (!household) return;

    const member = household.members.find((m) => m.id === memberId);
    if (!member) return;

    const hasIncome = household.incomes.some((i) => i.memberId === memberId);

    if (!hasIncome) {
      // ako NEMA plata → briše se
      household.members = household.members.filter((m) => m.id !== memberId);
    } else {
      // ako IMA makar jednu platu → samo postaje inactive
      member.status = "inactive";
    }

    this.rootStore.householdStore.persist();
  }

  restoreMember(memberId: string) {
    const household = this.rootStore.householdStore.activeHousehold;
    if (!household) return;

    const member = household.members.find((m) => m.id === memberId);
    if (!member) return;

    member.status = "active";

    this.rootStore.householdStore.persist();
  }

  clearMembers() {
    const household = this.rootStore.householdStore.activeHousehold;
    if (!household) return;

    household.members = [];

    this.rootStore.householdStore.persist();
  }
}
