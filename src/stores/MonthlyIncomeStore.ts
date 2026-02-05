import { makeAutoObservable } from "mobx";
import { BudgetPoolType } from "./BudgetStore";
import { BudgetStore } from "./BudgetStore";
import { RootStore } from "./RootStore";

export interface IMonthlyIncome {
  id: string;
  memberId: string;
  month: string;
  salary: number;
  breakdown: Record<BudgetPoolType, number>;
}

export class MonthlyIncomeStore {
  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }

  get incomes() {
    return (
      this.rootStore.householdStore.activeHousehold?.incomes ?? []
    );
  }

  addIncome(income: IMonthlyIncome) {
    const household = this.rootStore.householdStore.activeHousehold;
    if (!household) return;

    household.incomes.push(income);
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
    };

    this.getByMonth(month).forEach((income) => {
      Object.entries(income.breakdown).forEach(([key, value]) => {
        totals[key] += value;
      });
    });

    return totals;
  }

  createIncome(
    memberId: string,
    month: string,
    salary: number,
    budgetStore: BudgetStore
  ) {
    const household = this.rootStore.householdStore.activeHousehold;
    if (!household) return;

    const alreadyExists = household.incomes.some(
      (income) =>
        income.memberId === memberId &&
        income.month === month
    );

    if (alreadyExists) {
      throw new Error(
        "Income already exists for this member and month"
      );
    }

    const breakdown = budgetStore.pools.reduce(
      (acc, pool) => {
        acc[pool.type] = Math.round(
          (salary * pool.percentage) / 100
        );
        return acc;
      },
      {} as Record<BudgetPoolType, number>
    );

    this.addIncome({
      id: crypto.randomUUID(),
      memberId,
      month,
      salary,
      breakdown,
    });
  }

  hasIncomeForMember(memberId: string) {
    return this.incomes.some(
      (income) => income.memberId === memberId
    );
  }

  clear() {
    const household =
      this.rootStore.householdStore.activeHousehold;
    if (!household) return;

    household.incomes = [];
  }
}
