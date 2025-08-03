"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { TechStackForm } from '../../components/TechStackForm';
import { ProjectHooks } from '@/providers/projects';

export default function EditTechStackPage() {
    const params = useParams();
    const techStackId = params.id;

    const { useProjectTechStack } = ProjectHooks;
    const { techStacks, fetchTechStacks } = useProjectTechStack();

    const [initialData, setInitialData] = useState(null);

    useEffect(() => {
        fetchTechStacks();
    }, []);

    useEffect(() => {
        const techStack = techStacks.find(tech => tech.id === techStackId);
        if (techStack) {
            setInitialData({
                tech_name: techStack.tech_name || '',
                tech_category: techStack.tech_category || '',
                tech_version: techStack.tech_version || '',
                tech_role: techStack.tech_role || '',
            });
        }
    }, [techStacks, techStackId]);

    if (!initialData) {
        return <div>Loading...</div>;
    }

    return <TechStackForm 
        initialData={initialData} 
        mode="edit" 
        techStackId={techStackId} 
    />;
}
