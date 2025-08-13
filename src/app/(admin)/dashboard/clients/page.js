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
    IconEye
} from "@tabler/icons-react";
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

export default function ClientsManagementPage() {
    const { useProjectClients } = ProjectHooks;
    const {
        clients,
        loading,
        error,
        fetchClients,
        deleteClient
    } = useProjectClients();

    useEffect(() => {
        fetchClients();
    }, []);

    const handleDeleteClient = async (clientId) => {
        const confirmDelete = await new Promise((resolve) => {
            const ConfirmDeleteDialog = () => (
                <AlertDialog open={true} onOpenChange={(open) => !open && resolve(false)}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete Client</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to delete this client? This action cannot be undone.
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
            await deleteClient(clientId);
            toast.success('Client deleted successfully');
        } catch (err) {
            toast.error('Failed to delete client');
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

    return (
        <div className="space-y-8 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 min-h-screen p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                    Clients Management
                </h1>
                <Link href="/dashboard/clients/add">
                    <Button
                        variant="default"
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        <IconPlus size={18} />
                        Add New Client
                    </Button>
                </Link>
            </div>

            <Card className="shadow-2xl border-none">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border-b border-neutral-200 dark:border-neutral-700">
                    <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                        Client List
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-neutral-100 dark:bg-neutral-800">
                            <TableRow>
                                <TableHead className="font-bold text-blue-600 dark:text-blue-400">Name</TableHead>
                                <TableHead className="font-bold text-blue-600 dark:text-blue-400">Contact</TableHead>
                                <TableHead className="font-bold text-blue-600 dark:text-blue-400">Industry</TableHead>
                                <TableHead className="font-bold text-blue-600 dark:text-blue-400">Location</TableHead>
                                <TableHead className="font-bold text-blue-600 dark:text-blue-400">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {clients.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-6 text-neutral-500">
                                        No clients found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                clients.map((client) => (
                                    <TableRow
                                        key={client.id}
                                        className="hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors duration-200"
                                    >
                                        <TableCell className="font-medium text-neutral-700 dark:text-neutral-300">
                                            {client.name}
                                        </TableCell>
                                        <TableCell>
                                            {client.contact_person}
                                        </TableCell>
                                        <TableCell>
                                            {client.industry}
                                        </TableCell>
                                        <TableCell>
                                            {client.location}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Link href={`/dashboard/clients/${client.id}`}>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        title="View Client Details"
                                                        className="hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                                                    >
                                                        <IconEye size={18} className="text-blue-500 hover:text-blue-600" />
                                                    </Button>
                                                </Link>
                                                <Link href={`/dashboard/clients/${client.id}/edit`}>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        title="Edit Client"
                                                        className="hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                                                    >
                                                        <IconEdit size={18} className="text-blue-500 hover:text-blue-600" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    title="Delete Client"
                                                    onClick={() => handleDeleteClient(client.id)}
                                                    className="hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                                                >
                                                    <IconTrash size={18} className="text-red-500 hover:text-red-600" />
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
