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
    IconLink
} from "@tabler/icons-react";
import { ProjectHooks } from '@/providers/projects';
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
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import ReactDOM from 'react-dom/client';

export default function TechStackManagementPage() {
    const { useProjectTechStack } = ProjectHooks;
    const { 
        techStacks, 
        loading, 
        error, 
        fetchTechStacks, 
        deleteTechStack 
    } = useProjectTechStack();

    const [selectedTechStack, setSelectedTechStack] = useState(null);

    useEffect(() => {
        fetchTechStacks();
    }, []);

    const handleDeleteTechStack = async (techStackId) => {
        const confirmDelete = await new Promise((resolve) => {
            const ConfirmDeleteDialog = () => (
                <AlertDialog open={true} onOpenChange={(open) => !open && resolve(false)}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete Tech Stack</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to delete this tech stack? This action cannot be undone.
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
            const root = ReactDOM.createRoot(dialogRoot);
            root.render(<ConfirmDeleteDialog />);
        });

        // Unmount the dialog after user interaction
        const dialogRoot = document.getElementById('dialog-root');
        ReactDOM.createRoot(dialogRoot).unmount();

        if (!confirmDelete) return;

        try {
            await deleteTechStack(techStackId);
            toast.success('Tech Stack deleted successfully');
        } catch (err) {
            toast.error('Failed to delete tech stack');
            console.error(err);
        }
    };

    if (error) {
        return (
            <div className="text-red-500 p-4">
                Error loading tech stacks: {error.message}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">
                    Technology Stack Management
                </h1>
                <Link href="/dashboard/projects/tech_stack/add">
                    <Button variant="default" className="flex items-center gap-2">
                        <IconPlus size={18} />
                        Add New Technology
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Technology Stack List</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Technology Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Version</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">
                                        Loading technologies...
                                    </TableCell>
                                </TableRow>
                            ) : techStacks.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">
                                        No technologies found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                techStacks.map((tech) => (
                                    <TableRow key={tech.id}>
                                        <TableCell>{tech.tech_name}</TableCell>
                                        <TableCell>{tech.tech_category}</TableCell>
                                        <TableCell>{tech.tech_version || 'N/A'}</TableCell>
                                        <TableCell>{tech.tech_role || 'N/A'}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                {tech.tech_website_url && (
                                                    <a 
                                                        href={tech.tech_website_url} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        title="Visit Technology Website"
                                                    >
                                                        <Button 
                                                            variant="outline" 
                                                            size="icon"
                                                        >
                                                            <IconLink size={18} />
                                                        </Button>
                                                    </a>
                                                )}
                                                <Link href={`/dashboard/projects/tech_stack/${tech.id}/edit`}>
                                                    <Button 
                                                        variant="outline" 
                                                        size="icon" 
                                                        title="Edit Technology"
                                                    >
                                                        <IconEdit size={18} />
                                                    </Button>
                                                </Link>
                                                <Button 
                                                    variant="destructive" 
                                                    size="icon" 
                                                    title="Delete Technology"
                                                    onClick={() => handleDeleteTechStack(tech.id)}
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
