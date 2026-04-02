import { makeAutoObservable } from "mobx";

import { BudgetPoolType } from "@/types/budget.types";
import { MemberStatus } from "@/types/member.types";

import { BudgetStore } from "../budget/BudgetStore";
import { RootStore } from "../RootStore";

export class MonthlyIncomeStore {
  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }

  get incomes() {
    return this.rootStore.householdStore.activeHousehold?.incomes ?? [];
  }

  getByMonth(month: string) {
    return this.incomes.filter((i) => i.month === month);
  }

  getTotalsByMonth(month: string) {
    const totals: Record<BudgetPoolType, number> = {
      [BudgetPoolType.PERSONAL]: 0,
      [BudgetPoolType.BILLS]: 0,
      [BudgetPoolType.TRAVEL]: 0,
      [BudgetPoolType.FOOD]: 0,
      [BudgetPoolType.SAVINGS]: 0,
      [BudgetPoolType.INVESTMENTS]: 0,
    };

    this.getByMonth(month).forEach((income) => {
      Object.entries(income.breakdown).forEach(([key, value]) => {
        totals[key as BudgetPoolType] += value;
      });
    });

    return totals;
  }

  hasIncomeForMember(memberId: string) {
    return this.incomes.some((income) => income.memberId === memberId);
  }

  async createIncome(memberId: string, month: string, salary: number, budgetStore: BudgetStore) {
    const household = this.rootStore.householdStore.activeHousehold;
    if (!household) return;

    const member = household.members.find((m) => m.id === memberId);
    if (member?.status === MemberStatus.INACTIVE) {
      throw new Error("Inactive member cannot submit income");
    }

    const alreadyExists = household.incomes.some(
      (income) => income.memberId === memberId && income.month === month
    );

    if (alreadyExists) {
      throw new Error("Income already exists for this member and month");
    }

    budgetStore.initMonth(month);

    const pools = budgetStore.getPools(month);

    const breakdown: Record<BudgetPoolType, number> = {
      [BudgetPoolType.PERSONAL]: 0,
      [BudgetPoolType.BILLS]: 0,
      [BudgetPoolType.TRAVEL]: 0,
      [BudgetPoolType.FOOD]: 0,
      [BudgetPoolType.SAVINGS]: 0,
      [BudgetPoolType.INVESTMENTS]: 0,
    };

    pools.forEach((pool: { type: BudgetPoolType; percentage: number }) => {
      breakdown[pool.type] = Math.round((salary * pool.percentage) / 100);
    });

    const res = await fetch("/api/incomes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        memberId,
        month,
        salary,
        breakdown,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed");
    }

    const income = await res.json();
    household.incomes.push(income);
    this.rootStore.householdStore.persist();
  }

  async loadIncomes() {
    const res = await fetch("/api/incomes");
    if (!res.ok) return;

    const incomes = await res.json();

    const household = this.rootStore.householdStore.activeHousehold;
    if (!household) return;

    household.incomes = incomes;
  }
}