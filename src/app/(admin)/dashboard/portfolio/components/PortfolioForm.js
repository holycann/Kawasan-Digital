"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { usePortfolio } from '@/hooks/usePortfolio';
import { toast } from 'sonner';

const CATEGORIES = [
    'Web Development',
    'Mobile Development',
    'Backend Development',
    'Frontend Development',
    'Full Stack Development',
    'UI/UX Design',
    'E-commerce',
    'CMS Development',
    'API Development',
    'Database Design'
];

const TECHNOLOGIES = [
    'Next.js', 'React', 'Vue.js', 'Angular', 'TypeScript', 'JavaScript',
    'Node.js', 'Express.js', 'Laravel', 'CodeIgniter 4', 'PHP', 'Python',
    'Java', 'Golang', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis',
    'Tailwind CSS', 'Bootstrap', 'CSS3', 'HTML5', 'Docker', 'Git',
    'AWS', 'Google Cloud', 'Firebase', 'Supabase', 'Vercel', 'Figma'
];

export default function PortfolioForm({ portfolio = null, mode = 'create' }) {
    const router = useRouter();
    const { createPortfolio, updatePortfolio } = usePortfolio();
    
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        short_description: '',
        description: '',
        cover_image: '',
        gallery_images: [],
        category: '',
        client_name: '',
        year: new Date().getFullYear(),
        technologies: [],
        project_url: '',
        github_url: '',
        demo_url: '',
        featured: false,
        status: 'draft'
    });

    const [loading, setLoading] = useState(false);
    const [newImageUrl, setNewImageUrl] = useState('');
    const [newTechnology, setNewTechnology] = useState('');

    useEffect(() => {
        if (portfolio && mode === 'edit') {
            setFormData({
                title: portfolio.title || '',
                slug: portfolio.slug || '',
                short_description: portfolio.short_description || '',
                description: portfolio.description || '',
                cover_image: portfolio.cover_image || '',
                gallery_images: portfolio.gallery_images || [],
                category: portfolio.category || '',
                client_name: portfolio.client_name || '',
                year: portfolio.year || new Date().getFullYear(),
                technologies: portfolio.technologies || [],
                project_url: portfolio.project_url || '',
                github_url: portfolio.github_url || '',
                demo_url: portfolio.demo_url || '',
                featured: portfolio.featured || false,
                status: portfolio.status || 'draft'
            });
        }
    }, [portfolio, mode]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim('-');
    };

    const handleTitleChange = (title) => {
        handleInputChange('title', title);
        if (mode === 'create') {
            handleInputChange('slug', generateSlug(title));
        }
    };

    const addGalleryImage = () => {
        if (newImageUrl.trim()) {
            setFormData(prev => ({
                ...prev,
                gallery_images: [...prev.gallery_images, newImageUrl.trim()]
            }));
            setNewImageUrl('');
        }
    };

    const removeGalleryImage = (index) => {
        setFormData(prev => ({
            ...prev,
            gallery_images: prev.gallery_images.filter((_, i) => i !== index)
        }));
    };

    const addTechnology = () => {
        if (newTechnology.trim() && !formData.technologies.includes(newTechnology.trim())) {
            setFormData(prev => ({
                ...prev,
                technologies: [...prev.technologies, newTechnology.trim()]
            }));
            setNewTechnology('');
        }
    };

    const removeTechnology = (technology) => {
        setFormData(prev => ({
            ...prev,
            technologies: prev.technologies.filter(t => t !== technology)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (mode === 'create') {
                await createPortfolio(formData);
                toast.success('Portfolio created successfully!');
            } else {
                await updatePortfolio(portfolio.id, formData);
                toast.success('Portfolio updated successfully!');
            }
            router.push('/dashboard/portfolio');
        } catch (error) {
            console.error('Error saving portfolio:', error);
            toast.error('Failed to save portfolio');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">
                    {mode === 'create' ? 'Create New Portfolio' : 'Edit Portfolio'}
                </h1>
                <Button
                    variant="outline"
                    onClick={() => router.push('/dashboard/portfolio')}
                >
                    Back to Portfolio
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title *</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => handleTitleChange(e.target.value)}
                                    placeholder="Enter portfolio title"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="slug">Slug *</Label>
                                <Input
                                    id="slug"
                                    value={formData.slug}
                                    onChange={(e) => handleInputChange('slug', e.target.value)}
                                    placeholder="portfolio-slug"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="short_description">Short Description</Label>
                            <Textarea
                                id="short_description"
                                value={formData.short_description}
                                onChange={(e) => handleInputChange('short_description', e.target.value)}
                                placeholder="Brief description of the project"
                                rows={3}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Full Description</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                placeholder="Detailed description of the project"
                                rows={6}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Project Details */}
                <Card>
                    <CardHeader>
                        <CardTitle>Project Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="category">Category *</Label>
                                <Select
                                    value={formData.category}
                                    onValueChange={(value) => handleInputChange('category', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {CATEGORIES.map(category => (
                                            <SelectItem key={category} value={category}>
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="client_name">Client Name</Label>
                                <Input
                                    id="client_name"
                                    value={formData.client_name}
                                    onChange={(e) => handleInputChange('client_name', e.target.value)}
                                    placeholder="Client or company name"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="year">Year</Label>
                                <Input
                                    id="year"
                                    type="number"
                                    value={formData.year}
                                    onChange={(e) => handleInputChange('year', parseInt(e.target.value))}
                                    placeholder="2024"
                                    min="2000"
                                    max={new Date().getFullYear() + 1}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="project_url">Project URL</Label>
                                <Input
                                    id="project_url"
                                    type="url"
                                    value={formData.project_url}
                                    onChange={(e) => handleInputChange('project_url', e.target.value)}
                                    placeholder="https://example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="github_url">GitHub URL</Label>
                                <Input
                                    id="github_url"
                                    type="url"
                                    value={formData.github_url}
                                    onChange={(e) => handleInputChange('github_url', e.target.value)}
                                    placeholder="https://github.com/username/repo"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="demo_url">Demo URL</Label>
                                <Input
                                    id="demo_url"
                                    type="url"
                                    value={formData.demo_url}
                                    onChange={(e) => handleInputChange('demo_url', e.target.value)}
                                    placeholder="https://demo.example.com"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Images */}
                <Card>
                    <CardHeader>
                        <CardTitle>Images</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="cover_image">Cover Image URL *</Label>
                            <Input
                                id="cover_image"
                                value={formData.cover_image}
                                onChange={(e) => handleInputChange('cover_image', e.target.value)}
                                placeholder="https://example.com/image.jpg"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Gallery Images</Label>
                            <div className="flex gap-2">
                                <Input
                                    value={newImageUrl}
                                    onChange={(e) => setNewImageUrl(e.target.value)}
                                    placeholder="Add image URL"
                                />
                                <Button type="button" onClick={addGalleryImage} variant="outline">
                                    Add
                                </Button>
                            </div>
                            {formData.gallery_images.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                                    {formData.gallery_images.map((url, index) => (
                                        <div key={index} className="relative group">
                                            <img
                                                src={url}
                                                alt={`Gallery ${index + 1}`}
                                                className="w-full h-24 object-cover rounded-lg"
                                            />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={() => removeGalleryImage(index)}
                                            >
                                                ×
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Technologies */}
                <Card>
                    <CardHeader>
                        <CardTitle>Technologies Used</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex gap-2">
                            <Select
                                value={newTechnology}
                                onValueChange={setNewTechnology}
                            >
                                <SelectTrigger className="w-64">
                                    <SelectValue placeholder="Select technology" />
                                </SelectTrigger>
                                <SelectContent>
                                    {TECHNOLOGIES.map(tech => (
                                        <SelectItem key={tech} value={tech}>
                                            {tech}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button type="button" onClick={addTechnology} variant="outline">
                                Add
                            </Button>
                        </div>

                        {formData.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {formData.technologies.map((tech, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full"
                                    >
                                        <span>{tech}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeTechnology(tech)}
                                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle>Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="featured">Featured Project</Label>
                                <Switch
                                    id="featured"
                                    checked={formData.featured}
                                    onCheckedChange={(checked) => handleInputChange('featured', checked)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(value) => handleInputChange('status', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                        <SelectItem value="archived">Archived</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Submit Button */}
                <div className="flex justify-end gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push('/dashboard/portfolio')}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Saving...' : mode === 'create' ? 'Create Portfolio' : 'Update Portfolio'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
