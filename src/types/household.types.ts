import { IMonthlyBudget } from "./budget.types";
import { IMonthlyIncome } from "./income.types";
import { IMember } from "./member.types";

export enum MoneyCurrency {
  RSD = "RSD",
  EUR = "EUR",
  USD = "USD",
}

export interface IHousehold {
  id: string;
  name: string;
  currency: MoneyCurrency;
  currencyLocked: boolean;
  members: IMember[];
  incomes: IMonthlyIncome[];
  monthlyBudgets: IMonthlyBudget[];
}