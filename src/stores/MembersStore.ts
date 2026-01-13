import { makeAutoObservable } from 'mobx';

export class MembersStore {
    constructor() {
        makeAutoObservable(this);
    }
}
