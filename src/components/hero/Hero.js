"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AnimatedWords } from "../ui/animated-text";
import { useState, useEffect } from "react";

export default function Hero() {
  const [dots, setDots] = useState([]);

  useEffect(() => {
    // Generate dots only on client-side
    const newDots = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      opacity: Math.random() * 0.6 + 0.2,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      scale: Math.random() * 1.5 + 0.5,
      duration: Math.random() * 5 + 5,
    }));
    setDots(newDots);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-700/20 via-transparent to-transparent"
          style={{
            maskImage: "radial-gradient(ellipse at top right, rgba(0, 0, 0, 1), transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at top right, rgba(0, 0, 0, 1), transparent 70%)",
          }}
        />
        <div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-700/20 via-transparent to-transparent"
          style={{
            maskImage: "radial-gradient(ellipse at bottom left, rgba(0, 0, 0, 1), transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at bottom left, rgba(0, 0, 0, 1), transparent 70%)",
          }}
        />
        
        {/* Animated dots */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          {dots.map((dot) => (
            <motion.div
              key={dot.id}
              className="absolute h-1 w-1 rounded-full bg-blue-500"
              initial={{ 
                opacity: dot.opacity, 
                x: dot.x, 
                y: dot.y 
              }}
              animate={{
                opacity: [dot.opacity, dot.opacity],
                scale: [1, dot.scale, 1],
              }}
              transition={{
                duration: dot.duration,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 py-24 md:py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs md:text-sm font-medium uppercase tracking-wider text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              Digital Innovation Partner
            </span>
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <AnimatedWords
              text="Transform Your Ideas into Digital Reality"
              className="leading-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
            />
          </h1>
          
          <motion.p
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 md:mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            We build cutting-edge apps, websites, and SaaS solutions that power digital innovation. 
            Let's create something exceptional together.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Link 
              href="/services" 
              className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Explore Services
            </Link>
            <Link 
              href="/contact" 
              className="px-6 py-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transform hover:scale-105 transition-all"
            >
              Get in Touch
            </Link>
          </motion.div>
          
          <motion.div
            className="mt-16 flex justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <div className="text-center">
              <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">100+</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Projects Completed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 text-transparent bg-clip-text">50+</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Happy Clients</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-400 text-transparent bg-clip-text">8+</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Years Experience</p>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ 
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-gray-400 dark:border-gray-600 flex justify-center">
          <motion.div 
            className="w-1 h-2 bg-blue-600 rounded-full mt-2"
            animate={{
              y: [0, 12, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </div>
  );
} 