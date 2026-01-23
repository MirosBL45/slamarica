import { makeAutoObservable } from 'mobx';
import { BudgetPoolType, IBudgetPool } from './BudgetStore';
import { BudgetStore } from './BudgetStore';

const STORAGE_KEY = 'slamarica_incomes';

export interface IMonthlyIncome {
    id: string;
    memberId: string;
    month: string;
    salary: number;
    breakdown: Record<BudgetPoolType, number>;
}

export class MonthlyIncomeStore {
    monthlyBudgets: {
        month: string;
        pools: IBudgetPool[];
    }[] = [];

    incomes: IMonthlyIncome[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    getBudgetForMonth(month: string) {
        return this.monthlyBudgets.find(b => b.month === month);
    }

    createBudgetForMonth(month: string, pools: IBudgetPool[]) {
        this.monthlyBudgets.push({
            month,
            pools: pools.map(p => ({ ...p })) // snapshot
        });
    }

    hydrate() {
        if (typeof window === 'undefined') return;

        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            this.incomes = JSON.parse(stored);
        }
    }

    private persist() {
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.incomes));
        }
    }

    addIncome(income: IMonthlyIncome) {
        this.incomes.push(income);

        this.persist();
    }

    getByMonth(month: string) {
        return this.incomes.filter(i => i.month === month);
    }

    getTotalsByMonth(month: string) {
        const totals: Record<string, number> = {
            personal: 0,
            bills: 0,
            travel: 0,
            food: 0,
            savings: 0,
        };

        this.getByMonth(month).forEach(income => {
            Object.entries(income.breakdown).forEach(([key, value]) => {
                totals[key] += value;
            });
        });

        return totals;
    }


    createIncome(
        memberId: string,
        month: string,
        salary: number,
        budgetStore: BudgetStore
    ) {
        const alreadyExists = this.incomes.some(
            income => income.memberId === memberId && income.month === month
        );

        if (alreadyExists) {
            throw new Error('Income already exists for this member and month');
        }

        let monthBudget = this.getBudgetForMonth(month);

        if (!monthBudget) {
            this.createBudgetForMonth(month, budgetStore.pools);
            monthBudget = this.getBudgetForMonth(month);
        }

        const breakdown = monthBudget!.pools.reduce((acc, pool) => {
            acc[pool.type] = Math.round((salary * pool.percentage) / 100);
            return acc;
        }, {} as Record<BudgetPoolType, number>);

        this.addIncome({
            id: crypto.randomUUID(),
            memberId,
            month,
            salary,
            breakdown,
        });
    }

    hasIncomeForMember(memberId: string) {
        return this.incomes.some(
            income => income.memberId === memberId
        );
    }

    clear() {
        this.incomes = [];
        this.persist();
    }
}