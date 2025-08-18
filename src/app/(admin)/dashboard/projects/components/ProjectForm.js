"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import ReactDOM from 'react-dom/client';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";

// Import hooks
import { 
    useProjects, 
    useProjectCategories, 
    useProjectClients, 
    useProjectTechStack,
    useProjectStories,
    useProjectImages,
} from '@/hooks/useProject';

// Import storage utilities
import { storageUtils } from '@/utils/storage';
import { slugify } from '@/utils/slugify';

// Import form components
import { BasicProjectDetails } from './form/BasicProjectDetails';
import { TechStackSection } from './form/TechStackSection';
import { StoriesSection } from './form/StoriesSection';
import { ImagesSection } from './form/ImagesSection';
import { HighlightsSection } from './form/HighlightsSection';

export const ProjectForm = ({
    initialData = {
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
    },
    mode = 'add',
    projectId = null
}) => {
    const router = useRouter();

    // Use project-related hooks
    const { createProject, updateProject } = useProjects();
    const { categories, fetchCategories } = useProjectCategories();
    const { clients, fetchClients } = useProjectClients();
    const { techStacks, fetchTechStacks } = useProjectTechStack();
    const { addProjectStory, bulkAddProjectStories } = useProjectStories();
    const { uploadProjectImage, bulkUploadProjectImages } = useProjectImages();

    const [projectData, setProjectData] = useState(initialData);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchCategories();
        fetchClients();
        fetchTechStacks();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Tech Stack Management
    const addTechStack = () => {
        setProjectData(prev => ({
            ...prev,
            tech_stack: [...prev.tech_stack, { tech_id: '' }]
        }));
    };

    const updateTechStack = (index, field, value) => {
        const newTechStack = [...projectData.tech_stack];
        newTechStack[index][field] = value;
        setProjectData(prev => ({
            ...prev,
            tech_stack: newTechStack
        }));
    };

    const removeTechStack = (index) => {
        const newTechStack = projectData.tech_stack.filter((_, i) => i !== index);
        setProjectData(prev => ({
            ...prev,
            tech_stack: newTechStack
        }));
    };

    // Stories Management
    const addStory = () => {
        setProjectData(prev => ({
            ...prev,
            stories: [...prev.stories, {
                story_section: '',
                content: {
                    whyWeBuilt: {
                        description: '',
                        clientNeed: '',
                        strategicGoals: []
                    },
                    problemsSolved: {
                        problems: [],
                        challengeComplexity: '',
                        solutionInnovation: []
                    },
                    developmentProcess: {
                        planning: [],
                        design: [],
                        processApproach: [],
                        keyMethodologies: []
                    },
                    keyFeatures: {
                        features: [],
                        featureInnovation: [],
                        competitiveAdvantage: []
                    },
                    performanceResults: {
                        performanceScore: null,
                        loadTime: '',
                        accessibility: null,
                        performanceMetrics: [],
                        technicalAchievements: []
                    },
                    clientResults: {
                        businessImpact: [],
                        userExperience: []
                    }
                }
            }]
        }));
    };

    const updateStory = (index, section, field, value) => {
        const newStories = [...projectData.stories];
        
        // Handle different types of updates
        if (Array.isArray(newStories[index].content[section][field])) {
            // For array fields, handle adding/removing/updating array items
            if (typeof value === 'string' && value.trim() === '') {
                // Remove empty items
                newStories[index].content[section][field] =
                    newStories[index].content[section][field].filter(item => item.trim() !== '');
            } else {
                // Add or update array
                newStories[index].content[section][field] = value;
            }
        } else {
            // For simple fields, directly update
            newStories[index].content[section][field] = value;
        }

        setProjectData(prev => ({
            ...prev,
            stories: newStories
        }));
    };

    const removeStory = (index) => {
        const newStories = projectData.stories.filter((_, i) => i !== index);
        setProjectData(prev => ({
            ...prev,
            stories: newStories
        }));
    };

    // Images Management
    const removeImage = (index) => {
        const newImages = projectData.images.filter((_, i) => i !== index)
            .map((img, idx) => ({ ...img, image_order: idx }));
        setProjectData(prev => ({
            ...prev,
            images: newImages
        }));
    };

    // Highlights Management
    const addHighlight = () => {
        setProjectData(prev => ({
            ...prev,
            highlights: [...prev.highlights, '']
        }));
    };

    const updateHighlight = (index, value) => {
        const newHighlights = [...projectData.highlights];
        newHighlights[index] = value;
        setProjectData(prev => ({
            ...prev,
            highlights: newHighlights
        }));
    };

    const removeHighlight = (index) => {
        const newHighlights = projectData.highlights.filter((_, i) => i !== index);
        setProjectData(prev => ({
            ...prev,
            highlights: newHighlights
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const confirmSubmit = await new Promise((resolve) => {
                const ConfirmSubmitDialog = () => (
                    <AlertDialog open={true} onOpenChange={(open) => !open && resolve(false)}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    {mode === 'add' ? 'Add New Project' : 'Update Project'}
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Are you sure you want to {mode === 'add' ? 'add' : 'update'} this project?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel onClick={() => resolve(false)}>
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction onClick={() => resolve(true)}>
                                    Confirm
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                );

                // Render the dialog and wait for user response
                const dialogRoot = document.getElementById('dialog-root');
                const root = ReactDOM.createRoot(dialogRoot);
                root.render(<ConfirmSubmitDialog />);
            });

            // Unmount the dialog after user interaction
            const dialogRoot = document.getElementById('dialog-root');
            ReactDOM.createRoot(dialogRoot).unmount();

            if (!confirmSubmit) {
                setIsSubmitting(false);
                return;
            }

            // Upload cover image if pending
            let coverImageUrl = projectData.cover_image;
            if (projectData.pendingCoverImage) {
                const uploadPath = 'company_profile/images/projects/' + slugify(projectData.title) + "/cover.png"
                const uploadedFile = await storageUtils.uploadFile(
                    projectData.pendingCoverImage,
                    'projects',
                    uploadPath
                );
                console.log("UPLOADED FILE:", uploadedFile)
                coverImageUrl = storageUtils.getPublicUrl('projects', uploadPath);
            }

            // Upload project images if pending
            let uploadedProjectImages = [...projectData.images];
            if (projectData.pendingProjectImages && projectData.pendingProjectImages.length > 0) {
                const uploadPromises = projectData.pendingProjectImages.map(async (pendingImage, index) => {
                    const uploadPath = 'company_profile/images/projects/' + slugify(projectData.title) + pendingImage.file.name
                    const uploadedFile = await storageUtils.uploadFile(
                        pendingImage.file,
                        'projects',
                        uploadPath
                    );
                    console.log("UPLOADED FILE2:", uploadedFile)
                    const publicUrl = storageUtils.getPublicUrl('projects', uploadPath);

                    return {
                        image_url: publicUrl,
                        image_title: pendingImage.file.name,
                        image_order: index
                    };
                });

                const newUploadedImages = await Promise.all(uploadPromises);
                uploadedProjectImages = [...uploadedProjectImages, ...newUploadedImages];
            }

            // Prepare project data for submission
            const processedProjectData = {
                title: projectData.title,
                short_description: projectData.short_description,
                description: projectData.description,
                cover_image: coverImageUrl,
                year: projectData.year,
                category_id: projectData.category_id,
                client_id: projectData.client_id,
                website_url: projectData.website_url,
                status: projectData.status,
                highlights: projectData.highlights,
                tech_stack: projectData.tech_stack.map(tech => tech.tech_id),
            };

            // Remove temporary upload-related properties
            delete processedProjectData.pendingCoverImage;
            delete processedProjectData.pendingProjectImages;

            let createdProject;
            if (mode === 'add') {
                createdProject = await createProject(processedProjectData);
                toast.success('Project added successfully');
            } else {
                createdProject = await updateProject(projectId, processedProjectData);
                toast.success('Project updated successfully');
            }

            // Bulk add related data if project was successfully created/updated
            if (createdProject) {
                const projectId = createdProject.id;

                // Bulk add stories if any
                if (projectData.stories.length > 0) {
                    const processedStories = projectData.stories.map(story => ({
                        project_id: projectId,
                        content: JSON.stringify({
                            story_section: story.story_section,
                            content: story.content
                        })
                    }));
                    await bulkAddProjectStories(projectId, processedStories);
                }

                // Bulk add images if any
                if (uploadedProjectImages.length > 0) {
                    const processedImages = uploadedProjectImages.map(img => ({
                        project_id: projectId,
                        image_url: img.image_url,
                        image_title: img.image_title,
                        image_order: img.image_order
                    }));
                    await bulkUploadProjectImages(projectId, processedImages);
                }
            }

            router.push('/dashboard/projects');
        } catch (error) {
            toast.error(`Failed to ${mode} project`);
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">
                {mode === 'add' ? 'Add New Project' : 'Edit Project'}
            </h1>

            <Card>
                <CardHeader>
                    <CardTitle>Project Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <BasicProjectDetails
                            projectData={projectData}
                            categories={categories}
                            clients={clients}
                            handleChange={handleChange}
                            setProjectData={setProjectData}
                        />

                        <TechStackSection
                            projectData={projectData}
                            techStacks={techStacks}
                            addTechStack={addTechStack}
                            updateTechStack={updateTechStack}
                            removeTechStack={removeTechStack}
                        />

                        <StoriesSection
                            projectData={projectData}
                            addStory={addStory}
                            updateStory={updateStory}
                            removeStory={removeStory}
                            setProjectData={setProjectData}
                        />

                        <ImagesSection
                            projectData={projectData}
                            removeImage={removeImage}
                            setProjectData={setProjectData}
                        />

                        <HighlightsSection
                            projectData={projectData}
                            addHighlight={addHighlight}
                            updateHighlight={updateHighlight}
                            removeHighlight={removeHighlight}
                        />

                        {/* Submit Buttons */}
                        <div className="flex justify-end space-x-4 mt-6">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.push('/dashboard/projects')}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {mode === 'add' ? 'Add Project' : 'Update Project'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}; 