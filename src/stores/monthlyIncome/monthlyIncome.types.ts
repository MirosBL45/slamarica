import { BudgetPoolType } from "../budget/budget.types";

export interface IMonthlyIncome {
  id: string;
  memberId: string;
  month: string;
  salary: number;
  breakdown: Record<BudgetPoolType, number>;
}