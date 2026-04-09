"use client";

import { motion } from "motion/react";

interface BlurredStaggerProps {
  text: string;
  className?: string;
  delay?: number;
}

export function BlurredStagger({ text, className, delay = 0 }: BlurredStaggerProps) {
  const words = text.split(" ");

  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            // 0.5x speed: stagger interval doubled 0.07 → 0.14
            staggerChildren: 0.14,
            delayChildren: delay,
          },
        },
      }}
      style={{ display: "inline" }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, filter: "blur(10px)", y: 8 },
            visible: {
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
              // 0.5x speed: duration doubled 0.45 → 0.9
              transition: { duration: 0.9, ease: "easeOut" },
            },
          }}
          style={{
            display: "inline-block",
            marginRight: i < words.length - 1 ? "0.22em" : 0,
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
