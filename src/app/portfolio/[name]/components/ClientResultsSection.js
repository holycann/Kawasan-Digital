"use client";

import { motion } from "motion/react";

export default function ClientResultsSection({ project }) {
    // Check if project stories exist and have content
    const stories = project?.stories[0];
    const hasStories = stories && Object.keys(stories).length > 0;

    // Extract client results section
    const clientResults = stories?.content?.clientResults || {};
    const hasBusinessImpact = clientResults.businessImpact && clientResults.businessImpact.length > 0;
    const hasUserExperience = clientResults.userExperience && clientResults.userExperience.length > 0;

    // Only render if either business impact or user experience exists
    if (!hasBusinessImpact && !hasUserExperience) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="mt-16 bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 md:p-12"
        >
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600 font-heading">
                    Client Results
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {hasBusinessImpact && (
                        <div>
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                Business Impact
                            </h3>
                            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                {clientResults.businessImpact.map((impact, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <div className="mt-1.5 w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                                        <span>{impact}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {hasUserExperience && (
                        <div>
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                User Experience
                            </h3>
                            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                {clientResults.userExperience.map((experience, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <div className="mt-1.5 w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                                        <span>{experience}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
} 