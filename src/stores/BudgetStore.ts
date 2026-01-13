import { makeAutoObservable } from 'mobx';

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
    pools: IBudgetPool[] = DEFAULT_POOLS;

    constructor() {
        makeAutoObservable(this);
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
        }
    }

    resetToDefault() {
        this.pools = DEFAULT_POOLS.map(p => ({ ...p }));
    }
}

