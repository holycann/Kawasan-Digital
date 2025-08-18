"use client";

import { useRef } from "react";
import { motion, useAnimation } from "motion/react";
import { useInView } from "motion/react";
import { cn } from "@/utils/cn";

export const ScrollRevealSection = ({ items, className }) => {
  return (
    <div className={cn("space-y-32 py-20", className)}>
      {items.map((item, index) => (
        <AnimatedSection key={index} direction={index % 2 === 0 ? "left" : "right"}>
          {item}
        </AnimatedSection>
      ))}
    </div>
  );
};

const AnimatedSection = ({ children, direction = "left" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const xInitial = direction === "left" ? -100 : 100;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: xInitial }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-6xl mx-auto px-4 md:px-6"
    >
      {children}
    </motion.div>
  );
};
