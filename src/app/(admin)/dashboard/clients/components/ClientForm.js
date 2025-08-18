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
import { useProjectClients } from '@/hooks/useProject';

export const ClientForm = ({ 
    initialData = {
        name: '',
        industry: '',
        location: '',
        website_url: '',
        description: '',
        contact_person: '',
        contact_email: '',
        contact_phone: ''
    }, 
    mode = 'add',
    clientId = null 
}) => {
    const router = useRouter();
    const { createClient, updateClient } = useProjectClients();

    const [clientData, setClientData] = useState(initialData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClientData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (mode === 'add') {
                await createClient(clientData);
                toast.success('Client added successfully');
            } else {
                await updateClient(clientId, clientData);
                toast.success('Client updated successfully');
            }
            router.push('/dashboard/clients');
        } catch (error) {
            toast.error(`Failed to ${mode} client`);
            console.error(error);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">
                {mode === 'add' ? 'Add New Client' : 'Edit Client'}
            </h1>

            <Card>
                <CardHeader>
                    <CardTitle>Client Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label>Client Name</Label>
                                <Input
                                    name="name"
                                    value={clientData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter client name"
                                />
                            </div>
                            <div>
                                <Label>Industry</Label>
                                <Input
                                    name="industry"
                                    value={clientData.industry}
                                    onChange={handleChange}
                                    placeholder="Enter client industry"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label>Location</Label>
                                <Input
                                    name="location"
                                    value={clientData.location}
                                    onChange={handleChange}
                                    placeholder="Enter client location"
                                />
                            </div>
                            <div>
                                <Label>Website URL</Label>
                                <Input
                                    name="website_url"
                                    type="url"
                                    value={clientData.website_url}
                                    onChange={handleChange}
                                    placeholder="https://example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <Label>Description</Label>
                            <Textarea
                                name="description"
                                value={clientData.description}
                                onChange={handleChange}
                                placeholder="Brief description of the client"
                                rows={3}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label>Contact Person</Label>
                                <Input
                                    name="contact_person"
                                    value={clientData.contact_person}
                                    onChange={handleChange}
                                    placeholder="Name of primary contact"
                                />
                            </div>
                            <div>
                                <Label>Contact Email</Label>
                                <Input
                                    name="contact_email"
                                    type="email"
                                    value={clientData.contact_email}
                                    onChange={handleChange}
                                    placeholder="contact@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <Label>Contact Phone</Label>
                            <Input
                                name="contact_phone"
                                value={clientData.contact_phone}
                                onChange={handleChange}
                                placeholder="Enter contact phone number"
                            />
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.push('/dashboard/clients')}
                            >
                                Cancel
                            </Button>
                            <Button type="submit">
                                {mode === 'add' ? 'Add Client' : 'Update Client'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}; 