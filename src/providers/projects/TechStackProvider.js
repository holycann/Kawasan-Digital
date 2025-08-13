import React, { useState, useCallback } from 'react';
import { ProjectTechStackContext } from '@/contexts/ProjectContext';
import { techStackService } from '@/services/projects';

// Provider component
export const ProjectTechStackProvider = ({ children, projectId }) => {
    const [techStacks, setTechStacks] = useState([]);
    const [projectTechStack, setProjectTechStack] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch all tech stacks
    const fetchTechStacks = useCallback(async (options = {}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await techStackService.fetchTechStacks(options);
            setTechStacks(response.data);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch tech stack for a specific project
    const fetchProjectTechStack = useCallback(async () => {
        if (!projectId) {
            throw new Error('Project ID is required to fetch project tech stack');
        }

        setLoading(true);
        setError(null);
        try {
            const response = await techStackService.fetchProjectTechStack(projectId);
            setProjectTechStack(response);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [projectId]);

    // Create a new tech stack entry
    const createTechStack = useCallback(async (techStackData) => {
        setLoading(true);
        setError(null);
        try {
            const newTechStack = await techStackService.createTechStack(techStackData);
            // Update local state
            setTechStacks(prev => [...prev, newTechStack[0]]);
            return newTechStack[0];
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Update an existing tech stack entry
    const updateTechStack = useCallback(async (techStackId, updateData) => {
        setLoading(true);
        setError(null);
        try {
            const updatedTechStack = await techStackService.updateTechStack(techStackId, updateData);
            // Update local state
            setTechStacks(prev =>
                prev.map(techStack =>
                    techStack.id === techStackId ? updatedTechStack[0] : techStack
                )
            );
            return updatedTechStack[0];
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Delete a tech stack entry
    const deleteTechStack = useCallback(async (techStackId) => {
        setLoading(true);
        setError(null);
        try {
            await techStackService.deleteTechStack(techStackId);
            // Remove from local state
            setTechStacks(prev => prev.filter(techStack => techStack.id !== techStackId));
            return { success: true, techStackId };
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Add tech stack to a project
    const addProjectTechStack = useCallback(async (techIds) => {
        if (!projectId) {
            throw new Error('Project ID is required to add tech stack');
        }

        setLoading(true);
        setError(null);
        try {
            const newProjectTechStack = await techStackService.addProjectTechStack(projectId, techIds);
            // Refetch project tech stack to ensure updated data
            await fetchProjectTechStack();
            return newProjectTechStack;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [projectId, fetchProjectTechStack]);

    // Remove tech stack from a project
    const removeProjectTechStack = useCallback(async (techIds) => {
        if (!projectId) {
            throw new Error('Project ID is required to remove tech stack');
        }

        setLoading(true);
        setError(null);
        try {
            const result = await techStackService.removeProjectTechStack(projectId, techIds);
            // Refetch project tech stack to ensure updated data
            await fetchProjectTechStack();
            return result;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [projectId, fetchProjectTechStack]);

    // Provide context value
    const contextValue = {
        techStacks,
        projectTechStack,
        loading,
        error,
        fetchTechStacks,
        fetchProjectTechStack,
        createTechStack,
        updateTechStack,
        deleteTechStack,
        addProjectTechStack,
        removeProjectTechStack
    };

    return (
        <ProjectTechStackContext.Provider value={contextValue}>
            {children}
        </ProjectTechStackContext.Provider>
    );
};

export default ProjectTechStackProvider; 