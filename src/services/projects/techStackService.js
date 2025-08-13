import baseService from '../baseService';

const TECH_STACK_TABLE = 'tech_stack';
const PROJECT_TECH_STACK_TABLE = 'project_tech_stack';

/**
 * Tech Stack service for managing tech stack-related operations
 */
export const techStackService = {
    /**
     * Fetch tech stack entries
     * @param {Object} options - Fetch options
     * @returns {Promise} Fetched tech stack entries
     */
    fetchTechStacks: async (options = {}) => {
        return baseService.fetchWithOptions(TECH_STACK_TABLE, options);
    },

    /**
     * Create a new tech stack entry
     * @param {Object} techStackData - Tech stack data to create
     * @returns {Promise} Created tech stack entry
     */
    createTechStack: async (techStackData) => {
        return baseService.create(TECH_STACK_TABLE, techStackData);
    },

    /**
     * Update an existing tech stack entry
     * @param {string} techStackId - ID of the tech stack to update
     * @param {Object} updateData - Data to update
     * @returns {Promise} Updated tech stack entry
     */
    updateTechStack: async (techStackId, updateData) => {
        return baseService.update(TECH_STACK_TABLE, techStackId, updateData);
    },

    /**
     * Delete a tech stack entry
     * @param {string} techStackId - ID of the tech stack to delete
     * @returns {Promise} Deletion result
     */
    deleteTechStack: async (techStackId) => {
        return baseService.delete(TECH_STACK_TABLE, techStackId);
    },

    /**
     * Fetch tech stack for a specific project
     * @param {string} projectId - ID of the project
     * @returns {Promise} Tech stack for the project
     */
    fetchProjectTechStack: async (projectId) => {
        try {
            const result = await baseService.fetchWithOptions(
                PROJECT_TECH_STACK_TABLE,
                {
                    filters: { project_id: projectId },
                    select: `
                        *,
                        tech_stack (
                            id,
                            tech_name,
                            tech_category,
                            tech_version,
                            tech_role
                        )
                    `
                }
            );

            return result.data;
        } catch (error) {
            console.error('Error fetching project tech stack:', error);
            throw error;
        }
    },

    /**
     * Add tech stack to a project
     * @param {string} projectId - ID of the project
     * @param {string|string[]} techIds - Tech stack IDs to add
     * @returns {Promise} Added tech stack entries
     */
    addProjectTechStack: async (projectId, techIds) => {
        try {
            // Ensure techIds is an array
            const techStackEntries = Array.isArray(techIds)
                ? techIds.map(techId => ({
                    project_id: projectId,
                    tech_id: techId
                }))
                : [{
                    project_id: projectId,
                    tech_id: techIds
                }];

            return baseService.create(PROJECT_TECH_STACK_TABLE, techStackEntries);
        } catch (error) {
            console.error('Error adding project tech stack:', error);
            throw error;
        }
    },

    /**
     * Remove tech stack from a project
     * @param {string} projectId - ID of the project
     * @param {string|string[]} techIds - Optional tech stack IDs to remove
     * @returns {Promise} Removal result
     */
    removeProjectTechStack: async (projectId, techIds) => {
        try {
            // If specific tech IDs are provided, filter by those
            const options = {
                filters: {
                    project_id: projectId,
                    ...(techIds && {
                        tech_id: Array.isArray(techIds) ? techIds : [techIds]
                    })
                }
            };

            const { data } = await baseService.fetchWithOptions(
                PROJECT_TECH_STACK_TABLE,
                options
            );

            // Delete the fetched records
            const deletePromises = data.map(record =>
                baseService.delete(PROJECT_TECH_STACK_TABLE, record.id)
            );

            await Promise.all(deletePromises);

            return {
                success: true,
                projectId,
                removedTechIds: techIds
            };
        } catch (error) {
            console.error('Error removing project tech stack:', error);
            throw error;
        }
    }
};

export default techStackService; 