import { makeAutoObservable } from "mobx";
import { IMember } from "./MembersStore";
import { IMonthlyIncome } from "./MonthlyIncomeStore";
import { IBudgetPool } from "./BudgetStore";

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

    // ako nema nijedne kuće, napravi jednu default
    if (this.households.length === 0) {
      this.createHousehold("My house");
    }
  }

  get activeHousehold() {
    return this.households.find((h) => h.id === this.activeHouseholdId) ?? null;
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
  }

  addMember(name: string) {
  const household = this.activeHousehold;
  if (!household) return;

  const exists = household.members.some(
    m => m.name.toLowerCase() === name.toLowerCase()
  );

  if (exists) {
    throw new Error('Member already exists');
  }

  household.members.push({
    id: crypto.randomUUID(),
    name,
    status: 'active',
  });
}


  setActiveHousehold(id: string) {
    this.activeHouseholdId = id;
  }

  clearAll() {
    this.households = [];
    this.activeHouseholdId = null;
  }
}
