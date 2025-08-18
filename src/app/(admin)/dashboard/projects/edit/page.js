"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ProjectForm } from '../components/ProjectForm';
import { 
    useProjects, 
    useProjectCategories, 
    useProjectClients,
    useProjectTechStack,
    useProjectStories,
    useProjectImages
} from '@/hooks/useProject';

export default function EditProjectPage() {
    const router = useRouter();
    const params = useParams();
    const projectId = params.id;

    const { 
        fetchProjects, 
        fetchProjectById
    } = useProjects();
    const { fetchCategories } = useProjectCategories();
    const { fetchClients } = useProjectClients();
    const { fetchTechStacks } = useProjectTechStack();
    const { fetchProjectStories } = useProjectStories();
    const { fetchProjectImagesByProjectId } = useProjectImages();

    const [initialData, setInitialData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadProjectData = async () => {
            try {
                setIsLoading(true);
                
                // Fetch all necessary data
                await Promise.all([
                    fetchProjects(),
                    fetchCategories(),
                    fetchClients(),
                    fetchTechStacks()
                ]);

                // Fetch specific project details
                const project = await fetchProjectById(projectId);

                if (!project) {
                    router.push('/dashboard/projects');
                    return;
                }

                // Fetch additional project details
                await Promise.all([
                    fetchProjectStories(projectId),
                    fetchProjectImagesByProjectId(projectId)
                ]);

                // Prepare initial data for the form
                setInitialData({
                    title: project.title || '',
                    short_description: project.short_description || '',
                    description: project.description || '',
                    cover_image: project.cover_image || '',
                    year: project.year || new Date().getFullYear(),
                    category_id: project.category_id || '',
                    client_id: project.client_id || '',
                    website_url: project.website_url || '',
                    status: project.status || 'In Progress',
                    tech_stack: project.tech_stack?.map(ts => ({ tech_id: ts.tech_id })) || [],
                    stories: project.stories || [],
                    images: project.images || [],
                    highlights: project.highlights || []
                });
            } catch (error) {
                console.error('Error loading project data:', error);
                router.push('/dashboard/projects');
            } finally {
                setIsLoading(false);
            }
        };

        if (projectId) {
            loadProjectData();
        }
    }, [projectId, fetchProjects, fetchProjectById, fetchCategories, fetchClients, fetchTechStacks, fetchProjectStories, fetchProjectImagesByProjectId, router]);

    if (isLoading) {
        return <div>Loading project details...</div>;
    }

    if (!initialData) {
        return <div>Project not found</div>;
    }

    return (
        <ProjectForm 
            initialData={initialData} 
            mode="edit" 
            projectId={projectId} 
        />
    );
}
