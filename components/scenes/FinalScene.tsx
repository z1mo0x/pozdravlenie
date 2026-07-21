"use client";

import { motion } from "motion/react";

import SceneButton from "@/components/SceneButton";
import type {
  SceneComponentProps,
  SceneDefinition,
} from "@/components/scenes/types";

function FinalScene({
  childName,
  isLocked,
  onNext,
}: SceneComponentProps) {
  return (
    <section className="scene scene--final">
      <motion.div
        className="final-scene__halo"
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      />

      <div className="scene__content scene__content--center final-scene__content">
        <motion.p
          className="scene__eyebrow"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Добро пожаловать
        </motion.p>

        <motion.h2
          className="scene__title scene__title--hero"
          initial={{ opacity: 0, scale: 0.72 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          {childName}
        </motion.h2>

        <motion.p
          className="scene__text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Расти здоровым, смелым и счастливым. Мы уже очень тебя любим.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32 }}
        >
          <SceneButton disabled={isLocked} onClick={onNext}>
            Посмотреть сначала
          </SceneButton>
        </motion.div>
      </div>
    </section>
  );
}

export const finalScene: SceneDefinition = {
  id: "final",
  title: "Поздравление",
  exit: "zoom",
  background: "#f1f8ed",
  particleColor: "#8dbb82",
  Component: FinalScene,
};
