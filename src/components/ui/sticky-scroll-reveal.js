"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/utils/cn";

export const StickyScrollReveal = ({
  className,
  containerClassName,
  items,
}) => {
  const containerRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(0);
  
  useEffect(() => {
    if (containerRef.current) {
      // Set the height of the container to be the number of items times 100vh
      // This creates the scrolling effect
      setContainerHeight(items.length * window.innerHeight);
    }
  }, [items.length]);

  return (
    <div
      ref={containerRef}
      className={cn("relative", containerClassName)}
      style={{ height: containerHeight }}
    >
      <div className={cn("sticky top-0 h-screen flex items-center overflow-hidden", className)}>
        {items.map((item, index) => (
          <StickyItem 
            key={index} 
            item={item} 
            index={index} 
            containerRef={containerRef}
            totalItems={items.length}
          />
        ))}
      </div>
    </div>
  );
};

const StickyItem = ({ item, index, containerRef, totalItems }) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start", "end"],
  });
  
  // Calculate when this item should be active
  const sectionHeight = 1 / totalItems;
  const sectionStart = index * sectionHeight;
  const sectionEnd = sectionStart + sectionHeight;
  
  // Transform scrollYProgress to opacity and position for this item
  const opacity = useTransform(
    scrollYProgress,
    [sectionStart, sectionStart + 0.1, sectionEnd - 0.1, sectionEnd],
    [0, 1, 1, 0]
  );
  
  const x = useTransform(
    scrollYProgress,
    [sectionStart, sectionStart + 0.1, sectionEnd - 0.1, sectionEnd],
    [100, 0, 0, -100]
  );

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{ opacity, x }}
    >
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
        {item}
      </div>
    </motion.div>
  );
}; 