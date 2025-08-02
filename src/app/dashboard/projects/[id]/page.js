"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@/components/ui/table";
import { 
    IconEdit, 
    IconTrash,
    IconLink,
    IconCategory,
    IconCalendar,
    IconMapPin,
    IconBriefcase
} from "@tabler/icons-react";
import { ProjectHooks } from '@/providers/projects';
import { toast } from 'sonner';

export default function ProjectDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const projectId = params.id;

    const { 
        useProjects, 
        useProjectCategories, 
        useProjectClients 
    } = ProjectHooks;

    const { 
        fetchFullProjectDetails,
        deleteProject,
    } = useProjects();

    const { categories } = useProjectCategories();
    const { clients } = useProjectClients();

    const [projectDetails, setProjectDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProjectDetails = async () => {
            try {
                const details = await fetchFullProjectDetails(projectId);
                setProjectDetails(details);
                setLoading(false);
            } catch (error) {
                toast.error('Failed to load project details');
                console.error(error);
                setLoading(false);
            }
        };

        loadProjectDetails();
    }, [projectId]);

    const handleDeleteProject = async () => {
        try {
            await deleteProject(projectId);
            toast.success('Project deleted successfully');
            router.push('/dashboard/projects');
        } catch (err) {
            toast.error('Failed to delete project');
            console.error(err);
        }
    };

    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.name : 'Uncategorized';
    };

    const getClientName = (clientId) => {
        const client = clients.find(c => c.id === clientId);
        return client ? client.name : 'No Client';
    };

    if (loading) {
        return (
            <div className="text-center py-10">
                Loading project details...
            </div>
        );
    }

    if (!projectDetails) {
        return (
            <div className="text-red-500 p-4">
                Project not found
            </div>
        );
    }

    const { project, images, techStack, highlights, stories } = projectDetails;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">
                    {project.title}
                </h1>
                <div className="flex gap-2">
                    <Link href={`/dashboard/projects/${projectId}/edit`}>
                        <Button variant="outline" className="flex items-center gap-2">
                            <IconEdit size={18} />
                            Edit Project
                        </Button>
                    </Link>
                    <Button 
                        variant="destructive" 
                        className="flex items-center gap-2"
                        onClick={handleDeleteProject}
                    >
                        <IconTrash size={18} />
                        Delete Project
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                            Category
                        </CardTitle>
                        <IconCategory className="h-4 w-4 text-neutral-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {getCategoryName(project.category)}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                            Year
                        </CardTitle>
                        <IconCalendar className="h-4 w-4 text-neutral-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {project.year}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                            Client
                        </CardTitle>
                        <IconBriefcase className="h-4 w-4 text-neutral-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {getClientName(project.client_id)}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                            Location
                        </CardTitle>
                        <IconMapPin className="h-4 w-4 text-neutral-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {project.project_location || 'Not Specified'}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Project Description</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-neutral-700 dark:text-neutral-300">
                        {project.description || 'No description available'}
                    </p>
                </CardContent>
            </Card>

            {project.website_url && (
                <Card>
                    <CardHeader>
                        <CardTitle>Project Website</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <a 
                            href={project.website_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-blue-500 hover:underline"
                        >
                            <IconLink size={18} />
                            {project.website_url}
                        </a>
                    </CardContent>
                </Card>
            )}

            {/* Tech Stack Section */}
            {techStack && techStack.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Tech Stack</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Technology</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Version</TableHead>
                                    <TableHead>Role</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {techStack.map((tech, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{tech.tech_id.tech_name}</TableCell>
                                        <TableCell>{tech.tech_id.tech_category}</TableCell>
                                        <TableCell>{tech.tech_id.tech_version}</TableCell>
                                        <TableCell>{tech.tech_id.tech_role}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}

            {/* Images Section */}
            {images && images.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Project Images</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {images.map((image, index) => (
                                <div 
                                    key={index} 
                                    className="rounded-lg overflow-hidden shadow-md"
                                >
                                    <img 
                                        src={image.image_url} 
                                        alt={image.image_caption || `Project Image ${index + 1}`} 
                                        className="w-full h-48 object-cover"
                                    />
                                    {image.image_caption && (
                                        <div className="p-2 text-sm text-center bg-neutral-100 dark:bg-neutral-800">
                                            {image.image_caption}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Highlights Section */}
            {highlights && highlights.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Project Highlights</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Impact</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {highlights.map((highlight, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{highlight.title}</TableCell>
                                        <TableCell>{highlight.description}</TableCell>
                                        <TableCell>
                                            {highlight.highlight_metrics 
                                                ? JSON.stringify(highlight.highlight_metrics) 
                                                : 'N/A'}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}

            {/* Stories Section */}
            {stories && stories.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Project Stories</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Impact</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {stories.map((story, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{story.title}</TableCell>
                                        <TableCell>{story.story_type}</TableCell>
                                        <TableCell>
                                            {story.story_impact 
                                                ? JSON.stringify(story.story_impact) 
                                                : 'N/A'}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
