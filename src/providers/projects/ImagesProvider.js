import React, { useState, useCallback } from 'react';
import { ProjectImagesContext } from '@/contexts/ProjectContext';
import { imagesService } from '@/services/projects';

// Provider component
export const ProjectImagesProvider = ({ children }) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch project images
    const fetchProjectImages = useCallback(async (projectId, options = {}) => {
        if (!projectId) {
            throw new Error('Project ID is required to fetch images');
        }

        setLoading(true);
        setError(null);
        try {
            const response = await imagesService.fetchProjectImagesByProjectId(projectId, options);
            setImages(response.data);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Upload a project image
    const uploadProjectImages = useCallback(async (projectId, imagesData) => {
        if (!projectId) {
            throw new Error('Project ID is required to upload images');
        }

        setLoading(true);
        setError(null);
        try {
            const newImages = await imagesService.uploadProjectImages(projectId, imagesData);
            // Update local state
            setImages(prev => [...prev, ...newImages]);
            return newImages;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Update a project image
    const updateProjectImage = useCallback(async (imageId, updateData) => {
        setLoading(true);
        setError(null);
        try {
            const updatedImage = await imagesService.updateProjectImage(imageId, updateData);
            // Update local state
            setImages(prev =>
                prev.map(image =>
                    image.id === imageId ? updatedImage[0] : image
                )
            );
            return updatedImage[0];
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Delete a project image
    const deleteProjectImage = useCallback(async (imageId) => {
        setLoading(true);
        setError(null);
        try {
            await imagesService.deleteProjectImage(imageId);
            // Remove from local state
            setImages(prev => prev.filter(image => image.id !== imageId));
            return { success: true, imageId };
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Reorder project images
    const reorderProjectImages = useCallback(async (projectId, imageOrder) => {
        if (!projectId) {
            throw new Error('Project ID is required to reorder images');
        }

        setLoading(true);
        setError(null);
        try {
            await imagesService.reorderProjectImages(projectId, imageOrder);
            // Refetch images to ensure correct order
            await fetchProjectImages(projectId);
            return { success: true };
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Get a single project image by ID
    const getProjectImageById = useCallback(async (imageId) => {
        setLoading(true);
        setError(null);
        try {
            const image = await imagesService.getProjectImageById(imageId);
            return image;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Provide context value
    const contextValue = {
        images,
        loading,
        error,
        fetchProjectImages,
        uploadProjectImages,
        updateProjectImage,
        deleteProjectImage,
        reorderProjectImages,
        getProjectImageById
    };

    return (
        <ProjectImagesContext.Provider value={contextValue}>
            {children}
        </ProjectImagesContext.Provider>
    );
};

export default ProjectImagesProvider; 