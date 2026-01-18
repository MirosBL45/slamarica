import { makeAutoObservable } from 'mobx';
import { BudgetPoolType } from './BudgetStore';
import { BudgetStore } from './BudgetStore';

export interface IMonthlyIncome {
    id: string;
    memberId: string;
    month: string;
    salary: number;
    breakdown: Record<BudgetPoolType, number>;
}

export class MonthlyIncomeStore {
    incomes: IMonthlyIncome[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    addIncome(income: IMonthlyIncome) {
        this.incomes.push(income);
    }

    getByMonth(month: string) {
        return this.incomes.filter(i => i.month === month);
    }

    createIncome(
        memberId: string,
        month: string,
        salary: number,
        budgetStore: BudgetStore
    ) {
        const breakdown = budgetStore.pools.reduce((acc, pool) => {
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

    clear() {
        this.incomes = [];
    }
}