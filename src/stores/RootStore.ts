import { HouseholdStore } from './HouseholdStore';
import { MembersStore } from './MembersStore';
import { BudgetStore } from './BudgetStore';

export class RootStore {
    householdStore: HouseholdStore;
    membersStore: MembersStore;
    budgetStore: BudgetStore;

    constructor() {
        this.householdStore = new HouseholdStore();
        this.membersStore = new MembersStore();
        this.budgetStore = new BudgetStore();
    }
}

export const rootStore = new RootStore();
