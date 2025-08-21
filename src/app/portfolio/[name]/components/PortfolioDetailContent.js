"use client";

import { notFound } from "next/navigation";
import dynamic from 'next/dynamic';
import { useEffect, useState } from "react";

import { slugify } from "@/utils/slugify";

import ProjectHeader from './ProjectHeader';
import ProjectImages from './ProjectImages';
import BuildStorySection from './BuildStorySection';
import DevelopmentProcessSection from './DevelopmentProcessSection';
import KeyFeaturesSection from './KeyFeaturesSection';
import ClientResultsSection from './ClientResultsSection';
import RelatedProjectsSection from './RelatedProjectsSection';
import { useProjects } from "@/hooks/useProject";

const Spotlight = dynamic(() => import('@/components/ui/spotlight').then((mod) => mod.Spotlight), {
    loading: () => <div className="w-full h-full bg-transparent"></div>,
    ssr: true,
});

export default function PortfolioDetailContent({ name }) {
    // Initialize all project-related hooks
    const {
        projects,
        fetchProjects,
        loading
    } = useProjects();

    // Add a local state to track initial fetch attempt
    const [initialFetchAttempted, setInitialFetchAttempted] = useState(false);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                // Only fetch if projects are empty and we haven't attempted fetch yet
                if (projects.length === 0 && !initialFetchAttempted) {
                    await fetchProjects();
                }
                setInitialFetchAttempted(true);
            } catch (error) {
                console.error("Failed to fetch projects:", error);
                setInitialFetchAttempted(true);
            }
        };

        loadProjects();
    }, [projects.length, fetchProjects, initialFetchAttempted]);

    // Find the project based on the title (URL-decoded)
    const project = projects.find((p) => slugify(p.title) === name);

    // If project is not found and we've already attempted to fetch, trigger 404
    if (!project && initialFetchAttempted) {
        notFound();
    }

    // Find related projects (same category, excluding current)
    const relatedProjects = project
        ? projects
            .filter(item => item.category.name === project.category.name && item.id !== project.id)
            .slice(0, 3)
        : [];

    // Ensure project is loaded before rendering
    if (loading || !initialFetchAttempted) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <>
            {project && (
                <article className="pt-24 pb-16 bg-white dark:bg-black min-h-screen">
                    <Spotlight
                        className="max-w-7xl mx-auto px-4 md:px-6 relative z-10"
                        fill="rgba(59, 130, 246, 0.15)"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                            <ProjectImages project={project} />
                            <ProjectHeader
                                project={project}
                                onWebsiteVisit={() => {/* Optional tracking logic */ }}
                            />
                        </div>

                        <BuildStorySection project={project} />
                        <DevelopmentProcessSection project={project} />
                        <KeyFeaturesSection project={project} />
                        <ClientResultsSection project={project} />
                        <RelatedProjectsSection relatedProjects={relatedProjects} />
                    </Spotlight>
                </article>
            )}
        </>
    );
} 