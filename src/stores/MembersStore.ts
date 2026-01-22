import { makeAutoObservable } from 'mobx';

export interface IMember {
    id: string;
    name: string;
}

export class MembersStore {
    members: IMember[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    addMember(member: IMember) {
        this.members.push(member);
    }

    removeMember(memberId: string, hasIncome: boolean) {
        if (hasIncome) {
            throw new Error('Member has income and cannot be deleted');
        }

        this.members = this.members.filter(m => m.id !== memberId);
    }


    clearMembers() {
        this.members = [];
    }
}