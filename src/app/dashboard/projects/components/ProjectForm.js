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
        project_status: 'In Progress'
    }, 
    mode = 'add',
    projectId = null 
}) => {
    const router = useRouter();
    const { 
        useProjects, 
        useProjectCategories, 
        useProjectClients 
    } = ProjectHooks;
    
    const { createProject, updateProject } = useProjects();
    const { categories, fetchCategories } = useProjectCategories();
    const { clients, fetchClients } = useProjectClients();

    const [projectData, setProjectData] = useState(initialData);

    useEffect(() => {
        fetchCategories();
        fetchClients();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (mode === 'add') {
                await createProject(projectData);
                toast.success('Project added successfully');
            } else {
                await updateProject(projectId, projectData);
                toast.success('Project updated successfully');
            }
            router.push('/dashboard/projects');
        } catch (error) {
            toast.error(`Failed to ${mode} project`);
            console.error(error);
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

                        <div className="flex justify-end space-x-4">
                            <Button 
                                type="button" 
                                variant="outline"
                                onClick={() => router.push('/dashboard/projects')}
                            >
                                Cancel
                            </Button>
                            <Button type="submit">
                                {mode === 'add' ? 'Add Project' : 'Update Project'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}; 