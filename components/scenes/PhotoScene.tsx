"use client";

import Image from "next/image";
import { motion } from "motion/react";

import SceneButton from "@/components/SceneButton";
import type {
  SceneComponentProps,
  SceneDefinition,
} from "@/components/scenes/types";

function PhotoScene({
  childName,
  isLocked,
  onNext,
}: SceneComponentProps) {
  return (
    <section className="scene scene--photo">
      <div className="photo-scene">
        <motion.div
          className="photo-scene__image"
          initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/images/baby-placeholder.svg"
            alt="Место для фотографии ребёнка"
            fill
            sizes="(max-width: 760px) 90vw, 48vw"
            className="photo-scene__img"
            priority
          />
        </motion.div>

        <motion.div
          className="photo-scene__content"
          initial={{ opacity: 0, x: 44 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.14, duration: 0.65 }}
        >
          <p className="scene__eyebrow">Первая фотография</p>
          <h2 className="scene__title">Знакомьтесь — {childName}</h2>
          <p className="scene__text scene__text--left">
            Здесь можно поставить настоящую фотографию, иллюстрацию или короткое видео.
          </p>
          <SceneButton disabled={isLocked} onClick={onNext}>
            К поздравлению
          </SceneButton>
        </motion.div>
      </div>
    </section>
  );
}

export const photoScene: SceneDefinition = {
  id: "photo",
  title: "Фотография",
  exit: "zoom",
  background: "#fff8e7",
  particleColor: "#e5b45b",
  Component: PhotoScene,
};
