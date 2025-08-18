"use client";

import { motion } from "motion/react";

export default function BuildStorySection({ project }) {
    // Check if project stories exist and have content
    const stories = project?.stories[0];
    const hasStories = stories && Object.keys(stories).length > 0;

    // If no stories, return null
    if (!hasStories) {
        return null;
    }

    // Extract specific story sections
    const whyWeBuilt = stories.content.whyWeBuilt || {};
    const problemsSolved = stories.content.problemsSolved || {};

    // If no specific story sections exist, return null
    if (!whyWeBuilt.description && (!problemsSolved.problems || problemsSolved.problems.length === 0)) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 md:p-12"
        >
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 font-heading">
                    Build Story
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Why We Built This */}
                    {whyWeBuilt.description && (
                        <div>
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                Why We Built This
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                                {whyWeBuilt.description}
                            </p>
                            {whyWeBuilt.clientNeed && (
                                <div className="mb-4">
                                    <span className="font-semibold text-gray-800 dark:text-gray-200 block mb-1">Client Need: </span>
                                    <span className="text-gray-700 dark:text-gray-300 block">{whyWeBuilt.clientNeed}</span>
                                </div>
                            )}
                            {whyWeBuilt.strategicGoals && (
                                <div>
                                    <span className="font-semibold text-gray-800 dark:text-gray-200 block mb-1">Strategic Goals: </span>
                                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                                        {whyWeBuilt.strategicGoals.map((goal, index) => (
                                            <li key={index}>{goal}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Problems Solved */}
                    {problemsSolved.problems && problemsSolved.problems.length > 0 && (
                        <div>
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                Problems We Solved
                            </h3>
                            <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                                {problemsSolved.problems.map((problem, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <div className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                        <span>{problem}</span>
                                    </li>
                                ))}
                            </ul>
                            {problemsSolved.challengeComplexity && (
                                <div className="mb-4">
                                    <span className="font-semibold text-gray-800 dark:text-gray-200 block mb-1">Challenge Complexity: </span>
                                    <span className="text-gray-700 dark:text-gray-300 block">{problemsSolved.challengeComplexity}</span>
                                </div>
                            )}
                            {problemsSolved.solutionInnovation && (
                                <div>
                                    <span className="font-semibold text-gray-800 dark:text-gray-200 block mb-1">Solution Innovation: </span>
                                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                                        {problemsSolved.solutionInnovation.map((solution, index) => (
                                            <li key={index}>{solution}</li>
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