"use client";

import { motion } from "motion/react";

export default function KeyFeaturesSection({ project }) {
    // Check if project key features exist
    const keyFeatures = project?.stories[0]?.content?.keyFeatures?.features;
    const featureInnovation = project?.stories[0]?.content?.keyFeatures?.featureInnovation;
    const competitiveAdvantage = project?.stories[0]?.content?.keyFeatures?.competitiveAdvantage;

    // Only render if key features exist and are not empty
    if (!keyFeatures || keyFeatures.length === 0) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-16 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 md:p-12"
        >
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 font-heading">
                    Key Features
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {keyFeatures.map((feature, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
                        </div>
                    ))}
                </div>

                {(featureInnovation || competitiveAdvantage) && (
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {featureInnovation && (
                            <div>
                                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    Feature Innovation
                                </h3>
                                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                                    {featureInnovation.map((innovation, index) => (
                                        <li key={index}>{innovation}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {competitiveAdvantage && (
                            <div>
                                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <div className="w-8 h-8 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-pink-600 dark:text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    Competitive Advantage
                                </h3>
                                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                                    {competitiveAdvantage.map((advantage, index) => (
                                        <li key={index}>{advantage}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
} 