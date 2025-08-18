"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "motion/react";

export const SparklesCore = ({
  id,
  background,
  minSize,
  maxSize,
  speed,
  particleColor,
  particleDensity,
  className,
  particleOpacity,
}) => {
  const [particles, setParticles] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const container = document.getElementById(id);
    if (container) {
      const { width, height } = container.getBoundingClientRect();
      setDimensions({ width, height });

      const particleCount = particleDensity ? particleDensity : 50;
      const particlesArray = Array.from({ length: particleCount }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * (maxSize || 4) + (minSize || 1),
        speed: Math.random() * (speed || 1) + 0.2,
        opacity: Math.random() * (particleOpacity || 1) + 0.3,
        blinkRate: Math.random() * 3 + 1,
      }));

      setParticles(particlesArray);
    }
  }, [id, maxSize, minSize, particleDensity, particleOpacity, speed, mounted]);

  return (
    <div
      id={id}
      className={cn("h-full w-full relative overflow-hidden", className)}
      style={{
        background: background || "transparent",
      }}
    >
      {mounted && particles.map((particle, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, particle.opacity, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.speed * 4,
            repeat: Infinity,
            repeatDelay: Math.random() * 2,
          }}
          style={{
            position: "absolute",
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            borderRadius: "50%",
            backgroundColor: particleColor || "#fff",
          }}
        />
      ))}
    </div>
  );
};

export const Sparkles = ({
  children,
  className,
  background,
  minSize,
  maxSize,
  speed,
  particleColor,
  particleDensity,
  particleOpacity,
}) => {
  const id = React.useId();
  return (
    <div className={cn("relative w-full", className)}>
      <SparklesCore
        id={id}
        background={background}
        minSize={minSize}
        maxSize={maxSize}
        speed={speed}
        particleColor={particleColor}
        particleDensity={particleDensity}
        className="absolute inset-0 h-full w-full"
        particleOpacity={particleOpacity}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}; 