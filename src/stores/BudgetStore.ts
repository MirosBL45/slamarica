import { makeAutoObservable } from 'mobx';

const STORAGE_KEY = 'slamarica_budget';

export type BudgetPoolType =
    | 'personal'
    | 'bills'
    | 'travel'
    | 'food'
    | 'savings';

export interface IBudgetPool {
    type: BudgetPoolType;
    label: string;
    percentage: number;
}

const DEFAULT_POOLS: IBudgetPool[] = [
    { type: 'personal', label: 'Lični novac', percentage: 20 },
    { type: 'bills', label: 'Računi', percentage: 10 },
    { type: 'travel', label: 'Putovanja', percentage: 10 },
    { type: 'food', label: 'Hrana', percentage: 20 },
    { type: 'savings', label: 'Kućna štednja', percentage: 40 },
];


export class BudgetStore {
    pools: IBudgetPool[] = DEFAULT_POOLS.map(p => ({ ...p }));

    constructor() {
        makeAutoObservable(this);
    }

    hydrate() {
        if (typeof window === 'undefined') return;

        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            this.pools = JSON.parse(stored);
        }
    }

    private persist() {
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.pools));
        }
    }

    get totalPercentage() {
        return this.pools.reduce((sum, p) => sum + p.percentage, 0);
    }

    get isValid() {
        return this.totalPercentage === 100;
    }

    setPercentage(type: BudgetPoolType, value: number) {
        const pool = this.pools.find(p => p.type === type);
        if (pool) {
            pool.percentage = value;
        };
        this.persist();
    }

    resetToDefault() {
        this.pools = DEFAULT_POOLS.map(p => ({ ...p }));
        this.persist();
    }
}

