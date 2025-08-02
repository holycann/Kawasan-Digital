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
import { ProjectHooks } from '@/providers/projects';
import { toast } from 'sonner';

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
    const { useProjectCategories } = ProjectHooks;
    const { createCategory, updateCategory } = useProjectCategories();

    const [categoryData, setCategoryData] = useState(initialData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoryData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
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
                            <Button type="submit">
                                {mode === 'add' ? 'Add Category' : 'Update Category'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}; 