"use client";

import { notFound } from "next/navigation";
import dynamic from 'next/dynamic';

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
        loading
    } = useProjects();

    // Find the project based on the title (URL-decoded)
    const project = projects.find((p) => slugify(p.title) === name);


    if (!project) {
        notFound();
    }

    // Find related projects (same category, excluding current)
    const relatedProjects = projects
        .filter(item => item.category.name === project.category.name && item.id !== project.id)
        .slice(0, 3);

    // Ensure project is loaded before rendering
    if (loading) {
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