"use client";

import { motion } from "motion/react";

import SceneButton from "@/components/SceneButton";
import type {
  SceneComponentProps,
  SceneDefinition,
} from "@/components/scenes/types";

function DateScene({ isLocked, onNext }: SceneComponentProps) {
  return (
    <section className="scene scene--date">
      <div className="date-scene">
        <motion.div
          className="date-scene__number"
          initial={{ opacity: 0, scale: 0.75, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          18
        </motion.div>

        <motion.div
          className="date-scene__content"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.12, duration: 0.6 }}
        >
          <p className="scene__eyebrow">Дата рождения</p>
          <h2 className="scene__title">18 июля 2026</h2>
          <p className="scene__text scene__text--left">
            В 08:42 мир стал немного добрее и намного счастливее.
          </p>
          <SceneButton disabled={isLocked} onClick={onNext}>
            Дальше
          </SceneButton>
        </motion.div>
      </div>
    </section>
  );
}

export const dateScene: SceneDefinition = {
  id: "date",
  title: "Дата рождения",
  exit: "particles",
  background: "#edf7ff",
  particleColor: "#72abd2",
  Component: DateScene,
};
