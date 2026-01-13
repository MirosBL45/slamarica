import { makeAutoObservable } from 'mobx';

export class BudgetStore {
    constructor() {
        makeAutoObservable(this);
    }
}
