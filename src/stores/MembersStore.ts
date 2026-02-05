import { makeAutoObservable } from "mobx";
import { RootStore } from "./RootStore";

export interface IMember {
  id: string;
  name: string;
  status: "active" | "inactive";
}

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
      (m) => m.name.toLowerCase() === member.name.toLowerCase()
    );

    if (exists) {
      throw new Error("Member already exists");
    }

    household.members.push({
      ...member,
      status: "active",
    });
  }

  removeMember(memberId: string, hasIncome: boolean) {
    const household = this.rootStore.householdStore.activeHousehold;
    if (!household) return;

    const member = household.members.find((m) => m.id === memberId);
    if (!member) return;

    if (!hasIncome) {
      household.members = household.members.filter(
        (m) => m.id !== memberId
      );
    } else {
      member.status = "inactive";
    }
  }

  restoreMember(memberId: string) {
    const household = this.rootStore.householdStore.activeHousehold;
    if (!household) return;

    const member = household.members.find((m) => m.id === memberId);
    if (!member) return;

    member.status = "active";
  }

  clearMembers() {
    const household = this.rootStore.householdStore.activeHousehold;
    if (!household) return;

    household.members = [];
  }
}
