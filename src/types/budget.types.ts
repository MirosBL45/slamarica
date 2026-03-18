export enum BudgetPoolType {
  PERSONAL = "personal",
  BILLS = "bills",
  TRAVEL = "travel",
  FOOD = "food",
  SAVINGS = "savings",
  INVESTMENTS = "investments",
}

export interface IBudgetPool {
  type: BudgetPoolType;
  label: string;
  percentage: number;
}

export interface IMonthlyBudget {
  month: string;
  pools: IBudgetPool[];
}
