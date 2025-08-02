import React, { useState, useCallback } from 'react';
import { ProjectHighlightsContext } from '@/contexts/ProjectContext';
import { highlightsService } from '@/services/projects';

// Provider component
export const ProjectHighlightsProvider = ({ children, projectId }) => {
    const [highlights, setHighlights] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch project highlights
    const fetchProjectHighlights = useCallback(async (options = {}) => {
        if (!projectId) {
            throw new Error('Project ID is required to fetch highlights');
        }

        setLoading(true);
        setError(null);
        try {
            const response = await highlightsService.fetchProjectHighlights(projectId, options);
            setHighlights(response);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [projectId]);

    // Add a project highlight
    const addProjectHighlight = useCallback(async (highlightData) => {
        if (!projectId) {
            throw new Error('Project ID is required to add a highlight');
        }

        setLoading(true);
        setError(null);
        try {
            const newHighlight = await highlightsService.addProjectHighlight(projectId, highlightData);
            // Update local state
            setHighlights(prev => [...prev, newHighlight[0]]);
            return newHighlight[0];
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [projectId]);

    // Update a project highlight
    const updateProjectHighlight = useCallback(async (highlightId, updateData) => {
        setLoading(true);
        setError(null);
        try {
            const updatedHighlight = await highlightsService.updateProjectHighlight(highlightId, updateData);
            // Update local state
            setHighlights(prev =>
                prev.map(highlight =>
                    highlight.id === highlightId ? updatedHighlight[0] : highlight
                )
            );
            return updatedHighlight[0];
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Delete a project highlight
    const deleteProjectHighlight = useCallback(async (highlightId) => {
        setLoading(true);
        setError(null);
        try {
            await highlightsService.deleteProjectHighlight(highlightId);
            // Remove from local state
            setHighlights(prev => prev.filter(highlight => highlight.id !== highlightId));
            return { success: true, highlightId };
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Bulk add project highlights
    const bulkAddProjectHighlights = useCallback(async (highlightsData) => {
        if (!projectId) {
            throw new Error('Project ID is required to bulk add highlights');
        }

        setLoading(true);
        setError(null);
        try {
            const newHighlights = await highlightsService.bulkAddProjectHighlights(projectId, highlightsData);
            // Update local state
            setHighlights(prev => [...prev, ...newHighlights]);
            return newHighlights;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [projectId]);

    // Provide context value
    const contextValue = {
        highlights,
        loading,
        error,
        fetchProjectHighlights,
        addProjectHighlight,
        updateProjectHighlight,
        deleteProjectHighlight,
        bulkAddProjectHighlights
    };

    return (
        <ProjectHighlightsContext.Provider value={contextValue}>
            {children}
        </ProjectHighlightsContext.Provider>
    );
};

export default ProjectHighlightsProvider; 