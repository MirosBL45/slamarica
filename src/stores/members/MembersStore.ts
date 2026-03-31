import { makeAutoObservable } from "mobx";

import { MemberRole, MemberStatus } from "@/types/member.types";

import { RootStore } from "../RootStore";

export class MembersStore {
  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }

  get members() {
    return this.rootStore.householdStore.activeHousehold?.members ?? [];
  }

  async loadMembers() {
    const res = await fetch("/api/members");

    if (!res.ok) return;

    const members = await res.json();

    const household = this.rootStore.householdStore.activeHousehold;
    if (!household) return;

    household.members = members;
  }

  async addMember(name: string) {
    const household = this.rootStore.householdStore.activeHousehold;
    if (!household) return;

    // ✅ duplikat provera
    const exists = household.members.some(
      (m) => m.name.toLowerCase() === name.trim().toLowerCase()
    );
    if (exists) {
      throw new Error("Member already exists");
    }

    const res = await fetch("/api/members", {
      method: "POST",
      body: JSON.stringify({ name }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create member");
    }
    const member = await res.json();
    household.members.push(member);
    this.rootStore.householdStore.persist();
  }

  get currentAdmin() {
    const household = this.rootStore.householdStore.activeHousehold;
    if (!household) return null;

    return household.members.find((m) => m.role === MemberRole.ADMIN) ?? null;
  }

  isAdmin(memberId: string) {
    return this.currentAdmin?.id === memberId;
  }

  async removeMember(memberId: string) {
    const household = this.rootStore.householdStore.activeHousehold;
    if (!household) return;

    const hasIncome = household.incomes.some((i) => i.memberId === memberId);

    const res = await fetch("/api/members", {
      method: hasIncome ? "PATCH" : "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(hasIncome ? { memberId, status: "inactive" } : { memberId }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to remove member");
    }

    if (!hasIncome) {
      household.members = household.members.filter((m) => m.id !== memberId);
    } else {
      const member = household.members.find((m) => m.id === memberId);
      if (member) member.status = MemberStatus.INACTIVE;
    }

    this.rootStore.householdStore.persist();
  }

  async restoreMember(memberId: string) {
    const household = this.rootStore.householdStore.activeHousehold;
    if (!household) return;

    const res = await fetch("/api/members", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ memberId, status: "active" }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to restore member");
    }

    const member = household.members.find((m) => m.id === memberId);
    if (member) member.status = MemberStatus.ACTIVE;

    this.rootStore.householdStore.persist();
  }

  clearMembers() {
    const household = this.rootStore.householdStore.activeHousehold;
    if (!household) return;

    household.members = [];

    this.rootStore.householdStore.persist();
  }
}
