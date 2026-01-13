import { makeAutoObservable } from 'mobx';

export interface Household {
    id: string;
    name: string;
}

export class HouseholdStore {
    household: Household | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setHousehold(household: Household) {
        this.household = household;
    }

    clearHousehold() {
        this.household = null;
    }
}