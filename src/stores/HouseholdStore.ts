import { makeAutoObservable } from 'mobx';

export interface IHousehold {
    id: string;
    name: string;
}

export class HouseholdStore {
    household: IHousehold | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setHousehold(household: IHousehold) {
        this.household = household;
    }

    clearHousehold() {
        this.household = null;
    }
}