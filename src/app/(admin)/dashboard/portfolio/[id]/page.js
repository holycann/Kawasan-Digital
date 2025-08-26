"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePortfolio } from '@/hooks/usePortfolio';
import { IconEdit, IconArrowLeft, IconExternalLink, IconBrandGithub } from "@tabler/icons-react";
import Link from 'next/link';
import { Label } from "@/components/ui/label";

export default function PortfolioDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { getPortfolioById } = usePortfolio();
    const [portfolio, setPortfolio] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const data = await getPortfolioById(id);
                setPortfolio(data);
            } catch (error) {
                console.error('Error fetching portfolio:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPortfolio();
        }
    }, [id, getPortfolioById]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white dark:bg-black">
                <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            </div>
        );
    }

    if (!portfolio) {
        return (
            <div className="text-center p-8">
                <h1 className="text-2xl font-bold text-red-600">Portfolio not found</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    The portfolio item you're looking for doesn't exist.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        onClick={() => router.push('/dashboard/portfolio')}
                        className="flex items-center gap-2"
                    >
                        <IconArrowLeft size={18} />
                        Back to Portfolio
                    </Button>
                    <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">
                        {portfolio.title}
                    </h1>
                </div>
                <Link href={`/dashboard/portfolio/${id}/edit`}>
                    <Button className="flex items-center gap-2">
                        <IconEdit size={18} />
                        Edit Portfolio
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Cover Image */}
                    <Card>
                        <CardContent className="p-0">
                            <img
                                src={portfolio.cover_image}
                                alt={portfolio.title}
                                className="w-full h-64 object-cover rounded-t-lg"
                            />
                        </CardContent>
                    </Card>

                    {/* Description */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Description</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                                {portfolio.description}
                            </p>
                        </CardContent>
                    </Card>

                    {/* Gallery Images */}
                    {portfolio.gallery_images && portfolio.gallery_images.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Gallery Images</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {portfolio.gallery_images.map((image, index) => (
                                        <div key={index} className="aspect-square rounded-lg overflow-hidden">
                                            <img
                                                src={image}
                                                alt={`Gallery ${index + 1}`}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Technologies */}
                    {portfolio.technologies && portfolio.technologies.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Technologies Used</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {portfolio.technologies.map((tech, index) => (
                                        <Badge key={index} variant="secondary">
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Project Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Project Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Category
                                </Label>
                                <p className="text-lg font-semibold">{portfolio.category}</p>
                            </div>
                            
                            {portfolio.client_name && (
                                <div>
                                    <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Client
                                    </Label>
                                    <p className="text-lg font-semibold">{portfolio.client_name}</p>
                                </div>
                            )}
                            
                            {portfolio.year && (
                                <div>
                                    <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Year
                                    </Label>
                                    <p className="text-lg font-semibold">{portfolio.year}</p>
                                </div>
                            )}
                            
                            <div>
                                <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Status
                                </Label>
                                <Badge 
                                    variant={portfolio.status === 'published' ? 'default' : 'secondary'}
                                    className="mt-1"
                                >
                                    {portfolio.status}
                                </Badge>
                            </div>
                            
                            <div>
                                <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Featured
                                </Label>
                                <Badge 
                                    variant={portfolio.featured ? 'default' : 'secondary'}
                                    className="mt-1"
                                >
                                    {portfolio.featured ? 'Yes' : 'No'}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Links */}
                    {(portfolio.project_url || portfolio.github_url || portfolio.demo_url) && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Project Links</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {portfolio.project_url && (
                                    <Link href={portfolio.project_url} target="_blank" rel="noopener noreferrer">
                                        <Button variant="outline" className="w-full justify-start gap-2">
                                            <IconExternalLink size={18} />
                                            Live Project
                                        </Button>
                                    </Link>
                                )}
                                
                                {portfolio.github_url && (
                                    <Link href={portfolio.github_url} target="_blank" rel="noopener noreferrer">
                                        <Button variant="outline" className="w-full justify-start gap-2">
                                            <IconBrandGithub size={18} />
                                            Source Code
                                        </Button>
                                    </Link>
                                )}
                                
                                {portfolio.demo_url && (
                                    <Link href={portfolio.demo_url} target="_blank" rel="noopener noreferrer">
                                        <Button variant="outline" className="w-full justify-start gap-2">
                                            <IconExternalLink size={18} />
                                            Demo
                                        </Button>
                                    </Link>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Metadata */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Metadata</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Created
                                </Label>
                                <p className="text-sm">
                                    {new Date(portfolio.created_at).toLocaleDateString()}
                                </p>
                            </div>
                            
                            <div>
                                <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Last Updated
                                </Label>
                                <p className="text-sm">
                                    {new Date(portfolio.updated_at).toLocaleDateString()}
                                </p>
                            </div>
                            
                            <div>
                                <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    ID
                                </Label>
                                <p className="text-sm font-mono text-gray-600 dark:text-gray-400">
                                    {portfolio.id}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
