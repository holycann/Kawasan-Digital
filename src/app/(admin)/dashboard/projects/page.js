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
import { toast } from 'sonner';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import ReactDOM from 'react-dom/client';
import { useProjects } from '@/hooks/useProject';

export default function ProjectsManagementPage() {
    const {
        projects,
        loading: projectsLoading,
        error: projectsError,
        fetchProjects,
        deleteProject
    } = useProjects();

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleDeleteProject = async (projectId) => {
        const confirmDelete = await new Promise((resolve) => {
            const ConfirmDeleteDialog = () => (
                <AlertDialog open={true} onOpenChange={(open) => !open && resolve(false)}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete Project</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to delete this project? This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => resolve(false)}>
                                Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction onClick={() => resolve(true)}>
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            );

            // Render the dialog and wait for user response
            const dialogRoot = document.getElementById('dialog-root');
            let root = dialogRoot._reactRoot;
            if (!root) {
                root = ReactDOM.createRoot(dialogRoot);
                dialogRoot._reactRoot = root;
            }
            root.render(<ConfirmDeleteDialog />);
        });

        // Unmount the dialog after user interaction
        const dialogRoot = document.getElementById('dialog-root');
        if (dialogRoot._reactRoot) {
            dialogRoot._reactRoot.unmount();
            dialogRoot._reactRoot = null;
        }

        if (!confirmDelete) return;

        try {
            await deleteProject(projectId);
            toast.success('Project deleted successfully');
        } catch (err) {
            toast.error('Failed to delete project');
            console.error(err);
        }
    };

    if (projectsLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white dark:bg-black">
                <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            </div>
        );
    }

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
                                <TableHead>Client</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Year</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {projects.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">
                                        No projects found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                projects.map((project) => (
                                    <TableRow key={project.id}>
                                        <TableCell>{project.client.name ?? "N/A"}</TableCell>
                                        <TableCell>{project.title ?? "N/A"}</TableCell>
                                        <TableCell>{project.category.name ?? "N/A"}</TableCell>
                                        <TableCell>{project.year ?? "N/A"}</TableCell>
                                        <TableCell>
                                            <span
                                                className={`
                                                    px-2 py-1 rounded-full text-xs font-semibold
                                                    ${project.status === 'Completed'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                    }
                                                `}
                                            >
                                                {project.status ?? "N/A"}
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
