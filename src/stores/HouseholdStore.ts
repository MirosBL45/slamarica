import { makeAutoObservable } from "mobx";
import { IMember } from "./MembersStore";
import { IMonthlyIncome } from "./MonthlyIncomeStore";
import { IBudgetPool } from "./BudgetStore";

const STORAGE_KEY = "slamarica_households_v1";

export interface IMonthlyBudget {
  month: string;
  pools: IBudgetPool[];
}

export interface IHousehold {
  id: string;
  name: string;
  members: IMember[];
  incomes: IMonthlyIncome[];
  monthlyBudgets: IMonthlyBudget[];
}

export class HouseholdStore {
  households: IHousehold[] = [];
  activeHouseholdId: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.hydrate();
  }

  hydrate() {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      this.households = parsed.households ?? [];
      this.activeHouseholdId = parsed.activeHouseholdId ?? null;
    }

    if (this.households.length === 0) {
      this.createHousehold("My house");
    }
  }

  persist() {
    if (typeof window === "undefined") return;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        households: this.households,
        activeHouseholdId: this.activeHouseholdId,
      })
    );
  }

  get activeHousehold() {
    return this.households.find(
      (h) => h.id === this.activeHouseholdId
    ) ?? null;
  }

  createHousehold(name: string) {
    const newHousehold: IHousehold = {
      id: crypto.randomUUID(),
      name,
      members: [],
      incomes: [],
      monthlyBudgets: [],
    };

    this.households.push(newHousehold);
    this.activeHouseholdId = newHousehold.id;
    this.persist();
  }

  setActiveHousehold(id: string) {
    this.activeHouseholdId = id;
    this.persist();
  }

  clearAll() {
    this.households = [];
    this.activeHouseholdId = null;
    this.persist();
  }
}
