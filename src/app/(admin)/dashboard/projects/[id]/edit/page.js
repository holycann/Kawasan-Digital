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

    const { projects } = useProjects();

    const [initialData, setInitialData] = useState({
        title: '',
        short_description: '',
        description: '',
        year: new Date().getFullYear(),
        category: '',
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

    // Helper function to safely extract story content
    const extractStoryContent = (content) => {
        // If content is an object, try to extract meaningful text
        if (typeof content === 'object' && content !== null) {
            // Check for common text-containing properties
            if (content.text) return content.text;
            if (content.content) return content.content;
            if (content.description) return content.description;

            // If no clear text property, convert to string as a fallback
            try {
                return JSON.stringify(content, null, 2);
            } catch {
                return '';
            }
        }

        // If already a string, return as-is
        return content || '';
    };

    useEffect(() => {
        const loadProjectData = async () => {
            try {

                if (!project) {
                    router.push('/dashboard/projects');
                    return;
                }

                // Normalize the project data to match ProjectForm's expected structure
                const normalizedData = {
                    title: project.project.title || '',
                    short_description: project.project.short_description || '',
                    description: project.project.description || '',
                    year: project.project.year || new Date().getFullYear(),
                    category: project.project.category.id || '',
                    client_id: project.project.client.id || '',
                    website_url: project.project.website_url || '',
                    status: project.project.status || 'In Progress',
                    tech_stack: project.techStack?.map(tech => ({
                        tech_stack_id: tech.tech_stack.id,
                        tech_role: tech.tech_stack.tech_role || ''
                    })) || [],
                    stories: project.stories?.map(story => ({
                        story_section: story.story_section || '',
                        story_type: story.story_type || '',
                        story_content: extractStoryContent(story.story_content),
                        story_impact: extractStoryContent(story.story_impact)
                    })) || [],
                    images: project.images?.map(image => ({
                        image_url: image.image_url || '',
                        image_title: image.image_title || '',
                        image_type: image.image_type || ''
                    })) || [],
                    highlights: project.highlights?.map(highlight => ({
                        highlight_text: highlight.highlight_text || '',
                        highlight_type: highlight.highlight_type || '',
                        highlight_impact: highlight.highlight_impact || ''
                    })) || []
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

        loadProjectData();
    }, [projectId, router]);

    if (error) {
        return null; // Redirected by router
    }

    if (loading) {
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