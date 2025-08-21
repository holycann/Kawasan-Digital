"use client";

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useProjects } from '@/hooks/useProject';

import ProjectHeader from './components/ProjectHeader';
import ProjectDetailsCards from './components/ProjectDetailsCards';
import ProjectDescription from './components/ProjectDescription';
import ProjectWebsite from './components/ProjectWebsite';
import ProjectTechStack from './components/ProjectTechStack';
import ProjectImages from './components/ProjectImages';
import ProjectHighlights from './components/ProjectHighlights';
import ProjectStories from './components/ProjectStories';

export default function ProjectDetailsPage() {
    const params = useParams();
    const projectId = params.id;

    const { projects, fetchProjects, loading } = useProjects();

    useEffect(() => {
        const getProjects = async () => {
            await fetchProjects()
        }

        if (projects.length === 0) {
            getProjects()
        }
    }, [projects, fetchProjects])

    const project = projects.find(project => project.id === projectId);

    if (loading || !project) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white dark:bg-black">
                <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <ProjectHeader project={project} projectId={projectId} />
            <ProjectDetailsCards project={project} />
            <ProjectDescription project={project} />
            <ProjectWebsite project={project} />
            <ProjectTechStack project={project} />
            <ProjectImages project={project} />
            <ProjectHighlights project={project} />
            <ProjectStories project={project} />
        </div>
    );
}
