"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    IconEdit,
    IconTrash,
    IconBriefcase,
    IconMapPin,
    IconMail,
    IconPhone,
    IconUser,
    IconLink,
    IconFileDescription
} from "@tabler/icons-react";
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useProjectClients, useProjects } from '@/hooks/useProject';
import Image from 'next/image';

export default function ClientDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const clientId = params.id;

    const {
        getClientById,
        deleteClient
    } = useProjectClients();
    const { projects, fetchProjects } = useProjects();

    const [clientDetails, setClientDetails] = useState(null);
    const [clientProjects, setClientProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadClientDetails = async () => {
            try {
                const details = await getClientById(clientId);
                setClientDetails(details);

                // Fetch projects for this client
                const allProjects = await fetchProjects();
                const relatedProjects = allProjects.filter(project => project.client_id === clientId);
                setClientProjects(relatedProjects);

                setLoading(false);
            } catch (error) {
                toast.error('Failed to load client details');
                console.error(error);
                setLoading(false);
            }
        };

        loadClientDetails();
    }, [clientId]);

    const handleDeleteClient = async () => {
        try {
            await deleteClient(clientId);
            toast.success('Client deleted successfully');
            router.push('/dashboard/clients');
        } catch (error) {
            toast.error('Failed to delete client');
            console.error(error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white dark:bg-black">
                <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            </div>
        );
    }

    if (!clientDetails) {
        return (
            <div className="flex justify-center items-center min-h-screen text-neutral-500">
                Client not found
            </div>
        );
    }

    return (
        <div className="space-y-8 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 min-h-screen p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                    Client Details
                </h1>
                <div className="flex gap-4">
                    <Link href={`/dashboard/clients/${clientId}/edit`}>
                        <Button
                            variant="outline"
                            className="flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                        >
                            <IconEdit size={18} className="text-blue-500" />
                            Edit Client
                        </Button>
                    </Link>
                    <Button
                        variant="destructive"
                        onClick={handleDeleteClient}
                        className="flex items-center gap-2 hover:bg-red-100 dark:hover:bg-red-900/30"
                    >
                        <IconTrash size={18} className="text-red-500" />
                        Delete Client
                    </Button>
                </div>
            </div>

            <Card className="shadow-2xl border-none">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border-b border-neutral-200 dark:border-neutral-700 flex flex-row items-center gap-4">
                    {clientDetails.logo_image && (
                        <Image
                            src={clientDetails.logo_image}
                            alt={`${clientDetails.name} logo`}
                            width={64}
                            height={32}
                            className="object-contain rounded-full"
                        />
                    )}
                    <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                        {clientDetails.name}
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <IconBriefcase className="text-blue-500" size={24} />
                                <span className="font-medium text-neutral-700 dark:text-neutral-300">
                                    Industry: {clientDetails.industry || 'Not specified'}
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <IconMapPin className="text-blue-500" size={24} />
                                <span className="font-medium text-neutral-700 dark:text-neutral-300">
                                    Location: <a href={`https://maps.google.com/maps?q=${encodeURIComponent(clientDetails.location)}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                        {clientDetails.location || 'Not specified'}
                                    </a>
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <IconUser className="text-blue-500" size={24} />
                                <span className="font-medium text-neutral-700 dark:text-neutral-300">
                                    Contact Person: {clientDetails.contact_person || 'Not specified'}
                                </span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <IconMail className="text-blue-500" size={24} />
                                Email:
                                <a
                                    href={`mailto:${clientDetails.contact_email}`}
                                    className="font-medium text-blue-600 hover:underline"
                                >
                                    {clientDetails.contact_email || 'Not provided'}
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <IconPhone className="text-blue-500" size={24} />
                                Phone:
                                <a
                                    href={`tel:${clientDetails.contact_phone}`}
                                    className="font-medium text-blue-600 hover:underline"
                                >
                                    {clientDetails.contact_phone || 'Not provided'}
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <IconLink className="text-blue-500" size={24} />
                                Website:
                                <a
                                    href={clientDetails.website_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-medium text-blue-600 hover:underline"
                                >
                                    {clientDetails.website_url || 'Not provided'}
                                </a>
                            </div>
                        </div>
                    </div>

                    {clientDetails.description && (
                        <div className="mt-4">
                            <div className="flex items-center gap-3 mb-2">
                                <IconFileDescription className="text-blue-500" size={24} />
                                <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                                    Description
                                </h3>
                            </div>
                            <p className="text-neutral-700 dark:text-neutral-300 pl-8">
                                {clientDetails.description}
                            </p>
                        </div>
                    )}

                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                            Related Projects
                        </h2>
                        {clientProjects.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Project Name</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Start Date</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {clientProjects.map((project) => (
                                        <TableRow key={project.id}>
                                            <TableCell>{project.name}</TableCell>
                                            <TableCell>{project.status}</TableCell>
                                            <TableCell>{new Date(project.start_date).toLocaleDateString()}</TableCell>
                                            <TableCell>
                                                <Link href={`/dashboard/projects/${project.id}`}>
                                                    <Button variant="outline" size="sm">
                                                        View Details
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <p className="text-neutral-500 text-center py-4">
                                No projects found for this client
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}