import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

// Environment variable validation schema
const SupabaseConfigSchema = z.object({
    NEXT_PUBLIC_SUPABASE_URL: z.string().url('Invalid Supabase URL'),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, 'Supabase Anon Key is required')
});

// Validate Supabase configuration
const validateSupabaseConfig = () => {
    try {
        const config = SupabaseConfigSchema.parse({
            NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
            NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        });
        return config;
    } catch (error) {
        console.error('Supabase Configuration Error:', error.errors);
        throw new Error('Invalid Supabase configuration. Please check your environment variables.');
    }
};

// Validate and extract configuration
const { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY } = validateSupabaseConfig();

// Create a single Supabase client for interacting with your database
export const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    db: {
        schema: 'company_profile',
    },
    auth: {
        persistSession: true,
    },
    global: {
        headers: { 'x-app-name': 'kawasan-digital' },
    },
});

// Create a Supabase client specifically for authentication
export const supabaseAuth = createClient(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    auth: {
        persistSession: true,
    },
    global: {
        headers: { 'x-app-name': 'kawasan-digital-auth' },
    },
});

// Enhanced helper function for handling common Supabase operations
export const supabaseHelpers = {
    // Comprehensive error handler with logging and potential error tracking
    handleError: (error, context = {}) => {
        const errorLog = {
            message: error.message,
            name: error.name,
            ...context
        };

        console.error('Supabase Error:', JSON.stringify(errorLog, null, 2));

        // Potential integration with error tracking service
        // errorTrackingService.capture(errorLog);

        return null;
    },

    // Robust wrapper for safe data fetching with type checking and detailed error handling
    fetchData: async (query, options = {}) => {
        try {
            const { data, error } = await query;

            if (error) {
                return supabaseHelpers.handleError(error, {
                    operation: 'fetch',
                    ...options
                });
            }

            return data;
        } catch (error) {
            return supabaseHelpers.handleError(error, {
                operation: 'fetch',
                ...options
            });
        }
    },

    // Enhanced data insertion with validation and comprehensive error handling
    insertData: async (query, options = {}) => {
        try {
            const { data, error } = await query;

            if (error) {
                return supabaseHelpers.handleError(error, {
                    operation: 'insert',
                    ...options
                });
            }

            return data;
        } catch (error) {
            return supabaseHelpers.handleError(error, {
                operation: 'insert',
                ...options
            });
        }
    },

    // Enhanced data update with validation and comprehensive error handling
    updateData: async (query, options = {}) => {
        try {
            const { data, error } = await query;

            if (error) {
                return supabaseHelpers.handleError(error, {
                    operation: 'update',
                    ...options
                });
            }

            return data;
        } catch (error) {
            return supabaseHelpers.handleError(error, {
                operation: 'update',
                ...options
            });
        }
    },

    // Enhanced data deletion with validation and comprehensive error handling
    deleteData: async (query, options = {}) => {
        try {
            const { data, error } = await query;

            if (error) {
                return supabaseHelpers.handleError(error, {
                    operation: 'delete',
                    ...options
                });
            }

            return data;
        } catch (error) {
            return supabaseHelpers.handleError(error, {
                operation: 'delete',
                ...options
            });
        }
    },

    // Authentication-specific error handling
    handleAuthError: (error, context = {}) => {
        const authErrorLog = {
            message: error.message,
            name: error.name,
            ...context
        };

        console.error('Supabase Auth Error:', JSON.stringify(authErrorLog, null, 2));

        return null;
    },
};
