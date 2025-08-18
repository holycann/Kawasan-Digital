import baseService from '../baseService';

const PROJECT_IMAGES_TABLE = 'project_images';

/**
 * Images service for managing project image-related operations
 */
export const imagesService = {
    /**
     * Fetch all project images
     * @returns {Promise} All project images
     */
    fetchProjectImages: async (options = {}) => {
        try {
            return baseService.fetchWithOptions(PROJECT_IMAGES_TABLE, {
                ...options,
                orderBy: options.orderBy || 'image_order',
                ascending: options.ascending !== undefined ? options.ascending : true
            });
        } catch (error) {
            console.error('Error fetching project images:', error);
            throw error;
        }
    },

    /**
     * Fetch project images by project ID
     * @param {string} projectId - ID of the project
     * @param {Object} options - Optional fetch options
     * @returns {Promise} Project images for specific project
     */
    fetchProjectImagesByProjectId: async (projectId, options = {}) => {
        try {
            const mergedOptions = {
                ...options,
                filters: { 
                    ...options.filters, 
                    project_id: projectId 
                },
                orderBy: options.orderBy || 'image_order',
                ascending: options.ascending !== undefined ? options.ascending : true
            };

            return baseService.fetchWithOptions(PROJECT_IMAGES_TABLE, mergedOptions);
        } catch (error) {
            console.error('Error fetching project images by project ID:', error);
            throw error;
        }
    },

    /**
     * Upload and associate an image with a project
     * @param {string} projectId - ID of the project
     * @param {Object} imageData - Image details to upload
     * @returns {Promise} Uploaded image details
     */
    uploadProjectImage: async (projectId, imageData) => {
        try {
            const preparedData = {
                project_id: projectId,
                ...imageData,
                // Ensure image_order is set if not provided
                image_order: imageData.image_order !== undefined 
                    ? imageData.image_order 
                    : await imagesService.getNextImageOrder(projectId)
            };

            return baseService.create(PROJECT_IMAGES_TABLE, preparedData);
        } catch (error) {
            console.error('Error uploading project image:', error);
            throw error;
        }
    },

    /**
     * Bulk upload images for a project
     * @param {string} projectId - ID of the project
     * @param {Array} imagesData - Array of image details to upload
     * @returns {Promise} Uploaded image details
     */
    bulkUploadProjectImages: async (projectId, imagesData) => {
        try {
            const preparedData = imagesData.map((imageData, index) => ({
                project_id: projectId,
                ...imageData,
                // Ensure image_order is set if not provided
                image_order: imageData.image_order !== undefined 
                    ? imageData.image_order 
                    : index
            }));

            return baseService.create(PROJECT_IMAGES_TABLE, preparedData);
        } catch (error) {
            console.error('Error bulk uploading project images:', error);
            throw error;
        }
    },

    /**
     * Update an existing project image
     * @param {string} imageId - ID of the image to update
     * @param {Object} updateData - Data to update
     * @returns {Promise} Updated image details
     */
    updateProjectImage: async (imageId, updateData) => {
        try {
            return baseService.update(PROJECT_IMAGES_TABLE, imageId, updateData);
        } catch (error) {
            console.error('Error updating project image:', error);
            throw error;
        }
    },

    /**
     * Delete a project image
     * @param {string} imageId - ID of the image to delete
     * @returns {Promise} Deletion result
     */
    deleteProjectImage: async (imageId) => {
        try {
            return baseService.delete(PROJECT_IMAGES_TABLE, imageId);
        } catch (error) {
            console.error('Error deleting project image:', error);
            throw error;
        }
    },

    /**
     * Get the next image order for a project
     * @param {string} projectId - ID of the project
     * @returns {Promise<number>} Next image order
     */
    getNextImageOrder: async (projectId) => {
        try {
            const result = await baseService.fetchWithOptions(
                PROJECT_IMAGES_TABLE, 
                {
                    filters: { project_id: projectId },
                    orderBy: 'image_order',
                    ascending: false,
                    pageSize: 1
                }
            );

            // If no images exist, start at 0, otherwise increment the last order
            return result.data.length > 0 
                ? result.data[0].image_order + 1 
                : 0;
        } catch (error) {
            console.error('Error getting next image order:', error);
            return 0;
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
            const currentImages = await baseService.fetchWithOptions(
                PROJECT_IMAGES_TABLE, 
                { 
                    filters: { project_id: projectId },
                    select: 'id' 
                }
            );

            // Validate that all provided image IDs belong to the project
            const validImageIds = new Set(currentImages.data.map(img => img.id));
            const invalidImages = imageOrder.filter(imgId => !validImageIds.has(imgId));

            if (invalidImages.length > 0) {
                throw new Error(`Invalid image IDs for project: ${invalidImages.join(', ')}`);
            }

            // Perform batch update
            const updatePromises = imageOrder.map((imageId, index) =>
                baseService.update(PROJECT_IMAGES_TABLE, imageId, { image_order: index })
            );

            return Promise.all(updatePromises);
        } catch (error) {
            console.error('Error reordering project images:', error);
            throw error;
        }
    },

    /**
     * Get a single project image by ID
     * @param {string} imageId - ID of the image
     * @returns {Promise} Image details
     */
    getProjectImageById: async (imageId) => {
        try {
            return baseService.getById(PROJECT_IMAGES_TABLE, imageId);
        } catch (error) {
            console.error('Error getting project image by ID:', error);
            throw error;
        }
    }
};

export default imagesService; 