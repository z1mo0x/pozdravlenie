"use client";

import { AnimatePresence, motion } from "motion/react";

import SceneButton from "@/components/SceneButton";
import type {
  SceneComponentProps,
  SceneDefinition,
} from "@/components/scenes/types";
import Image from "next/image";
import { Fragment, useState } from "react";
import '@tinymomentum/liquid-glass-react/dist/components/LiquidGlassBase.css';
import GlassSurface from '@/components/GlassSurface'
import BlurText from "@/components/BlurText";
import { toast } from "sonner";
import { playOverlaySound } from "@/lib/audioManager";

function IntroScene({ isLocked, onNext }: SceneComponentProps) {

  const [cookieStage, setCookieStage] = useState<number>(0);
  const stagesText = {
    success: [
      {
        title: 'Уровень уверенности 50%',
        description: 'Уже хорошо, но нужно больше!'
      },
      {
        title: 'Уровень уверенности 75.99999%',
        description: 'Намного лучше! но еще чуть уверенности не помешает!'
      },
      {
        title: 'Уровень уверенности 99.999%',
        description: 'Отлично! Ты уверен на все 99.999%, а этот 0.001 - отсутствие уверенности в будущем сне'
      },
    ],
    error: [
      {
        title: 'К сожалению данное действие не возможно ERROR.',
        description: 'Кто-то случайно не сделал эту функцию...'
      }
    ]
  }

  let cookieDelay = 2;
  function cookieNext() {
    setCookieStage((prev) => {

      playOverlaySound('/audio/scenes/start.mp3', .5)

      cookieDelay = 0;
      return prev + 1;
    });

    toast.success(stagesText.success[cookieStage].title,
      {
        description: stagesText.success[cookieStage].description
      }
    )
  }


  return (
    <section className="scene scene--intro relative">
      <motion.div
        className="scene__content scene__content--center"
      >
        <motion.h1
          className="scene__title scene__title--hero"
        >
          <motion.p
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: .5 }}
          >
            Поздравляем

          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: .75 }}
          >
            с рождением
          </motion.p>
          <motion.span
            initial={{ opacity: 0, rotate: 0, y: 0, x: 0 }}
            animate={{ opacity: 1, rotate: -10, y: -30, x: -15 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1.25 }}
          >
            дочки
          </motion.span>
        </motion.h1>

      </motion.div>
      <motion.div className="scene__image"
        initial={{ opacity: 0, y: 100, x: '-50%' }}
        animate={{ opacity: 1, y: 0, x: '-50%' }}
        transition={{ duration: .75, delay: 1.5 }}
      >
        <Image src={'/child.png'} loading="eager" width={1000} height={700} alt="Ребенок" />
      </motion.div>

      <AnimatePresence mode="wait">
        {
          cookieStage === 0
          &&
          <motion.div
            initial={{ y: 300 }}
            exit={{ y: 300 }}
            animate={{ y: 0 }}
            key="cookie-stage-1"
            transition={{
              duration: 1,
              delay: cookieDelay,
            }}
            className="scene__cookie w-full max-w-[95%]  glass-item">
            <div className="glass-block">
            </div>
            <GlassSurface
              distortionScale={-180}
              displace={4}
              redOffset={-8}
              greenOffset={10}
              borderRadius={20}
              blueOffset={21}
              brightness={50}
              opacity={0.93}
              mixBlendMode="screen"
              className="w-full! h-full! p-10"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: cookieDelay + .5,
                }}
                className="flex gap-20 items-center"
              >
                <div className="text text-left">
                  Внимание, куки! Соглашаясь, Иван Степанович<span> подтверждает, </span>что будет показыват<span>ь желающим  ми</span>лые фоточки своего чуда
                </div>
                <button
                  key="cookie-btn-1"
                  onClick={cookieNext} className="button-second shrink-0">
                  <span>
                    Ок, все равно заставят
                  </span>
                  <div className="button-bg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="175" height="175" viewBox="0 0 175 175" fill="none">
                      <g filter="url(#filter0_f_1_37)">
                        <circle cx="130" cy="133" r="67" fill="#DF8E97" />
                      </g>
                      <defs>
                        <filter id="filter0_f_1_37" x="-55.3" y="-52.3" width="370.6" height="370.6" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                          <feFlood floodOpacity="0" result="BackgroundImageFix" />
                          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                          <feGaussianBlur stdDeviation="59.15" result="effect1_foregroundBlur_1_37" />
                        </filter>
                      </defs>
                    </svg>
                  </div>
                </button>
              </motion.div>
            </GlassSurface>
          </motion.div>
        }
        {
          cookieStage === 1
          &&
          <>
            <motion.div
              initial={{ x: '-100%' }}
              exit={{ x: '-100%' }}
              key="cookie-stage-2"
              animate={{ x: 0 }}
              transition={{
                duration: 1,
                delay: 0,
              }}
              className="scene__cookie scene__cookie-2 w-full max-w-[95%]  glass-item">
              <div className="text-block">
                <Image src={'/text-block.png'} width={431} height={183} alt="Блок текста" />
                <div className="text">
                  да, я - батя!
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              key="cookie-btn-2"
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .5, delay: 1 }}
            >
              <SceneButton disabled={isLocked} onClick={cookieNext}>
                Подтвердить
              </SceneButton>
            </motion.div>
          </>
        }
        {
          cookieStage === 2
          &&
          <>
            <motion.div
              initial={{ x: '100%' }}
              key="cookie-stage-3"
              exit={{ x: '100%' }}
              animate={{ x: 0 }}
              transition={{
                duration: 1,
                ease: 'circInOut',
                delay: 0,
              }}
              className="scene__cookie scene__cookie-3 w-full max-w-[95%]  glass-item">
              <div className="text-block text-block-reverse">
                <Image src={'/text-block.png'} width={431} height={183} alt="Блок текста" />
                <div className="text">
                  Забирай усы <br />
                  и погнали!
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              key="cookie-btn-3"
              exit={{ opacity: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <SceneButton disabled={isLocked} onClick={() => {
                cookieNext()
                setTimeout(() => {
                  onNext()
                }, 1000);
              }}>
                Подтвердить
              </SceneButton>
            </motion.div>
          </>
        }
      </AnimatePresence>


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

  // sound: "/audio/scenes/start.mp3",
  // soundVolume: 0.5,
};
