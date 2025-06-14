"use client";

import { cn } from "@/utils/cn";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";

export const Card3D = ({
  className,
  children,
  containerClassName,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      if (!isHovered) return;
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({
        x: x / rect.width,
        y: y / rect.height,
      });
    };

    card.addEventListener("mousemove", handleMouseMove);
    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHovered]);

  const rotateX = isHovered ? (mousePosition.y - 0.5) * 20 : 0;
  const rotateY = isHovered ? (mousePosition.x - 0.5) * -20 : 0;

  return (
    <div 
      className={cn("relative perspective-1000", containerClassName)}
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "w-full rounded-xl transition-all duration-200 ease-out",
          className
        )}
        style={{
          transform: isHovered ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg)` : "none",
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const CardImage = ({ src, alt, className }) => {
  return (
    <div className={cn("relative w-full h-64 overflow-hidden rounded-t-xl", className)}>
      <Image
        src={src}
        alt={alt || "Card image"}
        fill
        className="object-cover"
      />
    </div>
  );
};

export const CardContent = ({ className, children }) => {
  return (
    <div className={cn("p-6", className)}>
      {children}
    </div>
  );
}; 