"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Shared instance
let lenisInstance = null;

// Advanced easing function (easeOutExpo)
const defaultEasing = (t) => 1 - Math.pow(2, -10 * t);

export function useLenis({
  duration = 1.2,
  easing = defaultEasing,
  smooth = true,
  gestureDirection = "vertical",
  smoothTouch = true,
  touchMultiplier = 1.2,
} = {}) {
  useEffect(() => {
    if (!lenisInstance) {
      lenisInstance = new Lenis({
        duration,
        easing,
        smooth,
        gestureDirection,
        smoothTouch,
        touchMultiplier,
      });

      const raf = (time) => {
        lenisInstance?.raf(time);
        requestAnimationFrame(raf);
      };

      requestAnimationFrame(raf);
    }

    return () => {
      lenisInstance?.destroy();
      lenisInstance = null;
    };
  }, [duration, easing, smooth, gestureDirection, smoothTouch, touchMultiplier]);
}

export function scrollTo(target, options = {}) {
  if (!lenisInstance) {
    console.warn("Lenis belum diinisialisasi. Pastikan useLenis() sudah dipanggil.");
    return;
  }

  lenisInstance.scrollTo(target, {
    offset: 0,
    duration: 1.2,
    easing: defaultEasing,
    ...options,
  });
}
