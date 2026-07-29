"use client";

import { motion } from "motion/react";
import {
    useEffect,
    useRef,
    useState,
} from "react";

import styles from "./StorkPreloader.module.css";

interface StorkPreloaderProps {
    onComplete?: () => void;
}

const PRELOADER_DURATION = 4000;

export default function StorkPreloader({
    onComplete,
}: StorkPreloaderProps) {
    const [isVisible, setIsVisible] = useState(true);

    const onCompleteRef = useRef(onComplete);

    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setIsVisible(false);
            onCompleteRef.current?.();
        }, PRELOADER_DURATION);

        return () => {
            window.clearTimeout(timer);
        };
    }, []);

    if (!isVisible) {
        return null;
    }

    return (
        <div
            className={styles.preloader}
            role="status"
            aria-label="Загрузка"
        >
            <motion.div
                className={styles.background}
                initial={{
                    clipPath: "inset(0% 0% 0% 0%)",
                }}
                animate={{
                    clipPath: [
                        "inset(0% 0% 0% 0%)",
                        "inset(0% 0% 0% 0%)",
                        "inset(0% 0% 0% 100%)",
                    ],
                }}
                transition={{
                    duration: 4,
                    times: [0, 0.7, 1],
                    ease: [0.76, 0, 0.24, 1],
                }}
            >
                <div className={styles.clouds} />

                <motion.div
                    className={styles.text}
                    initial={{
                        opacity: 0,
                        y: 10,
                    }}
                    animate={{
                        opacity: [0, 0.72, 0],
                        y: [10, 0, -4],
                    }}
                    transition={{
                        duration: 3,
                        times: [0, 0.3, 1],
                    }}
                >
                    Загружаем небольшую историю…
                </motion.div>
            </motion.div>

            <motion.div
                className={styles.lightEdge}
                initial={{
                    left: "-8vw",
                    opacity: 0,
                }}
                animate={{
                    left: ["-8vw", "-8vw", "108vw"],
                    opacity: [0, 0, 0.7, 0],
                }}
                transition={{
                    duration: 1.5,
                    times: [0, 0.68, 0.82, 1],
                    ease: [0.76, 0, 0.24, 1],
                }}
            />

            <motion.div
                className={styles.stork}
                initial={{
                    x: "-38vw",
                    y: "10vh",
                    rotate: -2,
                    scale: 0.88,
                    opacity: 0,
                }}
                animate={{
                    x: [
                        "-38vw",
                        "-12vw",
                        "18vw",
                        "52vw",
                        "84vw",
                        "118vw",
                    ],
                    y: [
                        "10vh",
                        "8vh",
                        "-3vh",
                        "6vh",
                        "-5vh",
                        "-8vh",
                    ],
                    rotate: [
                        -2,
                        -1.5,
                        0.5,
                        -0.5,
                        1,
                        2,
                    ],
                    scale: [
                        0.88,
                        0.94,
                        1,
                        1.02,
                        0.98,
                        0.9,
                    ],
                    opacity: [
                        0,
                        1,
                        1,
                        1,
                        1,
                        1,
                    ],
                }}
                transition={{
                    duration: 4,
                    times: [
                        0,
                        0.16,
                        0.38,
                        0.62,
                        0.82,
                        1,
                    ],
                    ease: "linear",
                }}
            >
                <video
                    className={styles.storkVideo}
                    autoPlay
                    muted
                    playsInline
                    preload="auto"
                    poster="/img/stork-fallback.png"
                    aria-hidden="true"
                >
                    <source
                        src="/video/stork-flight.webm"
                        type="video/webm"
                    />

                    <source
                        src="/video/stork-flight.mov"
                        type="video/quicktime"
                    />
                </video>
            </motion.div>
        </div>
    );
}