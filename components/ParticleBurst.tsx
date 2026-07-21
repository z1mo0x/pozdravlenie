"use client";

import { motion } from "motion/react";
import { useMemo, type CSSProperties } from "react";

type Particle = {
  id: number;
  left: number;
  top: number;
  size: number;
  x: number;
  y: number;
  rotate: number;
  delay: number;
};

type ParticleBurstProps = {
  burstKey: number;
  color: string;
  count?: number;
};

function createRandom(seed: number) {
  let value = seed;

  return () => {
    value |= 0;
    value = (value + 0x6d2b79f5) | 0;

    let result = Math.imul(value ^ (value >>> 15), 1 | value);
    result =
      (result + Math.imul(result ^ (result >>> 7), 61 | result)) ^
      result;

    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

export default function ParticleBurst({
  burstKey,
  color,
  count = 86,
}: ParticleBurstProps) {
  const particles = useMemo<Particle[]>(() => {
    const random = createRandom(burstKey + 2389);

    return Array.from({ length: count }, (_, id) => {
      const angle = random() * Math.PI * 2;
      const distance = 150 + random() * 440;

      return {
        id,
        left: 18 + random() * 64,
        top: 18 + random() * 64,
        size: 3 + random() * 9,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance - 70,
        rotate: (random() - 0.5) * 720,
        delay: random() * 0.12,
      };
    });
  }, [burstKey, count]);

  return (
    <div
      className="particle-layer"
      style={{ "--particle-color": color } as CSSProperties}
      aria-hidden="true"
    >
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="particle-layer__item"
          style={
            {
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              "--particle-size": `${particle.size}px`,
            } as CSSProperties
          }
          initial={{ opacity: 0, x: 0, y: 0, scale: 0.2, rotate: 0 }}
          animate={{
            opacity: [0, 0.95, 0],
            x: particle.x,
            y: particle.y,
            scale: [0.2, 1, 0.1],
            rotate: particle.rotate,
          }}
          transition={{
            duration: 0.85,
            delay: particle.delay,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}
    </div>
  );
}
