import { DistributionIcon, GrowthIcon, SecureIcon } from "@/lib/icons";

export const DEMO_CATEGORIES = [
  { id: "bills", percent: 18, color: "var(--color-primary-light)" },
  { id: "investments", percent: 20, color: "var(--color-accent-dark)" },
  { id: "travel", percent: 17, color: "var(--color-accent)" },
  { id: "personal", percent: 14, color: "var(--color-primary)" },
  { id: "food", percent: 16, color: "var(--color-accent-soft)" },
  { id: "savings", percent: 15, color: "var(--color-extra-light)" },
];

export const INCOME = 3700;

export const FEATURES_DATA = [
  {
    id: "growth",
    icon: GrowthIcon,
    bgColor: "var(--color-accent)",
    bgHoverColor: "var(--color-primary-light)",
  },
  {
    id: "distribution",
    icon: DistributionIcon,
    bgColor: "var(--color-primary-light)",
    bgHoverColor: "var(--color-accent)",
  },
  {
    id: "secure",
    icon: SecureIcon,
    bgColor: "var(--color-accent-dark)",
    bgHoverColor: "var(--color-primary-light)",
  },
];
