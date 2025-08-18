"use client";

import React, { useState } from 'react';
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

export const CategoryForm = ({ 
    initialData = {
        name: '',
        description: '',
        company_name: 'Kawasan Digital',
        industry: ''
    }, 
    mode = 'add',
    categoryId = null 
}) => {
    const router = useRouter();
    const { createCategory, updateCategory } = useProjectCategories();

    const [categoryData, setCategoryData] = useState(initialData);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoryData(prev => ({
            ...prev,
            [name]: value
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
                                    {mode === 'add' ? 'Add New Category' : 'Update Category'}
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Are you sure you want to {mode === 'add' ? 'add' : 'update'} this category?
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

            if (mode === 'add') {
                await createCategory(categoryData);
                toast.success('Category added successfully');
            } else {
                await updateCategory(categoryId, categoryData);
                toast.success('Category updated successfully');
            }
            router.push('/dashboard/projects/categories');
        } catch (error) {
            toast.error(`Failed to ${mode} category`);
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">
                {mode === 'add' ? 'Add New Project Category' : 'Edit Project Category'}
            </h1>

            <Card>
                <CardHeader>
                    <CardTitle>Category Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label>Category Name</Label>
                                <Input 
                                    name="name"
                                    value={categoryData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter category name"
                                />
                            </div>
                            <div>
                                <Label>Industry</Label>
                                <Input 
                                    name="industry"
                                    value={categoryData.industry}
                                    onChange={handleChange}
                                    placeholder="Enter industry"
                                />
                            </div>
                        </div>

                        <div>
                            <Label>Description</Label>
                            <Textarea 
                                name="description"
                                value={categoryData.description}
                                onChange={handleChange}
                                placeholder="Brief description of the category"
                                rows={3}
                            />
                        </div>

                        <div>
                            <Label>Company Name</Label>
                            <Input 
                                name="company_name"
                                value={categoryData.company_name}
                                onChange={handleChange}
                                placeholder="Enter company name"
                            />
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Button 
                                type="button" 
                                variant="outline"
                                onClick={() => router.push('/dashboard/projects/categories')}
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="submit" 
                                disabled={isSubmitting}
                            >
                                {mode === 'add' ? 'Add Category' : 'Update Category'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}; 