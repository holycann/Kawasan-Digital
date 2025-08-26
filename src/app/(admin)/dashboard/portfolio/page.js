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
    IconEye,
    IconStar,
    IconStarOff,
    IconSearch
} from "@tabler/icons-react";
import { usePortfolio } from '@/hooks/usePortfolio';
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PortfolioManagementPage() {
    const { 
        portfolio, 
        loading, 
        error, 
        fetchPortfolioAdmin, 
        deletePortfolio,
        updatePortfolioStatus,
        toggleFeatured
    } = usePortfolio();

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [selectedPortfolio, setSelectedPortfolio] = useState(null);

    useEffect(() => {
        fetchPortfolioAdmin();
    }, []);

    // Get unique categories
    const categories = [...new Set(portfolio.map(item => item.category))];

    // Filter portfolio items
    const filteredPortfolio = portfolio.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             item.category.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
        const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;

        return matchesSearch && matchesStatus && matchesCategory;
    });

    const handleDeletePortfolio = async (portfolioId) => {
        try {
            await deletePortfolio(portfolioId);
        } catch (err) {
            console.error(err);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await updatePortfolioStatus(id, newStatus);
        } catch (err) {
            console.error(err);
        }
    };

    const handleToggleFeatured = async (id, currentFeatured) => {
        try {
            await toggleFeatured(id, !currentFeatured);
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white dark:bg-black">
                <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 p-4">
                Error loading portfolio: {error}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">
                    Portfolio Management
                </h1>
                <Link href="/dashboard/portfolio/add">
                    <Button variant="default" className="flex items-center gap-2">
                        <IconPlus size={18} />
                        Add New Portfolio
                    </Button>
                </Link>
            </div>

            {/* Filters */}
            <Card>
                <CardHeader>
                    <CardTitle>Filters</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative">
                            <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <Input
                                placeholder="Search portfolio..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="published">Published</SelectItem>
                                <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="archived">Archived</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                {categories.map(category => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Portfolio List ({filteredPortfolio.length} items)</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Cover</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Client</TableHead>
                                <TableHead>Year</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Featured</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredPortfolio.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center">
                                        No portfolio items found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredPortfolio.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <div className="w-16 h-16 rounded-lg overflow-hidden">
                                                <img 
                                                    src={item.cover_image} 
                                                    alt={item.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <div className="font-semibold">{item.title}</div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    {item.short_description?.substring(0, 50)}...
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">{item.category}</Badge>
                                        </TableCell>
                                        <TableCell>{item.client_name || '-'}</TableCell>
                                        <TableCell>{item.year || '-'}</TableCell>
                                        <TableCell>
                                            <Select 
                                                value={item.status} 
                                                onValueChange={(value) => handleStatusChange(item.id, value)}
                                            >
                                                <SelectTrigger className="w-32">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="published">Published</SelectItem>
                                                    <SelectItem value="draft">Draft</SelectItem>
                                                    <SelectItem value="archived">Archived</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleToggleFeatured(item.id, item.featured)}
                                                className={item.featured ? 'text-yellow-500' : 'text-gray-400'}
                                            >
                                                {item.featured ? <IconStar size={18} /> : <IconStarOff size={18} />}
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Link href={`/dashboard/portfolio/${item.id}`}>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        title="View Portfolio Details"
                                                    >
                                                        <IconEye size={18} />
                                                    </Button>
                                                </Link>
                                                <Link href={`/dashboard/portfolio/${item.id}/edit`}>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        title="Edit Portfolio"
                                                    >
                                                        <IconEdit size={18} />
                                                    </Button>
                                                </Link>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button
                                                            variant="destructive"
                                                            size="icon"
                                                            title="Delete Portfolio"
                                                        >
                                                            <IconTrash size={18} />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Delete Portfolio</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Are you sure you want to delete "{item.title}"? This action cannot be undone.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction 
                                                                onClick={() => handleDeletePortfolio(item.id)}
                                                                className="bg-red-600 hover:bg-red-700"
                                                            >
                                                                Delete
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
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
