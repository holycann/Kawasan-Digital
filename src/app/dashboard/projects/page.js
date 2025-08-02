"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
    IconPlus, 
    IconEdit, 
    IconTrash,
    IconEye 
} from "@tabler/icons-react";
import { ProjectHooks } from '@/providers/projects';
import { toast } from 'sonner';

export default function ProjectsManagementPage() {
    const { useProjects, useProjectCategories } = ProjectHooks;
    const { 
        projects, 
        loading: projectsLoading, 
        error: projectsError, 
        fetchProjects, 
        deleteProject 
    } = useProjects();

    const { 
        categories, 
        loading: categoriesLoading 
    } = useProjectCategories();

    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleDeleteProject = async (projectId) => {
        try {
            await deleteProject(projectId);
            toast.success('Project deleted successfully');
        } catch (err) {
            toast.error('Failed to delete project');
            console.error(err);
        }
    };

    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.name : 'Uncategorized';
    };

    if (projectsError) {
        return (
            <div className="text-red-500 p-4">
                Error loading projects: {projectsError.message}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">
                    Projects Management
                </h1>
                <Link href="/dashboard/projects/add">
                    <Button variant="default" className="flex items-center gap-2">
                        <IconPlus size={18} />
                        Add New Project
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Project List</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Year</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {projectsLoading || categoriesLoading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">
                                        Loading projects...
                                    </TableCell>
                                </TableRow>
                            ) : projects.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">
                                        No projects found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                projects.map((project) => (
                                    <TableRow key={project.id}>
                                        <TableCell>{project.title}</TableCell>
                                        <TableCell>
                                            {getCategoryName(project.category)}
                                        </TableCell>
                                        <TableCell>{project.year}</TableCell>
                                        <TableCell>
                                            <span 
                                                className={`
                                                    px-2 py-1 rounded-full text-xs font-semibold
                                                    ${project.project_status === 'Completed' 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-yellow-100 text-yellow-800'
                                                    }
                                                `}
                                            >
                                                {project.project_status}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Link href={`/dashboard/projects/${project.id}`}>
                                                    <Button 
                                                        variant="outline" 
                                                        size="icon" 
                                                        title="View Project Details"
                                                    >
                                                        <IconEye size={18} />
                                                    </Button>
                                                </Link>
                                                <Link href={`/dashboard/projects/${project.id}/edit`}>
                                                    <Button 
                                                        variant="outline" 
                                                        size="icon" 
                                                        title="Edit Project"
                                                    >
                                                        <IconEdit size={18} />
                                                    </Button>
                                                </Link>
                                                <Button 
                                                    variant="destructive" 
                                                    size="icon" 
                                                    title="Delete Project"
                                                    onClick={() => handleDeleteProject(project.id)}
                                                >
                                                    <IconTrash size={18} />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
