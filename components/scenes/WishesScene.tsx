"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { Share2, Heart } from "lucide-react";
import type {
  SceneComponentProps,
  SceneDefinition,
} from "@/components/scenes/types";

function WishesScene({ isLocked, onNext }: SceneComponentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const x = useMotionValue(0);
  const targetXRef = useRef(0);

  // Параллакс фона: когда веревка едет влево (x уходит в минус), фон сдвигается вправо
  const bgX = useTransform(x, (currentX) => {
    if (maxScroll <= 0) return 0;
    const progress = currentX / -maxScroll; // от 0 (начало) до 1 (конец ленты)
    return -150 + progress * 300; // сдвиг фона вправо от -150px до +150px
  });

  // Обновление доступного диапазона скролла
  const updateScrollBounds = useCallback(() => {
    if (trackRef.current && containerRef.current) {
      const trackWidth =
        trackRef.current.offsetWidth || trackRef.current.scrollWidth;
      const viewportWidth = containerRef.current.clientWidth;
      const calculatedMax = Math.max(0, trackWidth - viewportWidth + 140);
      setMaxScroll(calculatedMax);
    }
  }, []);

  useEffect(() => {
    updateScrollBounds();
    window.addEventListener("resize", updateScrollBounds);

    let observer: ResizeObserver | null = null;
    if (trackRef.current) {
      observer = new ResizeObserver(() => {
        updateScrollBounds();
      });
      observer.observe(trackRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateScrollBounds);
      if (observer) observer.disconnect();
    };
  }, [updateScrollBounds]);

  // Обработка колеса мыши с плавным накоплением скорости
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();

      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

      const newTarget = Math.max(
        -maxScroll,
        Math.min(0, targetXRef.current - delta * 1.4),
      );
      targetXRef.current = newTarget;

      animate(x, newTarget, {
        type: "spring",
        damping: 30,
        stiffness: 260,
        mass: 0.3,
      });
    },
    [maxScroll, x],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [handleWheel]);

  // Клавиатурная навигация (стрелочки влево/вправо)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        const newTarget = Math.max(-maxScroll, targetXRef.current - 400);
        targetXRef.current = newTarget;
        animate(x, newTarget, { type: "spring", damping: 30, stiffness: 260 });
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        const newTarget = Math.min(0, targetXRef.current + 400);
        targetXRef.current = newTarget;
        animate(x, newTarget, { type: "spring", damping: 30, stiffness: 260 });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [maxScroll, x]);

  return (
    <section
      ref={containerRef}
      className="scene scene--wishes relative w-full h-screen overflow-hidden select-none"
      style={{ padding: "100px 0 20px" }}
    >
      {/* Параллакс фон: движется вправо при скролле веревки влево */}
      <motion.div
        className="absolute inset-y-0 pointer-events-none -z-10"
        style={{
          left: "-250px",
          right: "-250px",
          width: "calc(100% + 500px)",
          x: bgX,
          backgroundImage: "url('/wishes-bg.png')",
          backgroundPosition: "center bottom",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Главный заголовок сцены из других сцен */}
      <motion.div className="scene__content scene__content--center w-full!">
        <motion.h1 className="scene__title scene__title--hero">
          <motion.p
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.5,
            }}
          >
            С ИСКРЕННИМИ
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.75,
            }}
          >
            ПОЖЕЛАНИЯМИ
          </motion.p>
          <motion.span
            initial={{ opacity: 0, rotate: 0, y: 0, x: 0 }}
            animate={{ opacity: 1, rotate: -7.5, y: -15, x: -15 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
              delay: 1.25,
            }}
          >
            твои коллеги
          </motion.span>
        </motion.h1>
      </motion.div>

      {/* Область веревки с одеждой и пожеланиями */}
      <div
        className="absolute inset-x-0 top-[38%] bottom-0 z-10 flex items-center overflow-hidden"
        style={{
          cursor: isDragging ? "grabbing" : "grab",
          touchAction: "none",
        }}
      >
        <motion.div
          ref={trackRef}
          className="relative flex items-center h-full pl-8 pr-28"
          drag="x"
          dragConstraints={{ left: -maxScroll, right: 0 }}
          dragElastic={0.12}
          dragTransition={{ bounceStiffness: 400, bounceDamping: 25 }}
          style={{ x }}
          onDragStart={() => setIsDragging(true)}
          onDrag={() => {
            targetXRef.current = x.get();
          }}
          onDragEnd={() => {
            setIsDragging(false);
            targetXRef.current = x.get();
          }}
        >
          <div className="relative h-[48vh] min-h-[360px] max-h-[580px] aspect-[7725/608] flex-shrink-0">
            <Image
              src="/wishes.svg"
              alt="Пожелания от коллег на веревке"
              fill
              priority
              sizes="7725px"
              className="object-contain pointer-events-none select-none drop-shadow-lg"
              draggable={false}
              onLoad={updateScrollBounds}
            />
          </div>
        </motion.div>
      </div>

      {/* Подсказка для скролла / перетаскивания снизу */}
      <motion.div
        className="absolute bottom-6 inset-x-0 z-20 flex justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white/90 text-sm font-medium tracking-wide flex items-center gap-2 drop-shadow">
          <span>←</span>
          <span>Листайте или тяните веревку с пожеланиями</span>
          <span>→</span>
        </div>
      </motion.div>
    </section>
  );
}

export const wishesScene: SceneDefinition = {
  id: "wishes",
  title: "Поздравления",
  exit: "zoom",
  background: "#FCE7EC",
  particleColor: "#FFB6C1",
  Component: WishesScene,

  sound: "/audio/scenes/start.mp3",
  soundVolume: 0.5,
};
