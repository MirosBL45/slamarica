"use client";

import { useState } from "react";
import styles from "./Calculator.module.scss";
import { DEMO_CATEGORIES, INCOME } from "@/lib/demoConstants";
import {
  ActionButton,
  ContainerCard,
  SectionHeader,
  StatCard,
} from "@/components/ui";
import { Slider, InputNumber, Space } from "antd";

import { useTranslations } from "next-intl";

export default function Calculator() {
  const [income, setIncome] = useState<number>(INCOME);
  const [categories, setCategories] = useState(DEMO_CATEGORIES);
  const [animating, setAnimating] = useState(false);
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
    setAnimating(true);

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

    setTimeout(() => {
      setCategories(normalized);
      setAnimating(false);
    }, 80);
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
          <label>{t("monthly")}</label>
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
            <div
              key={cat.id}
              className={styles.progressSegment}
              style={{
                width: animating ? "0%" : `${cat.percent}%`,
                backgroundColor: cat.color,
              }}
            />
          ))}
        </div>

        <div className={styles.grid}>
          {categories.map((cat) => {
            const value = (income * cat.percent) / 100;

            return (
              <div key={cat.id} className={styles.statWrapper}>
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
        <ContainerCard>
          <div className={styles.controls}>
            <div className={styles.percentInfo}>
              Total: {totalPercent}%
              {totalPercent !== 100 && (
                <span className={styles.warning}>
                  Percentages should equal 100%
                </span>
              )}
            </div>

            <ActionButton
              onClick={normalize}
              variant="primary"
              disabled={totalPercent === 100}
            >
              Normalize to 100%
            </ActionButton>
          </div>
        </ContainerCard>
      </ContainerCard>
    </section>
  );
}
