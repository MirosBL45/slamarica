import { IMember } from "./member.types";
import { IMonthlyIncome } from "./income.types";
import { IMonthlyBudget } from "./budget.types";

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
