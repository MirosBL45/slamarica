// import { HouseholdStore } from './HouseholdStore';
// import { MembersStore } from './MembersStore';
// import { BudgetStore } from './BudgetStore';
// import { MonthlyIncomeStore } from './MonthlyIncomeStore';

// export class RootStore {
//     householdStore: HouseholdStore;
//     membersStore: MembersStore;
//     budgetStore: BudgetStore;
//     monthlyIncomeStore: MonthlyIncomeStore;

//     constructor() {
//         this.householdStore = new HouseholdStore();
//         this.membersStore = new MembersStore();
//         this.budgetStore = new BudgetStore();
//         this.monthlyIncomeStore = new MonthlyIncomeStore();
//     }
// }

// export const rootStore = new RootStore();

import { HouseholdStore } from './HouseholdStore';
import { MembersStore } from './MembersStore';
import { MonthlyIncomeStore } from './MonthlyIncomeStore';

export class RootStore {
  householdStore: HouseholdStore;
  membersStore: MembersStore;
  monthlyIncomeStore: MonthlyIncomeStore;

  constructor() {
    this.householdStore = new HouseholdStore();
    this.membersStore = new MembersStore(this);
    this.monthlyIncomeStore = new MonthlyIncomeStore(this);

  }
}

export const rootStore = new RootStore();
