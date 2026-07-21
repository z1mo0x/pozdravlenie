"use client";

import { motion } from "motion/react";

import SceneButton from "@/components/SceneButton";
import type {
  SceneComponentProps,
  SceneDefinition,
} from "@/components/scenes/types";

const stats = [
  { value: "3 420", unit: "г", label: "Вес" },
  { value: "52", unit: "см", label: "Рост" },
  { value: "08:42", unit: "", label: "Время" },
];

function StatsScene({ isLocked, onNext }: SceneComponentProps) {
  return (
    <section className="scene scene--stats">
      <div className="stats-scene">
        <motion.div
          className="stats-scene__heading"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="scene__eyebrow">Наш маленький герой</p>
          <h2 className="scene__title">Первые важные цифры</h2>
        </motion.div>

        <div className="stats-scene__grid">
          {stats.map((stat, index) => (
            <motion.article
              key={stat.label}
              className="stat-card"
              initial={{ opacity: 0, y: 34, rotate: index - 1 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{
                delay: 0.12 + index * 0.1,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <p className="stat-card__label">{stat.label}</p>
              <p className="stat-card__value">
                {stat.value}
                {stat.unit && <span>{stat.unit}</span>}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <SceneButton disabled={isLocked} onClick={onNext}>
            Продолжить
          </SceneButton>
        </motion.div>
      </div>
    </section>
  );
}

export const statsScene: SceneDefinition = {
  id: "stats",
  title: "Первые цифры",
  exit: "split",
  background: "#f4f0ff",
  particleColor: "#a48cda",
  Component: StatsScene,
};
