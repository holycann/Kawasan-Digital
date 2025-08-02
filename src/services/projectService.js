import { supabase, supabaseHelpers } from '@/configs/supabase';

// Portfolio service with comprehensive data management for portfolio-related operations
export const portfolioService = {
    // Fetch all portfolio entries with optional filtering and pagination
    fetchPortfolios: async (options = {}) => {
        const {
            filters = {},
            page = 1,
            pageSize = 10,
            orderBy = 'created_at',
            ascending = false
        } = options;

        try {
            let query = supabase
                .from('portfolios')
                .select('*')
                .range((page - 1) * pageSize, page * pageSize - 1)
                .order(orderBy, { ascending });

            // Apply dynamic filters if provided
            Object.entries(filters).forEach(([key, value]) => {
                query = query.eq(key, value);
            });

            return await supabaseHelpers.fetchData(query, {
                operation: 'fetch portfolios',
                filters,
                page
            });
        } catch (error) {
            return supabaseHelpers.handleError(error, {
                operation: 'fetch portfolios'
            });
        }
    },

    // Create a new portfolio entry
    createPortfolio: async (portfolioData) => {
        try {
            const query = supabase
                .from('portfolios')
                .insert(portfolioData)
                .select();

            return await supabaseHelpers.insertData(query, {
                operation: 'create portfolio'
            });
        } catch (error) {
            return supabaseHelpers.handleError(error, {
                operation: 'create portfolio'
            });
        }
    },

    // Update an existing portfolio entry
    updatePortfolio: async (portfolioId, updateData) => {
        try {
            const query = supabase
                .from('portfolios')
                .update(updateData)
                .eq('id', portfolioId)
                .select();

            return await supabaseHelpers.updateData(query, {
                operation: 'update portfolio',
                portfolioId
            });
        } catch (error) {
            return supabaseHelpers.handleError(error, {
                operation: 'update portfolio',
                portfolioId
            });
        }
    },

    // Delete a portfolio entry
    deletePortfolio: async (portfolioId) => {
        try {
            const query = supabase
                .from('portfolios')
                .delete()
                .eq('id', portfolioId);

            return await supabaseHelpers.deleteData(query, {
                operation: 'delete portfolio',
                portfolioId
            });
        } catch (error) {
            return supabaseHelpers.handleError(error, {
                operation: 'delete portfolio',
                portfolioId
            });
        }
    },

    // Get a single portfolio entry by ID
    getPortfolioById: async (portfolioId) => {
        try {
            const query = supabase
                .from('portfolios')
                .select('*')
                .eq('id', portfolioId)
                .single();

            return await supabaseHelpers.fetchData(query, {
                operation: 'fetch portfolio by ID',
                portfolioId
            });
        } catch (error) {
            return supabaseHelpers.handleError(error, {
                operation: 'fetch portfolio by ID',
                portfolioId
            });
        }
    }
};
