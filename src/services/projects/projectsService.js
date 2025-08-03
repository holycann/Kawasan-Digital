import baseService from '../baseService';
import techStackService from './techStackService';
import imagesService from './imagesService';
import highlightsService from './highlightsService';
import storiesService from './storiesService';

const TABLE_NAME = 'projects';

/**
 * Projects service for managing project-related operations
 */
export const projectsService = {
    /**
     * Fetch projects with optional filtering and pagination
     * @param {Object} options - Fetch options
     * @returns {Promise} Fetched projects
     */
    fetchProjects: async (options = {}) => {
        return baseService.fetchWithOptions(TABLE_NAME, {
            ...options,
            select: `
                *,
                category:project_categories(id,name),
                client:clients(id,name)
            `
        });
    },

    /**
     * Create a new project
     * @param {Object} projectData - Project data to create
     * @returns {Promise} Created project
     */
    createProject: async (projectData) => {
        return baseService.create(TABLE_NAME, projectData);
    },

    /**
     * Update an existing project
     * @param {string} projectId - ID of the project to update
     * @param {Object} updateData - Data to update
     * @returns {Promise} Updated project
     */
    updateProject: async (projectId, updateData) => {
        return baseService.update(TABLE_NAME, projectId, updateData);
    },

    /**
     * Delete a project
     * @param {string} projectId - ID of the project to delete
     * @returns {Promise} Deletion result
     */
    deleteProject: async (projectId) => {
        return baseService.delete(TABLE_NAME, projectId);
    },

    /**
     * Get a single project by ID
     * @param {string} projectId - ID of the project to fetch
     * @returns {Promise} Fetched project
     */
    getProjectById: async (projectId) => {
        return baseService.getById(TABLE_NAME, projectId, `
            *,
            category:project_categories(id,name),
            client:clients(id,name)
        `);
    },

    /**
     * Fetch comprehensive project details
     * @param {string} projectId - ID of the project to fetch
     * @returns {Promise} Comprehensive project details
     */
    fetchFullProjectDetails: async (projectId) => {
        try {
            // Fetch project details
            const project = await projectsService.getProjectById(projectId);

            // Fetch related data in parallel
            const [
                images,
                techStack,
                highlights,
                stories
            ] = await Promise.all([
                imagesService.fetchProjectImagesByProjectId(projectId),
                techStackService.fetchProjectTechStack(projectId),
                highlightsService.fetchProjectHighlights(projectId),
                storiesService.fetchProjectStories(projectId)
            ]);

            // Combine all results
            return {
                project,
                images: images.data,
                techStack,
                highlights: highlights.data,
                stories: stories.data
            };
        } catch (error) {
            console.error('Error fetching full project details:', error);
            throw error;
        }
    }
};

export default projectsService; 