"use client";

import { motion } from "motion/react";

export default function DevelopmentProcessSection({ project }) {
    // Check if project stories exist and have content
    const stories = project?.stories[0];
    const hasStories = stories && Object.keys(stories).length > 0;

    // Extract development process section
    const developmentProcess = stories?.content?.developmentProcess || {};

    // Only render if development process exists and has planning or design
    if (!hasStories || 
        (!developmentProcess.planning?.length && 
         !developmentProcess.design?.length)) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 md:p-12"
        >
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600 font-heading">
                    Development Process
                </h2>

                <div className={`grid grid-cols-1 ${developmentProcess.planning?.length > 0 && developmentProcess.design?.length > 0 ? "md:grid-cols-2" : "md:grid-cols-1"} gap-8 text-justify`}>
                    {developmentProcess.planning?.length > 0 && (
                        <div>
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                Planning & Research
                            </h3>
                            <ul className={`space-y-2 text-gray-700 dark:text-gray-300 ${developmentProcess.planning?.length > 0 && developmentProcess.design?.length > 0 ? "" : "grid grid-cols-3 gap-2"}`}>
                                {developmentProcess.planning.map((plan, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <div className="mt-1.5 w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                        <span>{plan}</span>
                                    </li>
                                ))}
                            </ul>
                            {developmentProcess.processApproach && (
                                <div className="mt-4">
                                    <span className="font-semibold text-gray-800 dark:text-gray-200">Process Approach: </span>
                                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                                        {developmentProcess.processApproach.map((approach, index) => (
                                            <li key={index}>{approach}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}

                    {developmentProcess.design?.length > 0 && (
                        <div>
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                Design & Development
                            </h3>
                            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                {developmentProcess.design.map((design, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <div className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                        <span>{design}</span>
                                    </li>
                                ))}
                            </ul>
                            {developmentProcess.keyMethodologies && (
                                <div className="mt-4">
                                    <span className="font-semibold text-gray-800 dark:text-gray-200">Key Methodologies: </span>
                                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                                        {developmentProcess.keyMethodologies.map((methodology, index) => (
                                            <li key={index}>{methodology}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
} 