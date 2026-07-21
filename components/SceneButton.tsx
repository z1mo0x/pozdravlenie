"use client";

import { motion } from "motion/react";

type SceneButtonProps = {
  children: string;
  disabled: boolean;
  onClick: () => void;
};

export default function SceneButton({
  children,
  disabled,
  onClick,
}: SceneButtonProps) {
  return (
    <motion.button
      type="button"
      tabIndex={0}
      className="scene-button"
      disabled={disabled}
      onClick={onClick}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ y: 0, scale: 0.98 }}
      transition={{ duration: 0.18 }}
    >
      {children}
    </motion.button>
  );
}
