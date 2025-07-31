"use client";

import { cn } from "@/utils/cn";
import { useEffect, useState } from "react";

export const MeteorEffect = ({
  number = 20,
  className,
  children,
}) => {
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    const newMeteors = [...new Array(number)].map((_, i) => ({
      id: i,
      size: Math.floor(Math.random() * 30) + 10, // 10-40px
      left: Math.floor(Math.random() * 100),
      top: Math.floor(Math.random() * 100),
      duration: Math.floor(Math.random() * 1000) + 500, // 500-1500ms
      delay: Math.floor(Math.random() * 2000), // 0-2000ms delay
    }));
    setMeteors(newMeteors);
  }, [number]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {children}
      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="absolute h-0.5 w-0.5 rounded-full bg-white shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]"
          style={{
            top: `${meteor.top}%`,
            left: `${meteor.left}%`,
            boxShadow: "0 0 0 1px #ffffff10",
            animation: `meteor ${meteor.duration}ms ${meteor.delay}ms linear infinite`,
          }}
        >
          <div
            className="absolute top-0 -right-[100px] w-[100px] h-0.5 bg-gradient-to-r from-[rgba(255,255,255,0.01)] to-[rgba(255,255,255,0.5)]"
          />
        </div>
      ))}
      <style jsx global>{`
        @keyframes meteor {
          0% {
            transform: rotate(215deg) translateX(0);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: rotate(215deg) translateX(1000px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}; 