import baseService from '../baseService';

const PROJECT_CATEGORIES_TABLE = 'project_categories';

/**
 * Categories service for managing project category-related operations
 */
export const categoriesService = {
    /**
     * Fetch project categories
     * @param {Object} options - Optional fetch options
     * @returns {Promise} Fetched project categories
     */
    fetchCategories: async (options = {}) => {
        return baseService.fetchWithOptions(PROJECT_CATEGORIES_TABLE, {
            ...options,
            orderBy: options.orderBy || 'name',
            ascending: options.ascending ?? true
        });
    },

    /**
     * Create a new project category
     * @param {Object} categoryData - Category details to create
     * @returns {Promise} Created category
     */
    createCategory: async (categoryData) => {
        return baseService.create(PROJECT_CATEGORIES_TABLE, categoryData);
    },

    /**
     * Update an existing project category
     * @param {string} categoryId - ID of the category to update
     * @param {Object} updateData - Data to update
     * @returns {Promise} Updated category
     */
    updateCategory: async (categoryId, updateData) => {
        return baseService.update(PROJECT_CATEGORIES_TABLE, categoryId, updateData);
    },

    /**
     * Delete a project category
     * @param {string} categoryId - ID of the category to delete
     * @returns {Promise} Deletion result
     */
    deleteCategory: async (categoryId) => {
        return baseService.delete(PROJECT_CATEGORIES_TABLE, categoryId);
    },

    /**
     * Get a single category by ID
     * @param {string} categoryId - ID of the category
     * @returns {Promise} Category details
     */
    getCategoryById: async (categoryId) => {
        return baseService.getById(PROJECT_CATEGORIES_TABLE, categoryId);
    },

    /**
     * Fetch categories with associated project count
     * @param {Object} options - Optional fetch options
     * @returns {Promise} Categories with project count
     */
    fetchCategoriesWithProjectCount: async (options = {}) => {
        try {
            const { data, error } = await baseService.fetchWithOptions(PROJECT_CATEGORIES_TABLE, {
                select: `
                    *,
                    projects:company_profile.projects(count)
                `,
                ...options
            });

            if (error) throw error;

            // Transform the result to add project count
            const categoriesWithCount = data.data.map(category => ({
                ...category,
                project_count: category.projects[0]?.count || 0
            }));

            return {
                data: categoriesWithCount,
                page: data.page,
                pageSize: data.pageSize,
                total: data.total
            };
        } catch (error) {
            console.error('Error fetching categories with project count:', error);
            throw error;
        }
    },

    /**
     * Bulk create project categories
     * @param {Array} categoriesData - Array of category details to create
     * @returns {Promise} Created categories
     */
    bulkCreateCategories: async (categoriesData) => {
        return baseService.create(PROJECT_CATEGORIES_TABLE, categoriesData);
    }
};

export default categoriesService; 