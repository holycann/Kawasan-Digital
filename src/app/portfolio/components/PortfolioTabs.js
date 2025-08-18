"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import PortfolioCard from "@/app/components/PortfolioCard";
import dynamic from 'next/dynamic';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useProjects } from "@/hooks/useProject";

const AnimatedTabs = dynamic(() => import('@/components/ui/animated-tabs').then((mod) => mod.AnimatedTabs), {
    loading: () => <div className="w-full h-12 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-full"></div>,
    ssr: false,
});

export default function PortfolioTabs() {
    const { projects, fetchProjects, loading: projectsLoading } = useProjects();

    useEffect(() => {
        const fetchData = async () => {
            if (projects.length === 0) {
                await fetchProjects();
            }
        };

        fetchData();
    }, []);

    // Filter categories to only include those with projects
    const categoriesWithProjects = [...new Set(projects.map(project => project.category?.name))]
        .filter(Boolean)
        .sort((a, b) => {
            const countA = projects.filter(project => project.category?.name === a).length;
            const countB = projects.filter(project => project.category?.name === b).length;
            return countB - countA;
        });

    const categories = ["All", ...categoriesWithProjects];

    const [activeTab, setActiveTab] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    // Filter items based on active tab and sort by year (most recent first)
    const filteredItems = (activeTab === "All"
        ? projects
        : projects.filter(item => item.category.name === activeTab))
        .sort((a, b) => b.year - a.year);

    // Calculate pagination
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredItems.slice(startIndex, endIndex);

    // Reset to page 1 when changing tabs
    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab]);

    if (projectsLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
            </div>
        );
    }

    // Create tabs for AnimatedTabs component
    const tabs = categories.map(category => ({
        id: category,
        label: category,
        content: (
            <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                    {currentItems.map((item) => (
                        <motion.div
                            key={`${category}-${item.id}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <PortfolioCard item={item} />
                        </motion.div>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FaChevronLeft size={14} />
                            Previous
                        </button>

                        <div className="flex items-center gap-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={`page-${page}`}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${currentPage === page
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                            <FaChevronRight size={14} />
                        </button>
                    </div>
                )}

                {/* Page info */}
                <div className="text-center text-gray-600 dark:text-gray-400 mt-4">
                    Showing {startIndex + 1}-{Math.min(endIndex, filteredItems.length)} of {filteredItems.length} projects
                </div>
            </div>
        ),
    }));

    return (
        <AnimatedTabs
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabsContainerClassName="justify-center mb-12"
        />
    );
} 