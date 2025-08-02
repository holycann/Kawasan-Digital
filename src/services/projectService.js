import { supabase, supabaseHelpers } from '@/configs/supabase';

// Project service with comprehensive data management for project-related operations
export const projectService = {
    // Fetch all project entries with optional filtering and pagination
    fetchProjects: async (options = {}) => {
        const {
            filters = {},
            page = 1,
            pageSize = 10,
            orderBy = 'created_at',
            ascending = false
        } = options;

        try {
            let query = supabase
                .from('projects')
                .select('*')
                .range((page - 1) * pageSize, page * pageSize - 1)
                .order(orderBy, { ascending });

            // Apply dynamic filters if provided
            Object.entries(filters).forEach(([key, value]) => {
                query = query.eq(key, value);
            });

            return await supabaseHelpers.fetchData(query, {
                operation: 'fetch projects',
                filters,
                page
            });
        } catch (error) {
            return supabaseHelpers.handleError(error, {
                operation: 'fetch projects'
            });
        }
    },

    // Create a new project entry
    createProject: async (projectData) => {
        try {
            const query = supabase
                .from('projects')
                .insert(projectData)
                .select();

            return await supabaseHelpers.insertData(query, {
                operation: 'create project'
            });
        } catch (error) {
            return supabaseHelpers.handleError(error, {
                operation: 'create project'
            });
        }
    },

    // Update an existing project entry
    updateProject: async (projectId, updateData) => {
        try {
            const query = supabase
                .from('projects')
                .update(updateData)
                .eq('id', projectId)
                .select();

            return await supabaseHelpers.updateData(query, {
                operation: 'update project',
                projectId
            });
        } catch (error) {
            return supabaseHelpers.handleError(error, {
                operation: 'update project',
                projectId
            });
        }
    },

    // Delete a project entry
    deleteProject: async (projectId) => {
        try {
            const query = supabase
                .from('projects')
                .delete()
                .eq('id', projectId);

            return await supabaseHelpers.deleteData(query, {
                operation: 'delete project',
                projectId
            });
        } catch (error) {
            return supabaseHelpers.handleError(error, {
                operation: 'delete project',
                projectId
            });
        }
    },

    // Get a single project entry by ID
    getProjectById: async (projectId) => {
        try {
            const query = supabase
                .from('projects')
                .select('*')
                .eq('id', projectId)
                .single();

            return await supabaseHelpers.fetchData(query, {
                operation: 'fetch project by ID',
                projectId
            });
        } catch (error) {
            return supabaseHelpers.handleError(error, {
                operation: 'fetch project by ID',
                projectId
            });
        }
    }
};
