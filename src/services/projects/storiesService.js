import baseService from '../baseService';

const PROJECT_STORIES_TABLE = 'project_stories';

/**
 * Stories service for managing project story-related operations
 */
export const storiesService = {
    /**
     * Fetch stories for a specific project
     * @param {string} projectId - ID of the project
     * @param {Object} options - Optional fetch options
     * @returns {Promise} Fetched project stories
     */
    fetchProjectStories: async (projectId, options = {}) => {
        try {
            const mergedOptions = {
                ...options,
                filters: { 
                    ...options.filters, 
                    project_id: projectId 
                },
                orderBy: options.orderBy || 'created_at',
                ascending: options.ascending !== undefined ? options.ascending : true
            };

            return baseService.fetchWithOptions(PROJECT_STORIES_TABLE, mergedOptions);
        } catch (error) {
            console.error('Error fetching project stories:', error);
            throw error;
        }
    },

    /**
     * Add a story to a project
     * @param {string} projectId - ID of the project
     * @param {Object} storyData - Story details to add
     * @returns {Promise} Added story details
     */
    addProjectStory: async (projectId, storyData) => {
        try {
            const preparedData = {
                project_id: projectId,
                ...storyData,
                // Ensure content is a valid JSONB
                content: storyData.content 
                    ? JSON.parse(JSON.stringify(storyData.content)) 
                    : null
            };

            return baseService.create(PROJECT_STORIES_TABLE, preparedData);
        } catch (error) {
            console.error('Error adding project story:', error);
            throw error;
        }
    },

    /**
     * Update an existing project story
     * @param {string} storyId - ID of the story to update
     * @param {Object} updateData - Data to update
     * @returns {Promise} Updated story details
     */
    updateProjectStory: async (storyId, updateData) => {
        try {
            // Ensure content is a valid JSONB if provided
            const preparedData = {
                ...updateData,
                content: updateData.content
                    ? JSON.parse(JSON.stringify(updateData.content))
                    : updateData.content
            };

            return baseService.update(PROJECT_STORIES_TABLE, storyId, preparedData);
        } catch (error) {
            console.error('Error updating project story:', error);
            throw error;
        }
    },

    /**
     * Delete a project story
     * @param {string} storyId - ID of the story to delete
     * @returns {Promise} Deletion result
     */
    deleteProjectStory: async (storyId) => {
        return baseService.delete(PROJECT_STORIES_TABLE, storyId);
    },

    /**
     * Bulk add stories to a project
     * @param {string} projectId - ID of the project
     * @param {Array} storiesData - Array of story details to add
     * @returns {Promise} Added stories
     */
    bulkAddProjectStories: async (projectId, storiesData) => {
        try {
            const preparedData = storiesData.map(story => ({
                project_id: projectId,
                ...story,
                // Ensure content is a valid JSONB
                content: story.content
                    ? JSON.parse(JSON.stringify(story.content))
                    : null
            }));

            return baseService.create(PROJECT_STORIES_TABLE, preparedData);
        } catch (error) {
            console.error('Error bulk adding project stories:', error);
            throw error;
        }
    },

    /**
     * Reorder project stories
     * @param {string} projectId - ID of the project
     * @param {Array} storyOrder - Array of story IDs in desired order
     * @returns {Promise} Reordering result
     */
    reorderProjectStories: async (projectId, storyOrder) => {
        try {
            // Fetch current stories to ensure they belong to the project
            const currentStories = await baseService.fetchWithOptions(
                PROJECT_STORIES_TABLE, 
                { 
                    filters: { project_id: projectId },
                    select: 'id' 
                }
            );

            // Validate that all provided story IDs belong to the project
            const validStoryIds = new Set(currentStories.data.map(story => story.id));
            const invalidStories = storyOrder.filter(storyId => !validStoryIds.has(storyId));

            if (invalidStories.length > 0) {
                throw new Error(`Invalid story IDs for project: ${invalidStories.join(', ')}`);
            }

            // Perform batch update
            const updatePromises = storyOrder.map((storyId, index) =>
                baseService.update(PROJECT_STORIES_TABLE, storyId, { 
                    // If you want to add an order column
                    story_order: index + 1 
                })
            );

            return Promise.all(updatePromises);
        } catch (error) {
            console.error('Error reordering project stories:', error);
            throw error;
        }
    },

    /**
     * Get a single story by ID
     * @param {string} storyId - ID of the story
     * @returns {Promise} Story details
     */
    getStoryById: async (storyId) => {
        return baseService.getById(PROJECT_STORIES_TABLE, storyId);
    }
};

export default storiesService; 