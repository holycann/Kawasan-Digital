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
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";
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

export const TechStackForm = ({ 
    initialData = {
        tech_name: '',
        tech_category: '',
        tech_version: '',
        tech_role: '',
    }, 
    mode = 'add',
    techStackId = null 
}) => {
    const router = useRouter();
    const { useProjectTechStack } = ProjectHooks;
    const { createTechStack, updateTechStack } = useProjectTechStack();

    const [techStackData, setTechStackData] = useState(initialData);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTechStackData(prev => ({
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
                                    {mode === 'add' ? 'Add New Tech Stack' : 'Update Tech Stack'}
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Are you sure you want to {mode === 'add' ? 'add' : 'update'} this tech stack?
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
                await createTechStack(techStackData);
                toast.success('Tech Stack added successfully');
            } else {
                await updateTechStack(techStackId, techStackData);
                toast.success('Tech Stack updated successfully');
            }
            router.push('/dashboard/projects/tech_stack');
        } catch (error) {
            toast.error(`Failed to ${mode} tech stack`);
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">
                {mode === 'add' ? 'Add New Tech Stack' : 'Edit Tech Stack'}
            </h1>

            <Card>
                <CardHeader>
                    <CardTitle>Tech Stack Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label>Technology Name</Label>
                                <Input 
                                    name="tech_name"
                                    value={techStackData.tech_name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter technology name"
                                />
                            </div>
                            <div>
                                <Label>Technology Category</Label>
                                <Select 
                                    name="tech_category"
                                    value={techStackData.tech_category}
                                    onValueChange={(value) => setTechStackData(prev => ({
                                        ...prev,
                                        tech_category: value
                                    }))}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select technology category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Frontend">Frontend</SelectItem>
                                        <SelectItem value="Backend">Backend</SelectItem>
                                        <SelectItem value="Database">Database</SelectItem>
                                        <SelectItem value="DevOps">DevOps</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label>Technology Version</Label>
                                <Input 
                                    name="tech_version"
                                    value={techStackData.tech_version}
                                    onChange={handleChange}
                                    placeholder="Enter technology version"
                                />
                            </div>
                            <div>
                                <Label>Technology Role</Label>
                                <Input 
                                    name="tech_role"
                                    value={techStackData.tech_role}
                                    onChange={handleChange}
                                    placeholder="Enter technology role"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Button 
                                type="button" 
                                variant="outline"
                                onClick={() => router.push('/dashboard/projects/tech_stack')}
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="submit" 
                                disabled={isSubmitting}
                            >
                                {mode === 'add' ? 'Add Tech Stack' : 'Update Tech Stack'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}; 