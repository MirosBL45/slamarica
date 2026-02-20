import { makeAutoObservable } from "mobx";
import { RootStore } from "../RootStore";
import { BudgetStore } from "../budget/BudgetStore";
import { BudgetPoolType } from "../budget/budget.types";

import { v4 as uuidv4 } from "uuid";

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
    const totals: Record<string, number> = {
      personal: 0,
      bills: 0,
      travel: 0,
      food: 0,
      savings: 0,
      investments: 0,
    };

    this.getByMonth(month).forEach((income) => {
      Object.entries(income.breakdown).forEach(([key, value]) => {
        totals[key] += value;
      });
    });

    return totals;
  }

  hasIncomeForMember(memberId: string) {
    return this.incomes.some((income) => income.memberId === memberId);
  }

  createIncome(
    memberId: string,
    month: string,
    salary: number,
    budgetStore: BudgetStore,
  ) {
    const household = this.rootStore.householdStore.activeHousehold;
    if (!household) return;

    const alreadyExists = household.incomes.some(
      (income) => income.memberId === memberId && income.month === month,
    );

    if (alreadyExists) {
      throw new Error("Income already exists for this member and month");
    }

    budgetStore.initMonth(month);

    const pools = budgetStore.getPools(month);

    const breakdown: Record<BudgetPoolType, number> = {
      personal: 0,
      bills: 0,
      travel: 0,
      food: 0,
      savings: 0,
      investments: 0,
    };

    pools.forEach((pool: { type: BudgetPoolType; percentage: number }) => {
      breakdown[pool.type] = Math.round((salary * pool.percentage) / 100);
    });

    pools.forEach((pool: { type: BudgetPoolType; percentage: number }) => {
      breakdown[pool.type] = Math.round((salary * pool.percentage) / 100);
    });

    household.incomes.push({
      id: uuidv4(),
      memberId,
      month,
      salary,
      breakdown,
    });

    this.rootStore.householdStore.lockCurrency();
    this.rootStore.householdStore.persist();
  }
}
