import { BudgetStore } from "./budget/BudgetStore";
import { HouseholdStore } from "./household/HouseholdStore";
import { MembersStore } from "./members/MembersStore";
import { MonthlyIncomeStore } from "./monthlyIncome/MonthlyIncomeStore";

export class RootStore {
  householdStore: HouseholdStore;
  membersStore: MembersStore;
  monthlyIncomeStore: MonthlyIncomeStore;
  budgetStore: BudgetStore;

  constructor() {
    this.householdStore = new HouseholdStore();
    this.membersStore = new MembersStore(this);
    this.monthlyIncomeStore = new MonthlyIncomeStore(this);
    this.budgetStore = new BudgetStore(this);
  }
}

export const rootStore = new RootStore();
