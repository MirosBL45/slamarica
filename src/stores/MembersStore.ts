import { makeAutoObservable } from 'mobx';

const STORAGE_KEY = 'slamarica_members';

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

    hydrate() {
        if (typeof window === 'undefined') return;

        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            this.members = JSON.parse(stored);
        }
    }

    private persist() {
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.members));
        }
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

        this.persist();
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
        this.persist();
    }

    restoreMember(memberId: string) {
        const member = this.members.find(m => m.id === memberId);
        if (!member) return;

        member.status = 'active';

        this.persist();
    }

    clearMembers() {
        this.members = [];

        this.persist();
    }
}