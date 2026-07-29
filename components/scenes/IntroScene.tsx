"use client";

import { motion } from "motion/react";

import SceneButton from "@/components/SceneButton";
import type {
  SceneComponentProps,
  SceneDefinition,
} from "@/components/scenes/types";
import Image from "next/image";
import { useState } from "react";

function IntroScene({ isLocked, onNext }: SceneComponentProps) {

  const [cookieStage, setCookieStage] = useState<number>(0);




  return (
    <section className="scene scene--intro">
      <motion.div
        className="scene__content scene__content--center"
      >
        <motion.h1
          className="scene__title scene__title--hero"
        >
          <motion.p
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: .5 }}
          >
            Поздравляем

          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: .75 }}
          >
            с рождением
          </motion.p>
          <motion.span
            initial={{ opacity: 0, rotate: 0, y: 0, x: 0 }}
            animate={{ opacity: 1, rotate: -10, y: -30, x: -15 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 1.25 }}
          >
            дочки
          </motion.span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >

          <SceneButton disabled={isLocked} onClick={onNext}>
            Подтвердить
          </SceneButton>
        </motion.div>

      </motion.div>
      <motion.div className="scene__image"
        initial={{ opacity: 0, y: 100, x: '-50%' }}
        animate={{ opacity: 1, y: 0, x: '-50%' }}
        transition={{ duration: .75, delay: 1.5 }}
      >
        <Image src={'/child.png'} loading="eager" width={1000} height={700} alt="Ребенок" />
      </motion.div>
      {/* <img src="../../public/bg.png" alt="" /> */}
    </section >
  );
}


export const introScene: SceneDefinition = {
  id: "intro",
  title: "Начало",
  exit: 'particles',
  background: "#fff",
  particleColor: '#fff',
  Component: IntroScene,
};
