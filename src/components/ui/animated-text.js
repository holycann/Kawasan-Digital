"use client";

import { motion } from "motion/react";

const defaultAnimations = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const AnimatedText = ({
  text,
  className,
  once = true,
  repeatDelay = 0,
  animation = defaultAnimations,
}) => {
  return (
    <motion.p
      initial="hidden"
      animate="visible"
      exit="hidden"
      className={className}
    >
      <motion.span variants={animation}>{text}</motion.span>
    </motion.p>
  );
};

export const AnimatedTitle = ({
  text,
  className = "",
  once = true,
  repeatDelay = 0,
  animation = defaultAnimations,
}) => {
  return (
    <motion.h2
      initial="hidden"
      animate="visible"
      exit="hidden"
      className={className}
    >
      <motion.span variants={animation}>{text}</motion.span>
    </motion.h2>
  );
};

export const AnimatedWords = ({
  text,
  className = "",
  once = true,
  repeatDelay = 0,
}) => {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className={`${className} inline-block`}
      variants={container}
      initial="hidden"
      animate="visible"
      viewport={{ once }}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          className="inline-block mr-1"
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}; 