import { makeAutoObservable } from "mobx";
import { RootStore } from "./RootStore";

export type BudgetPoolType =
  | "personal"
  | "bills"
  | "travel"
  | "food"
  | "savings";

export interface IBudgetPool {
  type: BudgetPoolType;
  label: string;
  percentage: number;
}

export interface IMonthlyBudget {
  month: string;
  pools: IBudgetPool[];
}

const DEFAULT_POOLS: IBudgetPool[] = [
  { type: "personal", label: "Lični novac", percentage: 20 },
  { type: "bills", label: "Računi", percentage: 10 },
  { type: "travel", label: "Putovanja", percentage: 10 },
  { type: "food", label: "Hrana", percentage: 20 },
  { type: "savings", label: "Kućna štednja", percentage: 40 },
];

export class BudgetStore {
  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }

  private get household() {
    return this.rootStore.householdStore.activeHousehold;
  }

  private cloneDefault() {
    return DEFAULT_POOLS.map((p) => ({ ...p }));
  }

  // ✅ OVO sme da upisuje (poziva se iz useEffect / akcije)
  initMonth(month: string) {
    const household = this.household;
    if (!household) return;

    const exists = household.monthlyBudgets.some((b) => b.month === month);
    if (exists) return;

    household.monthlyBudgets.push({
      month,
      pools: this.cloneDefault(),
    });

    this.rootStore.householdStore.persist();
  }

  // ✅ OVO NIKAD ne upisuje (sigurno za render)
  getPools(month: string): IBudgetPool[] {
    const household = this.household;
    if (!household) return this.cloneDefault();

    const existing = household.monthlyBudgets.find((b) => b.month === month);
    return existing ? existing.pools : this.cloneDefault();
  }

  setPercentage(month: string, type: BudgetPoolType, value: number) {
    this.initMonth(month);

    const household = this.household;
    if (!household) return;

    const budget = household.monthlyBudgets.find((b) => b.month === month);
    if (!budget) return;

    const pool = budget.pools.find((p) => p.type === type);
    if (!pool) return;

    pool.percentage = value;
    this.rootStore.householdStore.persist();
  }

  getTotalPercentage(month: string) {
    return this.getPools(month).reduce((sum, p) => sum + p.percentage, 0);
  }

  isValid(month: string) {
    return this.getTotalPercentage(month) === 100;
  }

  isLocked(month: string) {
    return this.household?.incomes.some((i) => i.month === month) ?? false;
  }
}
