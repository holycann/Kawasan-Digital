"use client";

import { motion } from "motion/react";

export default function StatsSection() {
    return (
        <motion.div
            className="max-w-5xl mx-auto mt-20 px-4 py-10 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
        >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">35+</h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">Projects Completed</p>
                </div>
                <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400">25+</h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">Happy Clients</p>
                </div>
                <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-pink-600 dark:text-pink-400">15+</h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">Expert Team</p>
                </div>
                <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-pink-600 dark:text-pink-400">6+</h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">Years of Experience</p>
                </div>
            </div>
        </motion.div>
    );
} 