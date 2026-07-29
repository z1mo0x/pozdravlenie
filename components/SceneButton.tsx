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
      className="scene-button liquid-glass"
      disabled={disabled}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.18 }}

    >
      <div className="glass-text">Поздравляем</div>

      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
        <defs>
          <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.017 0.017" numOctaves="2" seed="92" result="noise" />
            <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
            <feDisplacementMap in="SourceGraphic" in2="blurred" scale="48" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
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
    </motion.button>
  );
}
