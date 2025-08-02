import baseService from '../baseService';

const PROJECT_IMAGES_TABLE = 'project_images';

/**
 * Images service for managing project image-related operations
 */
export const imagesService = {
    /**
     * Fetch images for a specific project
     * @param {string} projectId - ID of the project
     * @param {Object} options - Optional fetch options
     * @returns {Promise} Fetched project images
     */
    fetchProjectImages: async (projectId, options = {}) => {
        return baseService.fetchWithOptions(PROJECT_IMAGES_TABLE, {
            filters: { project_id: projectId },
            orderBy: 'image_order',
            ascending: true,
            ...options
        });
    },

    /**
     * Upload and associate an image with a project
     * @param {string} projectId - ID of the project
     * @param {Object} imageData - Image details to upload
     * @returns {Promise} Uploaded image details
     */
    uploadProjectImage: async (projectId, imageData) => {
        const preparedData = {
            project_id: projectId,
            ...imageData,
            // Ensure image_order is set if not provided
            image_order: imageData.image_order ||
                (await imagesService.getNextImageOrder(projectId))
        };

        return baseService.create(PROJECT_IMAGES_TABLE, preparedData);
    },

    /**
     * Update an existing project image
     * @param {string} imageId - ID of the image to update
     * @param {Object} updateData - Data to update
     * @returns {Promise} Updated image details
     */
    updateProjectImage: async (imageId, updateData) => {
        return baseService.update(PROJECT_IMAGES_TABLE, imageId, updateData);
    },

    /**
     * Delete a project image
     * @param {string} imageId - ID of the image to delete
     * @returns {Promise} Deletion result
     */
    deleteProjectImage: async (imageId) => {
        return baseService.delete(PROJECT_IMAGES_TABLE, imageId);
    },

    /**
     * Get the next image order for a project
     * @param {string} projectId - ID of the project
     * @returns {Promise<number>} Next image order
     */
    getNextImageOrder: async (projectId) => {
        try {
            const { data, error } = await baseService.fetchWithOptions(PROJECT_IMAGES_TABLE, {
                filters: { project_id: projectId },
                orderBy: 'image_order',
                ascending: false,
                pageSize: 1
            });

            if (error) throw error;

            // If no images exist, start at 1, otherwise increment the last order
            return data.data.length > 0 ? data.data[0].image_order + 1 : 1;
        } catch (error) {
            console.error('Error getting next image order:', error);
            return 1;
        }
    },

    /**
     * Reorder project images
     * @param {string} projectId - ID of the project
     * @param {Array} imageOrder - Array of image IDs in desired order
     * @returns {Promise} Reordering result
     */
    reorderProjectImages: async (projectId, imageOrder) => {
        try {
            // Fetch current images to ensure they belong to the project
            const { data: currentImages, error: fetchError } = await baseService.fetchWithOptions(PROJECT_IMAGES_TABLE, {
                filters: { project_id: projectId },
                select: 'id'
            });

            if (fetchError) throw fetchError;

            // Validate that all provided image IDs belong to the project
            const validImageIds = new Set(currentImages.data.map(img => img.id));
            const invalidImages = imageOrder.filter(imgId => !validImageIds.has(imgId));

            if (invalidImages.length > 0) {
                throw new Error(`Invalid image IDs for project: ${invalidImages.join(', ')}`);
            }

            // Perform batch update
            const updatePromises = imageOrder.map((imageId, index) =>
                baseService.update(PROJECT_IMAGES_TABLE, imageId, { image_order: index + 1 })
            );

            return Promise.all(updatePromises);
        } catch (error) {
            console.error('Error reordering project images:', error);
            throw error;
        }
    }
};

export default imagesService; 