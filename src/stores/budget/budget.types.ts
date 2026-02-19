export type BudgetPoolType =
  | "personal"
  | "bills"
  | "travel"
  | "food"
  | "savings"
  | "investments";

export interface IBudgetPool {
  type: BudgetPoolType;
  label: string;
  percentage: number;
}

export interface IMonthlyBudget {
  month: string;
  pools: IBudgetPool[];
}