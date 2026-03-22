import { makeAutoObservable } from "mobx";
import { MoneyCurrency, IHousehold } from "@/types/household.types";

import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "slamarica_households_v1";

export class HouseholdStore {
  households: IHousehold[] = [];
  activeHouseholdId: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.hydrate();
  }

  async loadFromServer() {
    const res = await fetch("/api/household");

    if (!res.ok) return;

    const household = await res.json();

    this.households = [
      {
        ...household,
        id: household._id,
        currencyLocked: household.currencyLocked ?? false,
      },
    ];

    this.activeHouseholdId = household._id;

    this.persist();
  }

  hydrate() {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      this.households = parsed.households ?? [];
      this.activeHouseholdId = parsed.activeHouseholdId ?? null;
    }
  }

  persist() {
    if (typeof window === "undefined") return;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        households: this.households,
        activeHouseholdId: this.activeHouseholdId,
      }),
    );
  }

  get activeHousehold() {
    return this.households.find((h) => h.id === this.activeHouseholdId) ?? null;
  }

  createHousehold(name: string) {
    const newHousehold: IHousehold = {
      id: uuidv4(),
      name,
      currency: MoneyCurrency.RSD,
      currencyLocked: false,
      members: [],
      incomes: [],
      monthlyBudgets: [],
    };

    this.households.push(newHousehold);
    this.activeHouseholdId = newHousehold.id;
    this.persist();
  }

  setActiveHousehold(id: string) {
    this.activeHouseholdId = id;
    this.persist();
  }

  async setCurrency(currency: MoneyCurrency) {
    const household = this.activeHousehold;
    if (!household || household.currencyLocked) return;

    household.currency = currency;

    await fetch("/api/household", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currency }),
    });

    this.persist();
  }

  async lockCurrency() {
    const household = this.activeHousehold;
    if (!household) return;

    household.currencyLocked = true;

    await fetch("/api/household", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currencyLocked: true }),
    });

    this.persist();
  }

  clearAll() {
    this.households = [];
    this.activeHouseholdId = null;
    this.persist();
  }
}
