"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform, animate } from "motion/react";
import type {
  SceneComponentProps,
  SceneDefinition,
} from "@/components/scenes/types";

// Коэффициент сильного зума (1.7 = увеличение на 70%)
const ZOOM_SCALE = 1.7;

function WishesScene({ isLocked, onNext }: SceneComponentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);

  const [zoom, setZoom] = useState(false);
  const zoomRef = useRef(false);

  const x = useMotionValue(0);
  const targetXRef = useRef(0);

  // Синхронизируем ref для доступа из обработчиков без лишних ререндеров
  useEffect(() => {
    zoomRef.current = zoom;
  }, [zoom]);

  // Параллакс фона
  const bgX = useTransform(x, (currentX) => {
    if (maxScroll <= 0) return 0;
    const progress = currentX / -maxScroll;
    return -0 + progress * 150;
  });

  // Обновление доступного диапазона скролла с учетом текущего зума
  const updateScrollBounds = useCallback(() => {
    if (trackRef.current && containerRef.current) {
      const child = trackRef.current.firstElementChild as HTMLElement;
      const baseWidth =
        child?.offsetWidth ||
        trackRef.current.offsetWidth ||
        trackRef.current.scrollWidth;

      const viewportWidth = containerRef.current.clientWidth;
      const currentScale = zoomRef.current ? ZOOM_SCALE : 1;
      const calculatedMax = Math.max(
        0,
        baseWidth * currentScale - viewportWidth + 140,
      );
      setMaxScroll(calculatedMax);
    }
  }, []);

  // Клик для переключения сильного зума с сохранением фокуса на выбранном пожелании
  const toggleZoom = useCallback(
    (e?: React.MouseEvent) => {
      // Игнорируем клик, если только что отпустили перетаскивание
      if (isDraggingRef.current) return;

      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;

      const viewportWidth = container.clientWidth;
      const child = track.firstElementChild as HTMLElement;
      const baseWidth = child?.offsetWidth || 6000;

      const isCurrentlyZoomed = zoomRef.current;
      const willZoom = !isCurrentlyZoomed;

      // Находим точку ленты, на которую сейчас смотрит пользователь
      const currentX = x.get();
      let targetPointOnBase = 0;

      if (e) {
        const rect = track.getBoundingClientRect();
        const clickVisualX = e.clientX - rect.left;
        targetPointOnBase = isCurrentlyZoomed
          ? clickVisualX / ZOOM_SCALE
          : clickVisualX;
      } else {
        const centerVisualX = -currentX + viewportWidth / 2;
        targetPointOnBase = isCurrentlyZoomed
          ? centerVisualX / ZOOM_SCALE
          : centerVisualX;
      }

      // Новый диапазон скролла
      const newScale = willZoom ? ZOOM_SCALE : 1;
      const newMaxScroll = Math.max(
        0,
        baseWidth * newScale - viewportWidth + 140,
      );
      setMaxScroll(newMaxScroll);

      // Смещаем позицию x так, чтобы желаемая точка осталась ровно под курсором / в центре
      const anchorOnScreen = e ? e.clientX : viewportWidth / 2;
      const newTargetX = -(targetPointOnBase * newScale - anchorOnScreen);
      const clampedTargetX = Math.max(-newMaxScroll, Math.min(0, newTargetX));

      targetXRef.current = clampedTargetX;
      animate(x, clampedTargetX, {
        type: "spring",
        damping: 30,
        stiffness: 240,
        mass: 0.4,
      });

      setZoom(willZoom);
    },
    [x],
  );

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

  // Скролл колесом мыши: работает как в обычном режиме, так и внутри зума
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();

      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

      // Зум НЕ сбрасывается! Скроллим по всей доступной длине
      const newTarget = Math.max(
        -maxScroll,
        Math.min(0, targetXRef.current - delta * 1.5),
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

  // Клавиатурная навигация: листает ленту в зуме
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        const step = zoomRef.current ? 600 : 400;
        const newTarget = Math.max(-maxScroll, targetXRef.current - step);
        targetXRef.current = newTarget;
        animate(x, newTarget, { type: "spring", damping: 30, stiffness: 260 });
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        const step = zoomRef.current ? 600 : 400;
        const newTarget = Math.min(0, targetXRef.current + step);
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
      {/* Параллакс фон */}
      <motion.div
        className="absolute inset-y-0 pointer-events-none -z-10"
        style={{
          left: "-250px",
          right: "-250px",
          width: "calc(100% + 250px)",
          x: bgX,
          backgroundImage: "url('/wishes-bg.png')",
          backgroundPosition: "center top",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Заголовок сцены: при сильном зуме мягко приглушается, чтобы не спорить с открытками */}
      <motion.div
        className="scene__content scene__content--center w-full!"
        style={{
          opacity: zoom ? 0.25 : 1,
          transition: "opacity 0.4s ease",
        }}
      >
        <motion.h1 className="scene__title scene__title--hero text-8xl!">
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
            className="text-[250px]"
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

      {/* Область веревки */}
      <div
        className="absolute inset-x-0 top-[38%] bottom-0 z-10 flex items-center overflow-visible"
        style={{
          cursor: isDragging ? "grabbing" : "grab",
          touchAction: "none",
        }}
      >
        <motion.div
          ref={trackRef}
          className="relative flex items-center h-full"
          drag="x"
          dragConstraints={{ left: -maxScroll, right: 0 }}
          dragElastic={0.12}
          dragTransition={{ bounceStiffness: 400, bounceDamping: 25 }}
          style={{ x }}
          onDragStart={() => {
            setIsDragging(true);
            isDraggingRef.current = true;
          }}
          onDrag={() => {
            targetXRef.current = x.get();
          }}
          onDragEnd={() => {
            setIsDragging(false);
            targetXRef.current = x.get();
            setTimeout(() => {
              isDraggingRef.current = false;
            }, 60);
          }}
        >
          <div
            className="relative h-[48vh] min-h-[360px] max-h-[580px] aspect-[6000/400] flex-shrink-0"
            onClick={toggleZoom}
            style={{
              transform: zoom ? `scale(${ZOOM_SCALE})` : "scale(1)",
              transformOrigin: "0 78%",
              transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
              cursor: isDragging ? "grabbing" : zoom ? "zoom-out" : "zoom-in",
            }}
          >
            <Image
              src="/wishes.svg"
              alt="Пожелания от коллег на веревке"
              fill
              priority
              sizes="6000px"
              className="object-contain pointer-events-none select-none drop-shadow-lg"
              draggable={false}
              onLoad={updateScrollBounds}
            />
          </div>
        </motion.div>
      </div>

      {/* Интерактивная подсказка снизу */}
      <motion.div
        className="absolute bottom-6 inset-x-0 z-20 flex justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white/90 text-sm font-medium tracking-wide flex items-center gap-2 drop-shadow">
          <span>←</span>
          <span>
            {zoom
              ? "Листайте приближенную ленту (клик для отдаления)"
              : "Листайте или тяните веревку (клик для приближения)"}
          </span>
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