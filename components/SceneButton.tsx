"use client";

import { motion } from "motion/react";
import GlassSurface from "./GlassSurface";

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
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: .5 }}

    >
      {/* <div className="scene-button__background" aria-hidden="true" /> */}
      <GlassSurface
        width={175}
        height={175}
        distortionScale={0}
        displace={4}
        redOffset={0}
        greenOffset={10}
        borderRadius={88}
        saturation={1.1}
        blueOffset={8}
        brightness={90}
        backgroundOpacity={0.18}
        opacity={0.5}
        mixBlendMode="screen"
        className="w-full! h-full!"
      >

        {children}


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
      </GlassSurface >
    </motion.button >
  );
}
