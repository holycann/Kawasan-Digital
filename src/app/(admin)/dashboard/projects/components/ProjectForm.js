"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { ProjectHooks } from '@/providers/projects';
import { toast } from 'sonner';
import { IconPlus, IconTrash } from "@tabler/icons-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import ReactDOM from 'react-dom/client';

export const ProjectForm = ({
    initialData = {
        title: '',
        short_description: '',
        description: '',
        year: new Date().getFullYear(),
        category: '',
        client_id: '',
        website_url: '',
        project_location: '',
        project_status: 'In Progress',
        tech_stack: [],
        stories: [],
        images: [],
        highlights: []
    },
    mode = 'add',
    projectId = null
}) => {
    const router = useRouter();
    const {
        useProjects,
        useProjectCategories,
        useProjectClients,
        useProjectTechStack
    } = ProjectHooks;

    const { createProject, updateProject } = useProjects();
    const { categories, fetchCategories } = useProjectCategories();
    const { clients, fetchClients } = useProjectClients();
    const { techStacks, fetchTechStacks } = useProjectTechStack();

    const [projectData, setProjectData] = useState(initialData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);

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
            tech_stack: [...prev.tech_stack, { tech_stack_id: '', tech_role: '' }]
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
                story_type: '',
                story_content: {
                    challenge: '',
                    solution: '',
                    technicalDetails: ''
                },
                story_impact: {
                    businessImpact: '',
                    quantitativeResults: '',
                    clientFeedback: ''
                }
            }]
        }));
    };

    const updateStory = (index, field, value) => {
        const newStories = [...projectData.stories];
        newStories[index][field] = value;
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
    const addImage = () => {
        setProjectData(prev => ({
            ...prev,
            images: [...prev.images, {
                image_url: '',
                image_title: '',
                image_type: ''
            }]
        }));
    };

    const updateImage = (index, field, value) => {
        const newImages = [...projectData.images];
        newImages[index][field] = value;
        setProjectData(prev => ({
            ...prev,
            images: newImages
        }));
    };

    const removeImage = (index) => {
        const newImages = projectData.images.filter((_, i) => i !== index);
        setProjectData(prev => ({
            ...prev,
            images: newImages
        }));
    };

    // Highlights Management
    const addHighlight = () => {
        setProjectData(prev => ({
            ...prev,
            highlights: [...prev.highlights, {
                highlight_text: '',
                highlight_type: '',
                highlight_impact: ''
            }]
        }));
    };

    const updateHighlight = (index, field, value) => {
        const newHighlights = [...projectData.highlights];
        newHighlights[index][field] = value;
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

            const processedProjectData = {
                ...projectData,
                category_id: projectData.category
            };

            delete processedProjectData.category;
            delete processedProjectData.highlights;
            delete processedProjectData.images;
            delete processedProjectData.stories;
            delete processedProjectData.tech_stack;

            console.log("PROJECT DATA:", processedProjectData)

            if (mode === 'add') {
                await createProject(processedProjectData);
                toast.success('Project added successfully');
            } else {
                await updateProject(projectId, processedProjectData);
                toast.success('Project updated successfully');
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
                        {/* Basic Project Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label>Project Title</Label>
                                <Input
                                    name="title"
                                    value={projectData.title}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter project title"
                                />
                            </div>
                            <div>
                                <Label>Project Year</Label>
                                <Input
                                    name="year"
                                    type="number"
                                    value={projectData.year}
                                    onChange={handleChange}
                                    required
                                    placeholder="Project year"
                                />
                            </div>
                        </div>

                        <div>
                            <Label>Short Description</Label>
                            <Textarea
                                name="short_description"
                                value={projectData.short_description}
                                onChange={handleChange}
                                placeholder="Brief project description"
                                rows={2}
                            />
                        </div>

                        <div>
                            <Label>Full Description</Label>
                            <Textarea
                                name="description"
                                value={projectData.description}
                                onChange={handleChange}
                                placeholder="Detailed project description"
                                rows={4}
                            />
                        </div>

                        {/* Category and Client */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label>Project Category</Label>
                                <Select
                                    name="category"
                                    value={projectData.category}
                                    onValueChange={(value) => setProjectData(prev => ({
                                        ...prev,
                                        category: value
                                    }))}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select project category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map(category => (
                                            <SelectItem
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label>Client</Label>
                                <Select
                                    name="client_id"
                                    value={projectData.client_id}
                                    onValueChange={(value) => setProjectData(prev => ({
                                        ...prev,
                                        client_id: value
                                    }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select client" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {clients.map(client => (
                                            <SelectItem
                                                key={client.id}
                                                value={client.id}
                                            >
                                                {client.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Additional Project Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label>Website URL</Label>
                                <Input
                                    name="website_url"
                                    type="url"
                                    value={projectData.website_url}
                                    onChange={handleChange}
                                    placeholder="https://example.com"
                                />
                            </div>
                            <div>
                                <Label>Project Location</Label>
                                <Input
                                    name="project_location"
                                    value={projectData.project_location}
                                    onChange={handleChange}
                                    placeholder="Enter project location"
                                />
                            </div>
                        </div>

                        <div>
                            <Label>Project Status</Label>
                            <Select
                                name="project_status"
                                value={projectData.project_status}
                                onValueChange={(value) => setProjectData(prev => ({
                                    ...prev,
                                    project_status: value
                                }))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select project status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                    <SelectItem value="On Hold">On Hold</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Tech Stack Section */}
                        <Card className="mt-4">
                            <CardHeader>
                                <CardTitle className="flex justify-between items-center">
                                    Tech Stack
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={addTechStack}
                                    >
                                        <IconPlus size={16} className="mr-2" /> Add Tech Stack
                                    </Button>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {projectData.tech_stack.map((tech, index) => (
                                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                        <div>
                                            <Label>Technology</Label>
                                            <Select
                                                value={tech.tech_stack_id}
                                                onValueChange={(value) => updateTechStack(index, 'tech_stack_id', value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select technology" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {techStacks.map(stack => (
                                                        <SelectItem
                                                            key={stack.id}
                                                            value={stack.id}
                                                        >
                                                            {stack.tech_name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label>Role</Label>
                                            <Input
                                                value={tech.tech_role}
                                                onChange={(e) => updateTechStack(index, 'tech_role', e.target.value)}
                                                placeholder="Technology role"
                                            />
                                        </div>
                                        <div className="flex items-end">
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => removeTechStack(index)}
                                            >
                                                <IconTrash size={16} />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Stories Section */}
                        <Card className="mt-4">
                            <CardHeader>
                                <CardTitle className="flex justify-between items-center">
                                    Project Stories
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={addStory}
                                    >
                                        <IconPlus size={16} className="mr-2" /> Add Story
                                    </Button>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {projectData.stories.map((story, index) => (
                                    <div key={index} className="space-y-4 mb-4 border-b pb-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label>Story Section</Label>
                                                <Select
                                                    value={story.story_section}
                                                    onValueChange={(value) => updateStory(index, 'story_section', value)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select story section" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="whyWeBuilt">Why We Built</SelectItem>
                                                        <SelectItem value="problemsSolved">Problems Solved</SelectItem>
                                                        <SelectItem value="developmentProcess">Development Process</SelectItem>
                                                        <SelectItem value="keyFeatures">Key Features</SelectItem>
                                                        <SelectItem value="performanceResults">Performance Results</SelectItem>
                                                        <SelectItem value="clientResults">Client Results</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label>Story Type</Label>
                                                <Input
                                                    value={story.story_type}
                                                    onChange={(e) => updateStory(index, 'story_type', e.target.value)}
                                                    placeholder="Story type"
                                                />
                                            </div>
                                        </div>

                                        {/* Dynamic Story Content Based on Section */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold">Story Content</h3>
                                            {story.story_section === 'whyWeBuilt' && (
                                                <div>
                                                    <Label>Description</Label>
                                                    <Textarea
                                                        value={story.story_content?.description || ''}
                                                        onChange={(e) => {
                                                            const updatedContent = {
                                                                ...(story.story_content || {}),
                                                                description: e.target.value
                                                            };
                                                            updateStory(index, 'story_content', updatedContent);
                                                        }}
                                                        placeholder="Describe the motivation behind the project"
                                                        rows={3}
                                                    />
                                                </div>
                                            )}

                                            {story.story_section === 'problemsSolved' && (
                                                <div>
                                                    <Label>Problems</Label>
                                                    <div className="space-y-2">
                                                        {(story.story_content?.problems || []).map((problem, problemIndex) => (
                                                            <div key={problemIndex} className="flex items-center space-x-2">
                                                                <Input
                                                                    value={problem}
                                                                    onChange={(e) => {
                                                                        const updatedProblems = [...(story.story_content?.problems || [])];
                                                                        updatedProblems[problemIndex] = e.target.value;
                                                                        updateStory(index, 'story_content', {
                                                                            ...(story.story_content || {}),
                                                                            problems: updatedProblems
                                                                        });
                                                                    }}
                                                                    placeholder="Describe a problem"
                                                                    className="flex-grow"
                                                                />
                                                                <Button
                                                                    type="button"
                                                                    variant="destructive"
                                                                    size="icon"
                                                                    onClick={() => {
                                                                        const updatedProblems = (story.story_content?.problems || [])
                                                                            .filter((_, i) => i !== problemIndex);
                                                                        updateStory(index, 'story_content', {
                                                                            ...(story.story_content || {}),
                                                                            problems: updatedProblems
                                                                        });
                                                                    }}
                                                                >
                                                                    <IconTrash size={16} />
                                                                </Button>
                                                            </div>
                                                        ))}
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => {
                                                                const updatedProblems = [
                                                                    ...(story.story_content?.problems || []),
                                                                    ''
                                                                ];
                                                                updateStory(index, 'story_content', {
                                                                    ...(story.story_content || {}),
                                                                    problems: updatedProblems
                                                                });
                                                            }}
                                                        >
                                                            <IconPlus size={16} className="mr-2" /> Add Problem
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}

                                            {story.story_section === 'developmentProcess' && (
                                                <div className="space-y-4">
                                                    <div>
                                                        <Label>Planning Steps</Label>
                                                        <Textarea
                                                            value={(story.story_content?.planning || []).join('\n')}
                                                            onChange={(e) => {
                                                                const updatedContent = {
                                                                    ...(story.story_content || {}),
                                                                    planning: e.target.value.split('\n').filter(p => p.trim() !== '')
                                                                };
                                                                updateStory(index, 'story_content', updatedContent);
                                                            }}
                                                            placeholder="List planning steps (one per line)"
                                                            rows={3}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label>Design Approach</Label>
                                                        <Textarea
                                                            value={(story.story_content?.design || []).join('\n')}
                                                            onChange={(e) => {
                                                                const updatedContent = {
                                                                    ...(story.story_content || {}),
                                                                    design: e.target.value.split('\n').filter(p => p.trim() !== '')
                                                                };
                                                                updateStory(index, 'story_content', updatedContent);
                                                            }}
                                                            placeholder="List design steps (one per line)"
                                                            rows={3}
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {story.story_section === 'keyFeatures' && (
                                                <div>
                                                    <Label>Features</Label>
                                                    {(story.story_content?.features || []).map((feature, featureIndex) => (
                                                        <div key={featureIndex} className="space-y-2 mb-4 p-4 border rounded">
                                                            <div>
                                                                <Label>Feature Title</Label>
                                                                <Input
                                                                    value={feature.title || ''}
                                                                    onChange={(e) => {
                                                                        const updatedFeatures = [...(story.story_content?.features || [])];
                                                                        updatedFeatures[featureIndex] = {
                                                                            ...updatedFeatures[featureIndex],
                                                                            title: e.target.value
                                                                        };
                                                                        updateStory(index, 'story_content', {
                                                                            ...(story.story_content || {}),
                                                                            features: updatedFeatures
                                                                        });
                                                                    }}
                                                                    placeholder="Feature title"
                                                                />
                                                            </div>
                                                            <div>
                                                                <Label>Feature Description</Label>
                                                                <Textarea
                                                                    value={feature.description || ''}
                                                                    onChange={(e) => {
                                                                        const updatedFeatures = [...(story.story_content?.features || [])];
                                                                        updatedFeatures[featureIndex] = {
                                                                            ...updatedFeatures[featureIndex],
                                                                            description: e.target.value
                                                                        };
                                                                        updateStory(index, 'story_content', {
                                                                            ...(story.story_content || {}),
                                                                            features: updatedFeatures
                                                                        });
                                                                    }}
                                                                    placeholder="Describe the feature"
                                                                    rows={2}
                                                                />
                                                            </div>
                                                            <div>
                                                                <Label>Feature Icon</Label>
                                                                <Input
                                                                    value={feature.icon || ''}
                                                                    onChange={(e) => {
                                                                        const updatedFeatures = [...(story.story_content?.features || [])];
                                                                        updatedFeatures[featureIndex] = {
                                                                            ...updatedFeatures[featureIndex],
                                                                            icon: e.target.value
                                                                        };
                                                                        updateStory(index, 'story_content', {
                                                                            ...(story.story_content || {}),
                                                                            features: updatedFeatures
                                                                        });
                                                                    }}
                                                                    placeholder="Icon name"
                                                                />
                                                            </div>
                                                            <Button
                                                                type="button"
                                                                variant="destructive"
                                                                size="sm"
                                                                onClick={() => {
                                                                    const updatedFeatures = (story.story_content?.features || [])
                                                                        .filter((_, i) => i !== featureIndex);
                                                                    updateStory(index, 'story_content', {
                                                                        ...(story.story_content || {}),
                                                                        features: updatedFeatures
                                                                    });
                                                                }}
                                                            >
                                                                Remove Feature
                                                            </Button>
                                                        </div>
                                                    ))}
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => {
                                                            const updatedFeatures = [
                                                                ...(story.story_content?.features || []),
                                                                { title: '', description: '', icon: '' }
                                                            ];
                                                            updateStory(index, 'story_content', {
                                                                ...(story.story_content || {}),
                                                                features: updatedFeatures
                                                            });
                                                        }}
                                                    >
                                                        Add Feature
                                                    </Button>
                                                </div>
                                            )}

                                            {story.story_section === 'performanceResults' && (
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <div>
                                                        <Label>Performance Score</Label>
                                                        <Input
                                                            type="number"
                                                            value={story.story_content?.performanceScore || ''}
                                                            onChange={(e) => {
                                                                const updatedContent = {
                                                                    ...(story.story_content || {}),
                                                                    performanceScore: Number(e.target.value)
                                                                };
                                                                updateStory(index, 'story_content', updatedContent);
                                                            }}
                                                            placeholder="Performance score"
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label>Load Time</Label>
                                                        <Input
                                                            value={story.story_content?.loadTime || ''}
                                                            onChange={(e) => {
                                                                const updatedContent = {
                                                                    ...(story.story_content || {}),
                                                                    loadTime: e.target.value
                                                                };
                                                                updateStory(index, 'story_content', updatedContent);
                                                            }}
                                                            placeholder="Load time (e.g., 0.8s)"
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label>Accessibility</Label>
                                                        <Input
                                                            type="number"
                                                            value={story.story_content?.accessibility || ''}
                                                            onChange={(e) => {
                                                                const updatedContent = {
                                                                    ...(story.story_content || {}),
                                                                    accessibility: Number(e.target.value)
                                                                };
                                                                updateStory(index, 'story_content', updatedContent);
                                                            }}
                                                            placeholder="Accessibility score"
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {story.story_section === 'clientResults' && (
                                                <div className="space-y-4">
                                                    <div>
                                                        <Label>Business Impact</Label>
                                                        <Textarea
                                                            value={(story.story_content?.businessImpact || []).join('\n')}
                                                            onChange={(e) => {
                                                                const updatedContent = {
                                                                    ...(story.story_content || {}),
                                                                    businessImpact: e.target.value.split('\n').filter(p => p.trim() !== '')
                                                                };
                                                                updateStory(index, 'story_content', updatedContent);
                                                            }}
                                                            placeholder="List business impacts (one per line)"
                                                            rows={3}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label>User Experience</Label>
                                                        <Textarea
                                                            value={(story.story_content?.userExperience || []).join('\n')}
                                                            onChange={(e) => {
                                                                const updatedContent = {
                                                                    ...(story.story_content || {}),
                                                                    userExperience: e.target.value.split('\n').filter(p => p.trim() !== '')
                                                                };
                                                                updateStory(index, 'story_content', updatedContent);
                                                            }}
                                                            placeholder="List user experience improvements (one per line)"
                                                            rows={3}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Dynamic Story Impact Based on Section */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold">Story Impact</h3>
                                            {story.story_section === 'whyWeBuilt' && (
                                                <div>
                                                    <Label>Client Need</Label>
                                                    <Input
                                                        value={story.story_impact?.clientNeed || ''}
                                                        onChange={(e) => {
                                                            const updatedImpact = {
                                                                ...(story.story_impact || {}),
                                                                clientNeed: e.target.value
                                                            };
                                                            updateStory(index, 'story_impact', updatedImpact);
                                                        }}
                                                        placeholder="Client's primary need"
                                                    />
                                                    <Label className="mt-2">Strategic Goals</Label>
                                                    <Textarea
                                                        value={(story.story_impact?.strategicGoals || []).join('\n')}
                                                        onChange={(e) => {
                                                            const updatedImpact = {
                                                                ...(story.story_impact || {}),
                                                                strategicGoals: e.target.value.split('\n').filter(p => p.trim() !== '')
                                                            };
                                                            updateStory(index, 'story_impact', updatedImpact);
                                                        }}
                                                        placeholder="List strategic goals (one per line)"
                                                        rows={2}
                                                    />
                                                </div>
                                            )}

                                            {/* Similar dynamic sections for other story sections */}
                                            {story.story_section === 'problemsSolved' && (
                                                <div>
                                                    <Label>Challenge Complexity</Label>
                                                    <Input
                                                        value={story.story_impact?.challengeComplexity || ''}
                                                        onChange={(e) => {
                                                            const updatedImpact = {
                                                                ...(story.story_impact || {}),
                                                                challengeComplexity: e.target.value
                                                            };
                                                            updateStory(index, 'story_impact', updatedImpact);
                                                        }}
                                                        placeholder="Complexity of the challenge"
                                                    />
                                                    <Label className="mt-2">Solution Innovation</Label>
                                                    <Textarea
                                                        value={(story.story_impact?.solutionInnovation || []).join('\n')}
                                                        onChange={(e) => {
                                                            const updatedImpact = {
                                                                ...(story.story_impact || {}),
                                                                solutionInnovation: e.target.value.split('\n').filter(p => p.trim() !== '')
                                                            };
                                                            updateStory(index, 'story_impact', updatedImpact);
                                                        }}
                                                        placeholder="List innovative solutions (one per line)"
                                                        rows={2}
                                                    />
                                                </div>
                                            )}

                                            {/* Add similar dynamic sections for other story sections */}
                                        </div>

                                        <div className="flex justify-end">
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => removeStory(index)}
                                            >
                                                <IconTrash size={16} className="mr-2" /> Remove Story
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Images Section */}
                        <Card className="mt-4">
                            <CardHeader>
                                <CardTitle className="flex justify-between items-center">
                                    Project Images
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={addImage}
                                    >
                                        <IconPlus size={16} className="mr-2" /> Add Image
                                    </Button>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {projectData.images.map((image, index) => (
                                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                        <div>
                                            <Label>Image URL</Label>
                                            <Input
                                                value={image.image_url}
                                                onChange={(e) => updateImage(index, 'image_url', e.target.value)}
                                                placeholder="https://example.com/image.jpg"
                                            />
                                        </div>
                                        <div>
                                            <Label>Image Title</Label>
                                            <Input
                                                value={image.image_title}
                                                onChange={(e) => updateImage(index, 'image_title', e.target.value)}
                                                placeholder="Image title"
                                            />
                                        </div>
                                        <div className="flex items-end space-x-2">
                                            <div className="flex-grow">
                                                <Label>Image Type</Label>
                                                <Select
                                                    value={image.image_type}
                                                    onValueChange={(value) => updateImage(index, 'image_type', value)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select image type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="cover">Cover</SelectItem>
                                                        <SelectItem value="gallery">Gallery</SelectItem>
                                                        <SelectItem value="process">Process</SelectItem>
                                                        <SelectItem value="result">Result</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => removeImage(index)}
                                            >
                                                <IconTrash size={16} />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Highlights Section */}
                        <Card className="mt-4">
                            <CardHeader>
                                <CardTitle className="flex justify-between items-center">
                                    Project Highlights
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={addHighlight}
                                    >
                                        <IconPlus size={16} className="mr-2" /> Add Highlight
                                    </Button>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {projectData.highlights.map((highlight, index) => (
                                    <div key={index} className="space-y-4 mb-4 border-b pb-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label>Highlight Text</Label>
                                                <Input
                                                    value={highlight.highlight_text}
                                                    onChange={(e) => updateHighlight(index, 'highlight_text', e.target.value)}
                                                    placeholder="Highlight text"
                                                />
                                            </div>
                                            <div>
                                                <Label>Highlight Type</Label>
                                                <Select
                                                    value={highlight.highlight_type}
                                                    onValueChange={(value) => updateHighlight(index, 'highlight_type', value)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select highlight type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="achievement">Achievement</SelectItem>
                                                        <SelectItem value="milestone">Milestone</SelectItem>
                                                        <SelectItem value="innovation">Innovation</SelectItem>
                                                        <SelectItem value="impact">Impact</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <div>
                                            <Label>Highlight Impact</Label>
                                            <Textarea
                                                value={highlight.highlight_impact}
                                                onChange={(e) => updateHighlight(index, 'highlight_impact', e.target.value)}
                                                placeholder="Describe the impact of this highlight"
                                                rows={2}
                                            />
                                        </div>
                                        <div className="flex justify-end">
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => removeHighlight(index)}
                                            >
                                                <IconTrash size={16} className="mr-2" /> Remove Highlight
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

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