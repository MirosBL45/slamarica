"use client";

import { useState } from "react";
import styles from "./Calculator.module.scss";
import { DEMO_CATEGORIES, INCOME } from "@/utils/helpers/demoConstants";
import {
  ActionButton,
  ContainerCard,
  SectionHeader,
  StatCard,
} from "@/components/ui";
import { Slider, InputNumber, Space, Progress, Tooltip } from "antd";

import { useTranslations } from "next-intl";

export default function Calculator() {
  const [income, setIncome] = useState<number>(INCOME);
  const [categories, setCategories] = useState(DEMO_CATEGORIES);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const t = useTranslations("financialOverview");

  function handleChange(value: string) {
    const numeric = Number(value.replace(/[^\d]/g, ""));
    setIncome(numeric);
  }

  function updatePercent(id: string, newPercent: number) {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === id ? { ...cat, percent: newPercent } : cat,
      ),
    );
  }

  const totalPercent = categories.reduce((sum, cat) => sum + cat.percent, 0);

  function normalize() {
    const total = categories.reduce((s, c) => s + c.percent, 0);

    const normalized = categories.map((cat) => ({
      ...cat,
      percent: Math.round((cat.percent / total) * 100),
    }));

    const sum = normalized.reduce((s, c) => s + c.percent, 0);
    const diff = 100 - sum;

    if (diff !== 0) {
      normalized[normalized.length - 1].percent += diff;
    }

    setCategories(normalized);
  }

  return (
    <section className={styles.section}>
      <ContainerCard>
        <SectionHeader
          title={t("calculator")}
          description={t("income")}
          variant="primary"
        />

        <div className={styles.inputBlock}>
          <label>{t("monthly")} &euro;</label>
          <input
            type="number"
            inputMode="numeric"
            value={income === 0 ? "" : income}
            onChange={(e) => handleChange(e.target.value)}
            className={styles.input}
            placeholder={t("placeholder")}
          />
        </div>

        <div className={styles.progressWrapper}>
          {categories.map((cat) => (
            <Tooltip
              key={cat.id}
              title={`${t(`categories.${cat.id}`)} — ${cat.percent}%`}
            >
              <div
                style={{
                  width: `${cat.percent}%`,
                }}
              >
                <Progress
                  percent={100}
                  showInfo={false}
                  strokeColor={cat.color}
                  railColor="transparent"
                  size="small"
                />
              </div>
            </Tooltip>
          ))}
        </div>

        <div className={styles.grid}>
          {categories.map((cat) => {
            const value = (income * cat.percent) / 100;

            return (
              <div key={cat.id}>
                <StatCard
                  label={t(`categories.${cat.id}`)}
                  amount={value}
                  percentage={cat.percent}
                  color={cat.color}
                  active={activeCategory === cat.id}
                />

                <div className={styles.sliderRow}>
                  <Slider
                    min={0}
                    max={100}
                    value={cat.percent}
                    tooltip={{ formatter: (v) => `${v}%` }}
                    onChange={(value) => {
                      setActiveCategory(cat.id);
                      updatePercent(cat.id, value);
                    }}
                    onChangeComplete={() => setActiveCategory(null)}
                    styles={{
                      track: { backgroundColor: cat.color },
                      rail: { backgroundColor: `${cat.color}30` },
                      handle: { borderColor: cat.color },
                    }}
                  />
                  <Space.Compact className={styles.percentCompact}>
                    <InputNumber
                      min={0}
                      max={100}
                      controls={false}
                      inputMode="numeric"
                      value={cat.percent}
                      onChange={(value) => updatePercent(cat.id, value ?? 0)}
                    />
                    <span>%</span>
                  </Space.Compact>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.controls}>
          <div className={styles.controlsFirstRow}>
            <p className={styles.percentInfo}>
              {t("total")}: {totalPercent}%
            </p>

            <ActionButton
              onClick={normalize}
              variant="primary"
              disabled={totalPercent === 100}
            >
              {t("normalize")}
            </ActionButton>
          </div>

          {totalPercent !== 100 && (
            <p className={styles.warning}>{t("percentages")}</p>
          )}
        </div>
      </ContainerCard>
    </section>
  );
}
