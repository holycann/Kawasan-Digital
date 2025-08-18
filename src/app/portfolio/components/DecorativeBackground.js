"use client";

import { motion, useScroll, useTransform } from "motion/react";
import dynamic from 'next/dynamic';

const SparklesCore = dynamic(() => import('@/components/ui/sparkles').then((mod) => mod.SparklesCore), {
    loading: () => <div className="w-full h-full bg-gray-100 dark:bg-gray-900 animate-pulse"></div>,
    ssr: false,
});

export default function DecorativeBackground() {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, 300]);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute top-1/3 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

            {/* Sparkles effect */}
            <div className="absolute inset-0 h-screen w-full">
                <SparklesCore
                    id="tsparticlesfullpage"
                    background="transparent"
                    minSize={0.6}
                    maxSize={1.4}
                    particleDensity={70}
                    className="w-full h-full"
                    particleColor="#4f46e5"
                />
            </div>

            {/* Floating 3D elements */}
            <motion.div
                className="absolute top-40 right-20 w-24 h-24 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 opacity-70"
                style={{ y }}
                animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.05, 0.95, 1]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            />

            <motion.div
                className="absolute bottom-40 left-20 w-16 h-16 rounded-full bg-gradient-to-tr from-purple-400 to-pink-500 opacity-70"
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 180, 360],
                    scale: [1, 1.1, 1]
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            />

            <motion.div
                className="absolute top-1/2 left-1/3 w-12 h-12 rounded-md bg-gradient-to-r from-blue-500 to-indigo-500 opacity-70"
                animate={{
                    y: [0, 30, 0],
                    x: [0, 20, 0],
                    rotate: [0, -45, 0],
                    scale: [1, 0.9, 1]
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            />
        </div>
    );
} 