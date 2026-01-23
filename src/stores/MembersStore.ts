import { makeAutoObservable } from 'mobx';

export interface IMember {
    id: string;
    name: string;
    status: 'active' | 'inactive';
}

export class MembersStore {
    members: IMember[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    addMember(member: { id: string; name: string }) {
        this.members.push({
            ...member,
            status: 'active',
        });
    }


    removeMember(memberId: string, hasIncome: boolean) {
        const member = this.members.find(m => m.id === memberId);
        if (!member) return;

        if (!hasIncome) {
            // nema income → stvarno brišemo
            this.members = this.members.filter(m => m.id !== memberId);
        } else {
            // ima income → samo menjamo status
            member.status = 'inactive';
        }
    }



    clearMembers() {
        this.members = [];
    }
}