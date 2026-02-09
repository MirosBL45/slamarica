import { IBudgetPool } from "../budget/budget.types";
import { IMember } from "../members/members.types";
import { IMonthlyIncome } from "../monthlyIncome/monthlyIncome.types";

export interface IMonthlyBudget {
  month: string;
  pools: IBudgetPool[];
}

export interface IHousehold {
  id: string;
  name: string;
  members: IMember[];
  incomes: IMonthlyIncome[];
  monthlyBudgets: IMonthlyBudget[];
}