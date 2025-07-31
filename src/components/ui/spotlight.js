"use client";

import { cn } from "@/utils/cn";
import { useEffect, useRef, useState } from "react";

export const Spotlight = ({
  className,
  children,
  fill = "white",
  size = 500,
}) => {
  const containerRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Only enable on non-touch devices
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    setIsEnabled(!isTouchDevice);
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      
      // Get position relative to container
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setPosition({ x, y });
      setOpacity(1);
    };
    
    const handleMouseLeave = () => {
      setOpacity(0);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
      
      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [isEnabled]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
    >
      {children}
      {isEnabled && (
        <div
          className="pointer-events-none absolute -inset-px z-10 transition-opacity duration-300"
          style={{
            opacity,
            background: `radial-gradient(${size}px circle at ${position.x}px ${position.y}px, ${fill}, transparent 80%)`,
          }}
        />
      )}
    </div>
  );
}; 