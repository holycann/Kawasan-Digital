import React, { useState, useCallback } from 'react';
import { ProjectImagesContext } from '@/contexts/ProjectContext';
import { imagesService } from '@/services/projects';

// Provider component
export const ProjectImagesProvider = ({ children, projectId }) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch project images
    const fetchProjectImages = useCallback(async (options = {}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await imagesService.fetchProjectImages(options);
            setImages(response.data);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch project images by project ID
    const fetchProjectImagesByProjectId = useCallback(async (options = {}) => {
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
    }, [projectId]);

    // Upload a project image
    const uploadProjectImage = useCallback(async (imageData) => {
        if (!projectId) {
            throw new Error('Project ID is required to upload an image');
        }

        setLoading(true);
        setError(null);
        try {
            const newImage = await imagesService.uploadProjectImage(projectId, imageData);
            // Update local state
            setImages(prev => [...prev, newImage[0]]);
            return newImage[0];
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [projectId]);

    // Bulk upload project images
    const bulkUploadProjectImages = useCallback(async (imagesData) => {
        if (!projectId) {
            throw new Error('Project ID is required to bulk upload images');
        }

        setLoading(true);
        setError(null);
        try {
            const newImages = await imagesService.bulkUploadProjectImages(projectId, imagesData);
            // Update local state
            setImages(prev => [...prev, ...newImages]);
            return newImages;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [projectId]);

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
    const reorderProjectImages = useCallback(async (imageOrder) => {
        if (!projectId) {
            throw new Error('Project ID is required to reorder images');
        }

        setLoading(true);
        setError(null);
        try {
            await imagesService.reorderProjectImages(projectId, imageOrder);
            // Refetch images to ensure correct order
            await fetchProjectImagesByProjectId();
            return { success: true };
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [projectId, fetchProjectImagesByProjectId]);

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
        fetchProjectImagesByProjectId,
        uploadProjectImage,
        updateProjectImage,
        deleteProjectImage,
        bulkUploadProjectImages,
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