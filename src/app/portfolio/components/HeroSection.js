"use client";

import { motion } from "motion/react";

export default function HeroSection() {
    return (
        <div className="max-w-3xl mx-auto text-center mb-12">
            <motion.span
                className="inline-block px-4 py-1.5 mb-4 text-xs md:text-sm font-medium uppercase tracking-wider text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Our Portfolio
            </motion.span>
            <motion.h1
                className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 font-heading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                Our Work
            </motion.h1>
            <motion.p
                className="text-lg text-gray-600 dark:text-gray-400 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                Explore some of the digital products and experiences we&apos;ve crafted for our clients.
                From mobile apps to enterprise solutions, we bring ideas to life.
            </motion.p>
        </div>
    );
} 