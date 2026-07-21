"use client";

import { motion } from "motion/react";

import SceneButton from "@/components/SceneButton";
import type {
  SceneComponentProps,
  SceneDefinition,
} from "@/components/scenes/types";

function IntroScene({ isLocked, onNext }: SceneComponentProps) {
  return (
    <section className="scene scene--intro">
      <motion.div
        className="scene__content scene__content--center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        <motion.p
          className="scene__eyebrow"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Самое важное событие
        </motion.p>

        <motion.h1
          className="scene__title scene__title--hero"
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          У нас родился малыш
        </motion.h1>

        <motion.p
          className="scene__text"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
        >
          Небольшая история о самом счастливом дне нашей семьи.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
        >
          <SceneButton disabled={isLocked} onClick={onNext}>
            Начать
          </SceneButton>
        </motion.div>
      </motion.div>
    </section>
  );
}

export const introScene: SceneDefinition = {
  id: "intro",
  title: "Начало",
  exit: "up",
  background: "#fff4ee",
  particleColor: "#d8846d",
  Component: IntroScene,
};
