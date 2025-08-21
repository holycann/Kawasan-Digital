"use client";

import Link from "next/link";
import { FaArrowLeft, FaCalendar, FaCode, FaLink } from "react-icons/fa6";
import { motion } from "motion/react";

export default function ProjectHeader({ project, onWebsiteVisit }) {
    return (
        <div>
            <div className="mb-6">
                <Link
                    href="/portfolio"
                    className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline group"
                >
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    Back to Portfolio
                </Link>
            </div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {/* Project Category and Year */}
                <div className="mb-2 flex items-center gap-2">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                        {project.category.name}
                    </span>
                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                        <FaCalendar size={12} />
                        <span>{project.year}</span>
                    </div>
                </div>

                {/* Project Title */}
                <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 font-heading">
                    {project.title}
                </h1>

                {/* Project Description */}
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed text-justify">
                    {project.description}
                </p>

                {/* Technologies Used */}
                {project.tech_stack?.length > 0 && (
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-3">
                            <FaCode className="text-blue-600 dark:text-blue-400" />
                            <h2 className="text-xl font-semibold">Technologies Used</h2>
                        </div>
                        <ul className="flex flex-wrap gap-2">
                            {project.tech_stack.map((tech) => (
                                <li
                                    key={tech.id}
                                    className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                >
                                    {tech.tech.tech_name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Project Highlights */}
                {project.highlights && project.highlights.length > 0 && (   
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-3">Project Highlights</h2>
                        <ul className="space-y-2">
                            {project.highlights.map((highlight, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <div className="mt-1 rounded-full p-1 bg-green-100 dark:bg-green-900/30">
                                        <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Website Link */}
                {project.website_url && (
                    <div className="flex gap-4">
                        <a
                            href={project.website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                            onClick={onWebsiteVisit}
                        >
                            Visit Website
                            <FaLink size={12} />
                        </a>
                    </div>
                )}
            </motion.div>
        </div>
    );
} 