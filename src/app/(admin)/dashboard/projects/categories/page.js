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
    IconTrash 
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
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import ReactDOM from 'react-dom/client';
import { useProjectCategories } from '@/hooks/useProject';

export default function CategoriesManagementPage() {
    const { 
        categories, 
        loading, 
        error, 
        fetchCategories, 
        deleteCategory 
    } = useProjectCategories();

    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDeleteCategory = async (categoryId) => {
        const confirmDelete = await new Promise((resolve) => {
            const ConfirmDeleteDialog = () => (
                <AlertDialog open={true} onOpenChange={(open) => !open && resolve(false)}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete Category</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to delete this category? This action cannot be undone.
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
            await deleteCategory(categoryId);
            toast.success('Category deleted successfully');
        } catch (err) {
            toast.error('Failed to delete category');
            console.error(err);
        }
    };

    if (error) {
        return (
            <div className="text-red-500 p-4">
                Error loading categories: {error.message}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">
                    Project Categories Management
                </h1>
                <Link href="/dashboard/projects/categories/add">
                    <Button variant="default" className="flex items-center gap-2">
                        <IconPlus size={18} />
                        Add New Category
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Category List</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Company</TableHead>
                                <TableHead>Industry</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">
                                        Loading categories...
                                    </TableCell>
                                </TableRow>
                            ) : categories.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">
                                        No categories found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                categories.map((category) => (
                                    <TableRow key={category.id}>
                                        <TableCell>{category.name}</TableCell>
                                        <TableCell>{category.description}</TableCell>
                                        <TableCell>{category.company_name}</TableCell>
                                        <TableCell>{category.industry}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Link href={`/dashboard/projects/categories/${category.id}/edit`}>
                                                    <Button 
                                                        variant="outline" 
                                                        size="icon" 
                                                        title="Edit Category"
                                                    >
                                                        <IconEdit size={18} />
                                                    </Button>
                                                </Link>
                                                <Button 
                                                    variant="destructive" 
                                                    size="icon" 
                                                    title="Delete Category"
                                                    onClick={() => handleDeleteCategory(category.id)}
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
