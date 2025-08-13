import { supabase } from '@/configs/supabase';

/**
 * Base service providing common utility methods for database operations
 */
export const baseService = {
    /**
     * Create a generic fetch method with pagination and filtering
     * @param {string} table - The table to fetch from
     * @param {Object} options - Fetch options
     * @returns {Promise} Fetched data
     */
    fetchWithOptions: async (table, options = {}) => {
        const {
            filters = {},
            page = 1,
            pageSize = 10,
            orderBy = 'created_at',
            ascending = false,
            select = '*'
        } = options;

        try {
            let query = supabase
                .from(table)
                .select(select)
                .range((page - 1) * pageSize, page * pageSize - 1)
                .order(orderBy, { ascending });

            // Apply dynamic filters if provided
            Object.entries(filters).forEach(([key, value]) => {
                query = query.eq(key, value);
            });

            const { data, error } = await query;

            if (error) throw error;

            return {
                data,
                page,
                pageSize,
                total: data.length
            };
        } catch (error) {
            console.error(`Error fetching from ${table}:`, error);
            throw error;
        }
    },

    /**
     * Create a generic insert method
     * @param {string} table - The table to insert into
     * @param {Object|Array} data - Data to insert
     * @returns {Promise} Inserted data
     */
    create: async (table, data) => {
        try {
            const { data: insertedData, error } = await supabase
                .from(table)
                .insert(data)
                .select();

            if (error) throw error;

            return insertedData;
        } catch (error) {
            console.error(`Error creating in ${table}:`, error);
            throw error;
        }
    },

    /**
     * Create a generic update method
     * @param {string} table - The table to update
     * @param {string} id - The ID of the record to update
     * @param {Object} updateData - Data to update
     * @returns {Promise} Updated data
     */
    update: async (table, id, updateData) => {
        try {
            const { data, error } = await supabase
                .from(table)
                .update(updateData)
                .eq('id', id)
                .select();

            if (error) throw error;

            return data;
        } catch (error) {
            console.error(`Error updating in ${table}:`, error);
            throw error;
        }
    },

    /**
     * Create a generic delete method
     * @param {string} table - The table to delete from
     * @param {string} id - The ID of the record to delete
     * @returns {Promise} Deletion result
     */
    delete: async (table, id) => {
        try {
            console.log(`Attempting to delete record from ${table} with ID: ${id}`);
            const { error } = await supabase
                .from(table)
                .delete()
                .eq('id', id);

            if (error) {
                console.error(`Error deleting from ${table}:`, error);
                throw error;
            }

            console.log(`Successfully deleted record from ${table} with ID: ${id}`);
            return { success: true, id };
        } catch (error) {
            console.error(`Error deleting from ${table}:`, error);
            throw error;
        }
    },

    /**
     * Fetch a single record by ID
     * @param {string} table - The table to fetch from
     * @param {string} id - The ID of the record to fetch
     * @param {string} select - Optional select clause
     * @returns {Promise} Fetched record
     */
    getById: async (table, id, select = '*') => {
        try {
            const { data, error } = await supabase
                .from(table)
                .select(select)
                .eq('id', id)
                .single();

            if (error) throw error;

            return data;
        } catch (error) {
            console.error(`Error fetching by ID from ${table}:`, error);
            throw error;
        }
    }
};

export default baseService; 