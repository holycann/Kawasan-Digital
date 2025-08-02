"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ProjectForm } from '../../../components/ProjectForm';
import { ProjectHooks } from '@/providers/projects';

export default function EditProjectPage() {
    const params = useParams();
    const projectId = params.id;

    const { 
        useProjects, 
        useProjectCategories, 
        useProjectClients 
    } = ProjectHooks;

    const { projects, fetchProjects } = useProjects();
    const { fetchCategories } = useProjectCategories();
    const { fetchClients } = useProjectClients();

    const [initialData, setInitialData] = useState(null);

    useEffect(() => {
        fetchProjects();
        fetchCategories();
        fetchClients();
    }, []);

    useEffect(() => {
        const project = projects.find(p => p.id === projectId);
        if (project) {
            setInitialData({
                title: project.title || '',
                short_description: project.short_description || '',
                description: project.description || '',
                year: project.year || new Date().getFullYear(),
                category: project.category || '',
                client_id: project.client_id || '',
                website_url: project.website_url || '',
                project_location: project.project_location || '',
                project_status: project.project_status || 'In Progress'
            });
        }
    }, [projects, projectId]);

    if (!initialData) {
        return <div>Loading...</div>;
    }

    return <ProjectForm 
        initialData={initialData} 
        mode="edit" 
        projectId={projectId} 
    />;
}
