import baseService from '../baseService';

const PROJECT_HIGHLIGHTS_TABLE = 'project_highlights';

/**
 * Highlights service for managing project highlight-related operations
 */
export const highlightsService = {
    /**
     * Fetch highlights for a specific project
     * @param {string} projectId - ID of the project
     * @param {Object} options - Optional fetch options
     * @returns {Promise} Fetched project highlights
     */
    fetchProjectHighlights: async (projectId, options = {}) => {
        return baseService.fetchWithOptions(PROJECT_HIGHLIGHTS_TABLE, {
            filters: { project_id: projectId },
            orderBy: 'created_at',
            ascending: false,
            ...options
        });
    },

    /**
     * Add a highlight to a project
     * @param {string} projectId - ID of the project
     * @param {Object} highlightData - Highlight details to add
     * @returns {Promise} Added highlight details
     */
    addProjectHighlight: async (projectId, highlightData) => {
        const preparedData = {
            project_id: projectId,
            ...highlightData,
            // Ensure highlight_metrics is a valid JSONB
            highlight_metrics: highlightData.highlight_metrics
                ? JSON.parse(JSON.stringify(highlightData.highlight_metrics))
                : null
        };

        return baseService.create(PROJECT_HIGHLIGHTS_TABLE, preparedData);
    },

    /**
     * Update an existing project highlight
     * @param {string} highlightId - ID of the highlight to update
     * @param {Object} updateData - Data to update
     * @returns {Promise} Updated highlight details
     */
    updateProjectHighlight: async (highlightId, updateData) => {
        // Ensure highlight_metrics is a valid JSONB if provided
        const preparedData = updateData.highlight_metrics
            ? {
                ...updateData,
                highlight_metrics: JSON.parse(JSON.stringify(updateData.highlight_metrics))
            }
            : updateData;

        return baseService.update(PROJECT_HIGHLIGHTS_TABLE, highlightId, preparedData);
    },

    /**
     * Delete a project highlight
     * @param {string} highlightId - ID of the highlight to delete
     * @returns {Promise} Deletion result
     */
    deleteProjectHighlight: async (highlightId) => {
        return baseService.delete(PROJECT_HIGHLIGHTS_TABLE, highlightId);
    },

    /**
     * Bulk add highlights to a project
     * @param {string} projectId - ID of the project
     * @param {Array} highlightsData - Array of highlight details to add
     * @returns {Promise} Added highlights
     */
    bulkAddProjectHighlights: async (projectId, highlightsData) => {
        const preparedData = highlightsData.map(highlight => ({
            project_id: projectId,
            ...highlight,
            highlight_metrics: highlight.highlight_metrics
                ? JSON.parse(JSON.stringify(highlight.highlight_metrics))
                : null
        }));

        return baseService.create(PROJECT_HIGHLIGHTS_TABLE, preparedData);
    },

    /**
     * Get a single highlight by ID
     * @param {string} highlightId - ID of the highlight
     * @returns {Promise} Highlight details
     */
    getHighlightById: async (highlightId) => {
        return baseService.getById(PROJECT_HIGHLIGHTS_TABLE, highlightId);
    }
};

export default highlightsService; 