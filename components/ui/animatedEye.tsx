'use client';

import { motion } from 'framer-motion';

type AnimatedEyeProps = {
    isOpen: boolean;
};

export function AnimatedEye({ isOpen }: AnimatedEyeProps) {
    return (
        <span className="animated-eye" aria-hidden="true">
            <motion.img
                src="/eye.svg"
                width={70}
                height={49}
                alt=""
                className="animated-eye__lid"
                initial={false}
                animate={{
                    scaleY: isOpen ? -1 : 1,
                    y: isOpen ? 0 : 10,
                }}
                transition={{
                    duration: 0.45,
                    ease: [0.65, 0, 0.35, 1],
                }}
            />

            <span className="animated-eye__pupil-position">
                <motion.span
                    className="animated-eye__pupil"
                    initial={false}
                    animate={{
                        opacity: isOpen ? 1 : 0,
                        scale: isOpen ? 1 : 0.15,
                        y: isOpen ? 0 : -12,
                    }}
                    transition={
                        isOpen
                            ? {
                                duration: 0.25,
                                delay: 0.2,
                                ease: 'backOut',
                            }
                            : {
                                duration: 0.15,
                                ease: 'easeIn',
                            }
                    }
                />
            </span>
        </span>
    );
}