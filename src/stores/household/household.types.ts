import { IBudgetPool } from "../budget/budget.types";
import { IMember } from "../members/members.types";
import { IMonthlyIncome } from "../monthlyIncome/monthlyIncome.types";

export enum MoneyCurrency {
  RSD = 'RSD',
  EUR = 'EUR',
  USD = 'USD',
}

export interface IMonthlyBudget {
  month: string;
  pools: IBudgetPool[];
}

export interface IHousehold {
  id: string;
  name: string;
  currency: MoneyCurrency;
  members: IMember[];
  incomes: IMonthlyIncome[];
  monthlyBudgets: IMonthlyBudget[];
}