import React, { useState, useCallback } from 'react';
import { ProjectStoriesContext } from '@/contexts/ProjectContext';
import { storiesService } from '@/services/projects';

// Provider component
export const ProjectStoriesProvider = ({ children, projectId }) => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch project stories
    const fetchProjectStories = useCallback(async (options = {}) => {
        if (!projectId) {
            throw new Error('Project ID is required to fetch stories');
        }

        setLoading(true);
        setError(null);
        try {
            const response = await storiesService.fetchProjectStories(projectId, options);
            setStories(response.data);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [projectId]);

    // Add a story to a project
    const addProjectStory = useCallback(async (storyData) => {
        if (!projectId) {
            throw new Error('Project ID is required to add a story');
        }

        setLoading(true);
        setError(null);
        try {
            const newStory = await storiesService.addProjectStory(projectId, storyData);
            // Update local state
            setStories(prev => [...prev, newStory[0]]);
            return newStory[0];
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [projectId]);

    // Update a project story
    const updateProjectStory = useCallback(async (storyId, updateData) => {
        setLoading(true);
        setError(null);
        try {
            const updatedStory = await storiesService.updateProjectStory(storyId, updateData);
            // Update local state
            setStories(prev =>
                prev.map(story =>
                    story.id === storyId ? updatedStory[0] : story
                )
            );
            return updatedStory[0];
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Delete a project story
    const deleteProjectStory = useCallback(async (storyId) => {
        setLoading(true);
        setError(null);
        try {
            await storiesService.deleteProjectStory(storyId);
            // Remove from local state
            setStories(prev => prev.filter(story => story.id !== storyId));
            return { success: true, storyId };
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Reorder project stories
    const reorderProjectStories = useCallback(async (storyOrder) => {
        if (!projectId) {
            throw new Error('Project ID is required to reorder stories');
        }

        setLoading(true);
        setError(null);
        try {
            await storiesService.reorderProjectStories(projectId, storyOrder);
            // Refetch stories to ensure correct order
            await fetchProjectStories();
            return { success: true };
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [projectId, fetchProjectStories]);

    // Bulk add project stories
    const bulkAddProjectStories = useCallback(async (storiesData) => {
        if (!projectId) {
            throw new Error('Project ID is required to bulk add stories');
        }

        setLoading(true);
        setError(null);
        try {
            const newStories = await storiesService.bulkAddProjectStories(projectId, storiesData);
            // Update local state
            setStories(prev => [...prev, ...newStories]);
            return newStories;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [projectId]);

    // Get a single story by ID
    const getStoryById = useCallback(async (storyId) => {
        setLoading(true);
        setError(null);
        try {
            const story = await storiesService.getStoryById(storyId);
            return story;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Provide context value
    const contextValue = {
        stories,
        loading,
        error,
        fetchProjectStories,
        addProjectStory,
        updateProjectStory,
        deleteProjectStory,
        reorderProjectStories,
        bulkAddProjectStories,
        getStoryById
    };

    return (
        <ProjectStoriesContext.Provider value={contextValue}>
            {children}
        </ProjectStoriesContext.Provider>
    );
};

export default ProjectStoriesProvider; 