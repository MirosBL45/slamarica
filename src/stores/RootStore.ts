import { BudgetStore } from './BudgetStore';
import { HouseholdStore } from './HouseholdStore';
import { MembersStore } from './MembersStore';
import { MonthlyIncomeStore } from './MonthlyIncomeStore';

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
