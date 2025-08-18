"use client";

import React from 'react';
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

export const BasicProjectDetails = ({
    projectData,
    categories,
    clients,
    handleChange,
    setProjectData
}) => {
    return (
        <div className="space-y-4">
            {/* Basic Project Details */}
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

            {/* Category and Client */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label>Project Category</Label>
                    <Select
                        name="category_id"
                        value={projectData.category_id}
                        onValueChange={(value) => setProjectData(prev => ({
                            ...prev,
                            category_id: value
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

            {/* Additional Project Details */}
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
                    <Label>Project Status</Label>
                    <Select
                        name="status"
                        value={projectData.status}
                        onValueChange={(value) => setProjectData(prev => ({
                            ...prev,
                            status: value
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
            </div>
        </div>
    );
}; 