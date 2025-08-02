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
                orderBy: options.orderBy || 'story_order',
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
                // Ensure story_content and story_impact are valid JSONB
                story_content: storyData.story_content
                    ? JSON.parse(JSON.stringify(storyData.story_content))
                    : null,
                story_impact: storyData.story_impact
                    ? JSON.parse(JSON.stringify(storyData.story_impact))
                    : null,
                // Set story_order if not provided
                story_order: storyData.story_order ||
                    (await storiesService.getNextStoryOrder(projectId))
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
            // Ensure story_content and story_impact are valid JSONB if provided
            const preparedData = {
                ...updateData,
                story_content: updateData.story_content
                    ? JSON.parse(JSON.stringify(updateData.story_content))
                    : updateData.story_content,
                story_impact: updateData.story_impact
                    ? JSON.parse(JSON.stringify(updateData.story_impact))
                    : updateData.story_impact
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
     * Get the next story order for a project
     * @param {string} projectId - ID of the project
     * @returns {Promise<number>} Next story order
     */
    getNextStoryOrder: async (projectId) => {
        try {
            const result = await baseService.fetchWithOptions(
                PROJECT_STORIES_TABLE, 
                {
                    filters: { project_id: projectId },
                    orderBy: 'story_order',
                    ascending: false,
                    pageSize: 1
                }
            );

            // If no stories exist, start at 1, otherwise increment the last order
            return result.data.length > 0 
                ? result.data[0].story_order + 1 
                : 1;
        } catch (error) {
            console.error('Error getting next story order:', error);
            return 1;
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
                baseService.update(PROJECT_STORIES_TABLE, storyId, { story_order: index + 1 })
            );

            return Promise.all(updatePromises);
        } catch (error) {
            console.error('Error reordering project stories:', error);
            throw error;
        }
    },

    /**
     * Bulk add stories to a project
     * @param {string} projectId - ID of the project
     * @param {Array} storiesData - Array of story details to add
     * @returns {Promise} Added stories
     */
    bulkAddProjectStories: async (projectId, storiesData) => {
        try {
            const preparedData = storiesData.map((story, index) => ({
                project_id: projectId,
                ...story,
                story_content: story.story_content
                    ? JSON.parse(JSON.stringify(story.story_content))
                    : null,
                story_impact: story.story_impact
                    ? JSON.parse(JSON.stringify(story.story_impact))
                    : null,
                story_order: story.story_order || (index + 1)
            }));

            return baseService.create(PROJECT_STORIES_TABLE, preparedData);
        } catch (error) {
            console.error('Error bulk adding project stories:', error);
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