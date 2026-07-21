"use client";

import {
  AnimatePresence,
  motion,
  MotionConfig,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import ParticleBurst from "@/components/ParticleBurst";
import { scenes } from "@/components/scenes";
import type { ExitEffect } from "@/components/scenes/types";
import { useGreeting } from "@/contexts/GreetingContext";

const stageVariants: Variants = {
  enter: {
    opacity: 0,
    y: 70,
    scale: 0.985,
    filter: "blur(10px)",
  },
  center: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
    rotateX: 0,
    filter: "blur(0px)",
    clipPath: "inset(0% 0% 0% 0%)",
  },
  exitUp: {
    opacity: 0,
    y: "-110vh",
    filter: "blur(8px)",
  },
  exitParticles: {
    opacity: [1, 0.86, 0],
    scale: [1, 1.015, 0.9],
    filter: ["blur(0px)", "blur(2px)", "blur(16px)"],
  },
  exitFade: {
    opacity: 0,
  },
  exitZoom: {
    opacity: 0,
    scale: 1.42,
    filter: "blur(10px)",
  },
  exitBlur: {
    opacity: 0,
    scale: 1.06,
    filter: "blur(44px)",
  },
  exitSlideLeft: {
    opacity: 0,
    x: "-110vw",
    rotate: -2,
  },
  exitRotate: {
    opacity: 0,
    y: -120,
    rotate: 16,
    scale: 0.72,
  },
  exitFlip: {
    opacity: 0,
    rotateX: 88,
    y: -40,
    transformOrigin: "center top",
  },
  exitSplit: {
    opacity: 0,
    scaleX: 0.05,
    scaleY: 1.08,
    filter: "blur(8px)",
  },
};

const exitVariantByEffect: Record<ExitEffect, string> = {
  up: "exitUp",
  particles: "exitParticles",
  fade: "exitFade",
  zoom: "exitZoom",
  blur: "exitBlur",
  "slide-left": "exitSlideLeft",
  rotate: "exitRotate",
  flip: "exitFlip",
  split: "exitSplit",
};

const transitionDurationByEffect: Record<ExitEffect, number> = {
  up: 0.72,
  particles: 0.82,
  fade: 0.42,
  zoom: 0.72,
  blur: 0.68,
  "slide-left": 0.72,
  rotate: 0.72,
  flip: 0.72,
  split: 0.65,
};

export default function BirthGreeting() {
  const { childName } = useGreeting();
  const prefersReducedMotion = useReducedMotion() === true;

  const [sceneIndex, setSceneIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isBurstVisible, setIsBurstVisible] = useState(false);
  const [burstKey, setBurstKey] = useState(0);
  const [burstColor, setBurstColor] = useState(
    scenes[0]?.particleColor ?? "#202020",
  );

  const timers = useRef<number[]>([]);

  const addTimer = useCallback((callback: () => void, delay: number) => {
    const timer = window.setTimeout(callback, delay);
    timers.current.push(timer);
  }, []);

  useEffect(() => {
    return () => {
      timers.current.forEach(window.clearTimeout);
    };
  }, []);

  const currentScene = scenes[sceneIndex];

  if (!currentScene) {
    return null;
  }

  const currentEffect: ExitEffect = prefersReducedMotion
    ? "fade"
    : currentScene.exit;

  const handleNext = useCallback(() => {
    if (isLocked) {
      return;
    }

    const effect: ExitEffect = prefersReducedMotion
      ? "fade"
      : currentScene.exit;

    setIsLocked(true);

    if (effect === "particles") {
      setBurstColor(currentScene.particleColor);
      setBurstKey((value) => value + 1);
      setIsBurstVisible(true);
    }

    setSceneIndex((index) => (index + 1) % scenes.length);

    const unlockDelay = Math.round(
      transitionDurationByEffect[effect] * 1000 + 260,
    );

    addTimer(() => {
      setIsLocked(false);
      setIsBurstVisible(false);
    }, unlockDelay);
  }, [
    addTimer,
    currentScene.exit,
    currentScene.particleColor,
    isLocked,
    prefersReducedMotion,
  ]);

  const SceneComponent = currentScene.Component;

  return (
    <MotionConfig reducedMotion="user">
      <main
        className="greeting"
        style={{ background: currentScene.background }}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentScene.id}
            className="scene-stage"
            variants={stageVariants}
            initial="enter"
            animate="center"
            exit={exitVariantByEffect[currentEffect]}
            transition={{
              duration: transitionDurationByEffect[currentEffect],
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            <SceneComponent
              childName={childName}
              isLocked={isLocked}
              onNext={handleNext}
            />
          </motion.div>
        </AnimatePresence>

        <nav className="scene-progress" aria-label="Этапы поздравления">
          {scenes.map((scene, index) => (
            <span
              key={scene.id}
              className="scene-progress__item"
              aria-current={index === sceneIndex ? "step" : undefined}
              title={scene.title}
            >
              <motion.span
                className="scene-progress__line"
                animate={{
                  scaleX: index === sceneIndex ? 1 : 0.36,
                  opacity: index === sceneIndex ? 1 : 0.38,
                }}
                transition={{ duration: 0.3 }}
              />
            </span>
          ))}
        </nav>

        <AnimatePresence>
          {isBurstVisible && (
            <ParticleBurst
              key={burstKey}
              burstKey={burstKey}
              color={burstColor}
            />
          )}
        </AnimatePresence>
      </main>
    </MotionConfig>
  );
}
