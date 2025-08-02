"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ClientForm } from '../../components/ClientForm';
import { ProjectHooks } from '@/providers/projects';

export default function EditClientPage() {
    const params = useParams();
    const clientId = params.id;

    const { useProjectClients } = ProjectHooks;
    const { clients, fetchClients } = useProjectClients();

    const [initialData, setInitialData] = useState(null);

    useEffect(() => {
        fetchClients();
    }, []);

    useEffect(() => {
        const client = clients.find(c => c.id === clientId);
        if (client) {
            setInitialData({
                name: client.name || '',
                industry: client.industry || '',
                location: client.location || '',
                website_url: client.website_url || '',
                description: client.description || '',
                contact_person: client.contact_person || '',
                contact_email: client.contact_email || '',
                contact_phone: client.contact_phone || ''
            });
        }
    }, [clients, clientId]);

    if (!initialData) {
        return <div>Loading...</div>;
    }

    return <ClientForm 
        initialData={initialData} 
        mode="edit" 
        clientId={clientId} 
    />;
}
