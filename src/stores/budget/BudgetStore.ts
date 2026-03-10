import { makeAutoObservable } from "mobx";
import { RootStore } from "../RootStore";
import { BudgetPoolType, IBudgetPool } from "./budget.types";

const DEFAULT_POOLS: IBudgetPool[] = [
  { type: BudgetPoolType.PERSONAL, label: "Lični novac", percentage: 20 },
  { type: BudgetPoolType.BILLS, label: "Računi", percentage: 10 },
  { type: BudgetPoolType.TRAVEL, label: "Putovanja", percentage: 10 },
  { type: BudgetPoolType.FOOD, label: "Hrana", percentage: 20 },
  { type: BudgetPoolType.SAVINGS, label: "Kućna štednja", percentage: 30 },
  { type: BudgetPoolType.INVESTMENTS, label: "Investicije", percentage: 10 },
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

  async setPercentage(month: string, type: BudgetPoolType, value: number) {
    this.initMonth(month);

    const household = this.household;
    if (!household) return;

    const budget = household.monthlyBudgets.find((b) => b.month === month);
    if (!budget) return;

    const pool = budget.pools.find((p) => p.type === type);
    if (!pool) return;

    pool.percentage = value;

    await fetch("/api/monthlyBudgets", {
      method: "POST",
      body: JSON.stringify({
        month,
        pools: budget.pools,
      }),
    });

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
