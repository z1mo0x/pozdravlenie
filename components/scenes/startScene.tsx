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
    playOverlaySound,
} from "@/lib/audioManager";

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
        await playBackgroundMusic("/audio/background.mp3");

        /*
         * Необязательный короткий звук нажатия.
         */
        await playOverlaySound("/audio/start.mp3", 0.5);

        onNext();
    };

    return (
        <section className="scene scene--start">
            <motion.div
                className="scene__content scene__content--center"
            >
                <motion.h1
                    className="scene__title scene__title--hero"
                    initial={{
                        opacity: 0,
                        y: 36,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 1,
                        delay: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{ fontSize: '72px' }}
                >
                    У нас для вас есть
                    <br />
                    небольшое поздравление
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
                        delay: 0.6,
                    }}
                >
                    Для полного погружения требуется нажать данную кнопку!
                    <br />
                    <span style={{}}>(для включения звука)</span>
                </motion.p>

                <motion.div
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
                        delay: 0.9,
                    }}
                >
                    <SceneButton
                        disabled={isLocked || isStarting}
                        onClick={handleStart}
                    >
                        {isStarting ? "Начинаем..." : "Начать"}
                    </SceneButton>
                </motion.div>
            </motion.div>
        </section>
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