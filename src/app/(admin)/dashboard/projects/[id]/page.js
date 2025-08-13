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
import Image from 'next/image';

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

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white dark:bg-black">
                <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
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
                            {project.category.name}
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
                            {project.client.name}
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
                                        <TableCell>{tech.tech_stack.tech_name}</TableCell>
                                        <TableCell>{tech.tech_stack.tech_category}</TableCell>
                                        <TableCell>{tech.tech_stack.tech_version}</TableCell>
                                        <TableCell>{tech.tech_stack.tech_role}</TableCell>
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
                                    <Image
                                        src={image.image_url}
                                        alt={image.image_title || `Project Image ${index + 1}`}
                                        className="w-full h-48 object-cover"
                                        width={500}
                                        height={500}
                                    />
                                    {image.image_title && (
                                        <div className="p-2 text-sm text-center bg-neutral-100 dark:bg-neutral-800">
                                            {image.image_title}
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
                                        <TableCell>{highlight.highlight_text}</TableCell>
                                        <TableCell>{highlight.highlight_type}</TableCell>
                                        <TableCell>{highlight.highlight_impact}</TableCell>
                                        <TableCell>
                                            {highlight.highlight_metrics
                                                ? Object.entries(highlight.highlight_metrics).map(([key, value]) => (
                                                    <div key={key} className="flex justify-between">
                                                        <span className="font-medium">{key}:</span>
                                                        <span>{value}</span>
                                                    </div>
                                                ))
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
                <Card className="mt-4">
                    <CardHeader>
                        <CardTitle>Project Stories</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-1/4">Story Section</TableHead>
                                    <TableHead className="w-1/4">Story Type</TableHead>
                                    <TableHead className="w-1/4">Story Content</TableHead>
                                    <TableHead className="w-1/4">Story Impact</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {stories.map((story, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {story.story_section === 'whyWeBuilt' ? 'Why We Built' :
                                                story.story_section === 'problemsSolved' ? 'Problems Solved' :
                                                    story.story_section === 'developmentProcess' ? 'Development Process' :
                                                        story.story_section === 'keyFeatures' ? 'Key Features' :
                                                            story.story_section === 'performanceResults' ? 'Performance Results' :
                                                                story.story_section === 'clientResults' ? 'Client Results' :
                                                                    story.story_section}
                                        </TableCell>
                                        <TableCell>{story.story_type}</TableCell>
                                        <TableCell>
                                            {story.story_content && (
                                                <div className="space-y-2">
                                                    {typeof story.story_content === 'string'
                                                        ? story.story_content
                                                        : Object.entries(story.story_content).map(([key, value]) => (
                                                            <div key={key} className="ml-2">
                                                                <span className="capitalize text-xs font-semibold">{key}:</span>
                                                                {Array.isArray(value) ? (
                                                                    <ul className="list-disc list-inside text-xs">
                                                                        {value.map((item, idx) => (
                                                                            <li key={idx}>
                                                                                {typeof item === 'object'
                                                                                    ? JSON.stringify(item)
                                                                                    : item}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                ) : (
                                                                    <p className="text-xs">{JSON.stringify(value)}</p>
                                                                )}
                                                            </div>
                                                        ))}
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {story.story_impact && (
                                                <div className="space-y-2">
                                                    {typeof story.story_impact === 'string'
                                                        ? story.story_impact
                                                        : Object.entries(story.story_impact).map(([key, value]) => (
                                                            <div key={key} className="ml-2">
                                                                <span className="capitalize text-xs font-semibold">{key}:</span>
                                                                {Array.isArray(value) ? (
                                                                    <ul className="list-disc list-inside text-xs">
                                                                        {value.map((item, idx) => (
                                                                            <li key={idx}>
                                                                                {typeof item === 'object'
                                                                                    ? JSON.stringify(item)
                                                                                    : item}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                ) : (
                                                                    <p className="text-xs">{JSON.stringify(value)}</p>
                                                                )}
                                                            </div>
                                                        ))}
                                                </div>
                                            )}
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
