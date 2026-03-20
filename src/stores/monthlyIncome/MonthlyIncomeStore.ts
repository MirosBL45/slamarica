import { makeAutoObservable } from "mobx";
import { RootStore } from "../RootStore";
import { BudgetStore } from "../budget/BudgetStore";
import { BudgetPoolType } from "@/types/budget.types";
import { MemberStatus } from "@/types/member.types";

// import { v4 as uuidv4 } from "uuid";

export class MonthlyIncomeStore {
  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }

  get incomes() {
    return this.rootStore.householdStore.activeHousehold?.incomes ?? [];
  }

  getByMonth(month: string) {
    return this.incomes.filter((i) => i.month === month);
  }

  getTotalsByMonth(month: string) {
    const totals: Record<BudgetPoolType, number> = {
      [BudgetPoolType.PERSONAL]: 0,
      [BudgetPoolType.BILLS]: 0,
      [BudgetPoolType.TRAVEL]: 0,
      [BudgetPoolType.FOOD]: 0,
      [BudgetPoolType.SAVINGS]: 0,
      [BudgetPoolType.INVESTMENTS]: 0,
    };

    this.getByMonth(month).forEach((income) => {
      Object.entries(income.breakdown).forEach(([key, value]) => {
        // Key cast-ujemo u Enum jer Object.entries po defaultu vraća string
        totals[key as BudgetPoolType] += value;
      });
    });

    return totals;
  }

  hasIncomeForMember(memberId: string) {
    return this.incomes.some((income) => income.memberId === memberId);
  }

  async createIncome(
    memberId: string,
    month: string,
    salary: number,
    budgetStore: BudgetStore,
  ) {
    const household = this.rootStore.householdStore.activeHousehold;
    if (!household) return;

    const member = household.members.find((m) => m.id === memberId);
    if (member?.status === MemberStatus.INACTIVE) {
      throw new Error("Inactive member cannot submit income");
    }

    const alreadyExists = household.incomes.some(
      (income) => income.memberId === memberId && income.month === month,
    );

    if (alreadyExists) {
      throw new Error("Income already exists for this member and month");
    }

    budgetStore.initMonth(month);

    const pools = budgetStore.getPools(month);

    const breakdown: Record<BudgetPoolType, number> = {
      [BudgetPoolType.PERSONAL]: 0,
      [BudgetPoolType.BILLS]: 0,
      [BudgetPoolType.TRAVEL]: 0,
      [BudgetPoolType.FOOD]: 0,
      [BudgetPoolType.SAVINGS]: 0,
      [BudgetPoolType.INVESTMENTS]: 0,
    };

    pools.forEach((pool: { type: BudgetPoolType; percentage: number }) => {
      breakdown[pool.type] = Math.round((salary * pool.percentage) / 100);
    });

    // await fetch("/api/incomes", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     memberId,
    //     month,
    //     salary,
    //     breakdown,
    //   }),
    // });

    // household.incomes.push({
    //   id: uuidv4(),
    //   memberId,
    //   month,
    //   salary,
    //   breakdown,
    // });

    // ✅ NOVO — uzmeš income od servera i pushuješ taj isti objekat
    const res = await fetch("/api/incomes", {
      method: "POST",
      body: JSON.stringify({
        memberId,
        month,
        salary,
        breakdown,
      }),
    });

    const income = await res.json(); // server vraca { id, memberId, month, salary, breakdown }
    household.incomes.push(income); // ✅ isti ID kao u bazi
  }

  async loadIncomes() {
    const res = await fetch("/api/incomes");
    if (!res.ok) return;

    const incomes = await res.json();

    const household = this.rootStore.householdStore.activeHousehold;
    if (!household) return;

    household.incomes = incomes;
  }
}
