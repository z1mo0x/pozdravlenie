"use client";

import { motion } from "motion/react";
import { useState } from "react";

import SceneButton from "@/components/SceneButton";
import type {
    SceneComponentProps,
    SceneDefinition,
} from "@/components/scenes/types";

import {
    enableAudio,
    playBackgroundMusic,
} from "@/lib/audioManager";
import StorkPreloader from "../StorkPreloader/StorkPreloader";
import { toast } from "sonner";

function StartScene({
    isLocked,
    onNext,
}: SceneComponentProps) {
    const [isStarting, setIsStarting] = useState(false);

    const handleStart = async () => {
        if (isLocked || isStarting) return;

        setIsStarting(true);

        /*
         * Включаем звук непосредственно по клику пользователя.
         */
        await enableAudio();
        await playBackgroundMusic();

        onNext();
    };

    return (
        <>
            <section className="scene scene--start">
                <motion.div
                    className="scene__content scene__content--center"
                >
                    <motion.h1
                        className="scene__title scene__title--hero"
                        style={{ fontSize: "68px" }}
                    >
                        <motion.p
                            initial={{ opacity: 0, y: 36 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 1, ease: [0.22, 1, 0.36, 1],
                                delay: 3.5
                            }}
                        >
                            У нас есть
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, y: 36 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 1, ease: [0.22, 1, 0.36, 1],
                                delay: 3.75
                            }}
                        >
                            небольшое
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, y: 36 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 1, ease: [0.22, 1, 0.36, 1],
                                delay: 4
                            }}
                        >
                            поздравление
                        </motion.p>
                    </motion.h1>

                    <motion.p
                        className="scene__text text"
                        initial={{
                            opacity: 0,
                            y: 18,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.8,
                            delay: 4.5,
                        }}
                    >
                        Для полного погружения требуется нажать "Начать"!
                        <br />
                        <span style={{}}>(для включения звука)</span>
                    </motion.p>

                    <motion.div
                        className="flex gap-5 justify-center mt-10"
                        initial={{
                            opacity: 0,
                            scale: .85
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1
                        }}
                        transition={{
                            duration: 0.8,
                            delay: 5,
                        }}
                    >
                        <SceneButton
                            disabled={isLocked || isStarting}
                            onClick={handleStart}
                        >
                            {isStarting ? "Начинаем..." : "Начать"}
                        </SceneButton>
                        <SceneButton
                            disabled={isLocked || isStarting}
                            onClick={() => {
                                toast.error("Так нельзя!", {
                                    description: "Лучше нажми другую кнопку!",

                                });
                            }}
                        >
                            Не хочу звуки
                        </SceneButton>
                    </motion.div>
                </motion.div>
            </section >
        </>
    );
}

export const startScene: SceneDefinition = {
    id: "start",
    title: "Начальный экран",
    exit: "particles",
    background: "pink",
    particleColor: "pink",
    Component: StartScene,

    sound: "/audio/scenes/start.mp3",
    soundVolume: 0.5,
};