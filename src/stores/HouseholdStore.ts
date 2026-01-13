import { makeAutoObservable } from 'mobx';

export class HouseholdStore {
    constructor() {
        makeAutoObservable(this);
    }
}
