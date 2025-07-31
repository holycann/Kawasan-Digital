"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import { FaQuoteLeft, FaStar } from "react-icons/fa6";

export const AnimatedTestimonials = ({
  testimonials,
  autoPlayInterval = 5000,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [isPaused, testimonials.length, autoPlayInterval]);

  return (
    <div 
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute top-0 left-0 w-20 h-20 text-blue-200/20 dark:text-blue-500/20">
        <FaQuoteLeft size={80} />
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 px-10 py-6"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 mb-4 rounded-full overflow-hidden border-2 border-blue-500">
              <img
                src={testimonials[currentIndex].avatar}
                alt={testimonials[currentIndex].name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <FaStar 
                  key={i} 
                  className={cn(
                    "text-lg",
                    i < testimonials[currentIndex].rating 
                      ? "text-yellow-500" 
                      : "text-gray-300 dark:text-gray-600"
                  )} 
                />
              ))}
            </div>
            
            <blockquote className="text-lg md:text-xl mb-4 italic text-gray-700 dark:text-gray-300">
              "{testimonials[currentIndex].text}"
            </blockquote>
            
            <div className="mt-2">
              <div className="font-medium text-gray-900 dark:text-white">
                {testimonials[currentIndex].name}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {testimonials[currentIndex].title}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all",
              index === currentIndex
                ? "bg-blue-600 w-6"
                : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
            )}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export const TestimonialsSection = ({ testimonials, className }) => {
  return (
    <div className={cn("py-12", className)}>
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-10">
          <AnimatedTestimonials testimonials={testimonials} />
        </div>
      </div>
    </div>
  );
}; 