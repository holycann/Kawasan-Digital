"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ProjectForm } from '../../components/ProjectForm';
import { IconLoader2 } from '@tabler/icons-react';
import { useProjects } from '@/hooks/useProject';

export default function EditProjectPage() {
    const params = useParams();
    const router = useRouter();
    const projectId = params.id;

    const { projects, fetchProjects, loading: projectsLoading } = useProjects();

    const [initialData, setInitialData] = useState({
        title: '',
        short_description: '',
        description: '',
        cover_image: '',
        year: new Date().getFullYear(),
        category_id: '',
        client_id: '',
        website_url: '',
        status: 'In Progress',
        tech_stack: [],
        stories: [],
        images: [],
        highlights: []
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProjects = async () => {
            await fetchProjects();
        }

        if (projects.length === 0) {
            getProjects();
        }
    }, [projects, fetchProjects]);

    useEffect(() => {
        const loadProjectData = async () => {
            try {
                const project = projects.find(p => p.id === projectId);

                if (!project) {
                    router.push('/dashboard/projects');
                    return;
                }

                // Normalize the project data to match ProjectForm's expected structure
                const normalizedData = {
                    title: project.title || '',
                    short_description: project.short_description || '',
                    description: project.description || '',
                    cover_image: project.cover_image || '',
                    year: project.year || new Date().getFullYear(),
                    category_id: project.category.id || '',
                    client_id: project.client.id || '',
                    website_url: project.website_url || '',
                    status: project.status || 'In Progress',
                    tech_stack: project.techStack?.map(tech => ({
                        tech_stack_id: tech.tech_stack.id,
                        tech_role: tech.tech_stack.tech_role || ''
                    })) || [],
                    stories: project.stories?.map(story => ({
                        content: story.content || {}
                    })) || [],
                    images: project.images?.map(image => ({
                        image_url: image.image_url || '',
                        image_title: image.image_title || '',
                        image_order: image.image_order || 0
                    })) || [],
                    highlights: project.highlights?.map(highlight => highlight) || []
                };

                setInitialData(normalizedData);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch project data:', error);
                setError(error);
                setLoading(false);
                router.push('/dashboard/projects');
            }
        };

        if (projects.length > 0) {
            loadProjectData();
        }
    }, [projectId, router, projects]);

    if (error) {
        return null; // Redirected by router
    }

    if (loading || projectsLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <IconLoader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return <ProjectForm
        initialData={initialData}
        mode="edit"
        projectId={projectId}
    />;
}