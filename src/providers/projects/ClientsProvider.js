import React, { useState, useCallback } from 'react';
import { ProjectClientsContext } from '@/contexts/ProjectContext';
import { clientsService } from '@/services/projects';

// Provider component
export const ProjectClientsProvider = ({ children }) => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch clients
    const fetchClients = useCallback(async (options = {}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await clientsService.fetchClients(options);
            setClients(response.data);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Create a new client
    const createClient = useCallback(async (clientData) => {
        setLoading(true);
        setError(null);
        try {
            const newClient = await clientsService.createClient(clientData);
            // Update local state
            setClients(prev => [...prev, newClient[0]]);
            return newClient[0];
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Update an existing client
    const updateClient = useCallback(async (clientId, updateData) => {
        setLoading(true);
        setError(null);
        try {
            const updatedClient = await clientsService.updateClient(clientId, updateData);
            // Update local state
            setClients(prev =>
                prev.map(client =>
                    client.id === clientId ? updatedClient[0] : client
                )
            );
            return updatedClient[0];
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Delete a client
    const deleteClient = useCallback(async (clientId) => {
        setLoading(true);
        setError(null);
        try {
            await clientsService.deleteClient(clientId);
            // Remove from local state
            setClients(prev => prev.filter(client => client.id !== clientId));
            return { success: true, clientId };
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Get a client by ID
    const getClientById = useCallback(async (clientId) => {
        setLoading(true);
        setError(null);
        try {
            const client = await clientsService.getClientById(clientId);
            return client;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Provide context value
    const contextValue = {
        clients,
        loading,
        error,
        fetchClients,
        createClient,
        updateClient,
        deleteClient,
        getClientById
    };

    return (
        <ProjectClientsContext.Provider value={contextValue}>
            {children}
        </ProjectClientsContext.Provider>
    );
};

export default ProjectClientsProvider; 