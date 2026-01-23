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
        const exists = this.members.some(
            m => m.name.toLowerCase() === member.name.toLowerCase()
        );

        if (exists) {
            throw new Error('Member already exists');
        }

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

    restoreMember(memberId: string) {
        const member = this.members.find(m => m.id === memberId);
        if (!member) return;

        member.status = 'active';
    }

    clearMembers() {
        this.members = [];
    }
}