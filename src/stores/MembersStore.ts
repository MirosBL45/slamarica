import { makeAutoObservable } from 'mobx';

export interface Member {
    id: string;
    name: string;
}

export class MembersStore {
    members: Member[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    addMember(member: Member) {
        this.members.push(member);
    }

    removeMember(memberId: string) {
        this.members = this.members.filter(m => m.id !== memberId);
    }

    clearMembers() {
        this.members = [];
    }
}