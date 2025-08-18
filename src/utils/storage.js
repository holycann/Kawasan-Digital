import { supabaseStorage } from '@/configs/supabase';
import { supabaseHelpers } from '@/configs/supabase';

export const storageUtils = {
    // Upload file to Supabase storage
    uploadFile: async (file, bucket, path, options = {}) => {
        try {
            const { data, error } = await supabaseStorage
                .storage
                .from(bucket)
                .upload(path, file, {
                    cacheControl: '3600',
                    upsert: false,
                    ...options
                });

            if (error) {
                return supabaseHelpers.handleError(error, {
                    operation: 'file upload',
                    bucket,
                    path: path
                });
            }

            return data;
        } catch (error) {
            return supabaseHelpers.handleError(error, {
                operation: 'file upload',
                bucket,
                path
            });
        }
    },

    // Get public URL for a file in storage
    getPublicUrl: (bucket, path) => {
        try {
            const { data } = supabaseStorage
                .storage
                .from(bucket)
                .getPublicUrl(path);

            return data.publicUrl;
        } catch (error) {
            return supabaseHelpers.handleError(error, {
                operation: 'get public url',
                bucket,
                path
            });
        }
    },

    // Delete file from storage
    deleteFile: async (bucket, path) => {
        try {
            const { data, error } = await supabaseStorage
                .storage
                .from(bucket)
                .remove([path]);

            if (error) {
                return supabaseHelpers.handleError(error, {
                    operation: 'file delete',
                    bucket,
                    path
                });
            }

            return data;
        } catch (error) {
            return supabaseHelpers.handleError(error, {
                operation: 'file delete',
                bucket,
                path
            });
        }
    },

    // List files in a bucket
    listFiles: async (bucket, path = '', options = {}) => {
        try {
            const { data, error } = await supabaseStorage
                .storage
                .from(bucket)
                .list(path, {
                    limit: 100,
                    offset: 0,
                    sortBy: { column: 'name', order: 'asc' },
                    ...options
                });

            if (error) {
                return supabaseHelpers.handleError(error, {
                    operation: 'list files',
                    bucket,
                    path
                });
            }

            return data;
        } catch (error) {
            return supabaseHelpers.handleError(error, {
                operation: 'list files',
                bucket,
                path
            });
        }
    },

    // Download file from storage
    downloadFile: async (bucket, path) => {
        try {
            const { data, error } = await supabaseStorage
                .storage
                .from(bucket)
                .download(path);

            if (error) {
                return supabaseHelpers.handleError(error, {
                    operation: 'file download',
                    bucket,
                    path
                });
            }

            return data;
        } catch (error) {
            return supabaseHelpers.handleError(error, {
                operation: 'file download',
                bucket,
                path
            });
        }
    },

    // Move or rename a file
    moveFile: async (bucket, sourcePath, destinationPath) => {
        try {
            // First, copy the file
            const { data: copyData, error: copyError } = await supabaseStorage
                .storage
                .from(bucket)
                .copy(sourcePath, destinationPath);

            if (copyError) {
                return supabaseHelpers.handleError(copyError, {
                    operation: 'file move (copy)',
                    bucket,
                    path: sourcePath
                });
            }

            // Then, remove the original file
            const { data: deleteData, error: deleteError } = await supabaseStorage
                .storage
                .from(bucket)
                .remove([sourcePath]);

            if (deleteError) {
                return supabaseHelpers.handleError(deleteError, {
                    operation: 'file move (delete)',
                    bucket,
                    path: sourcePath
                });
            }

            return { copy: copyData, delete: deleteData };
        } catch (error) {
            return supabaseHelpers.handleError(error, {
                operation: 'file move',
                bucket,
                path: sourcePath
            });
        }
    },

    // Create a folder in storage
    createFolder: async (bucket, path) => {
        try {
            // In Supabase, creating a folder is done by uploading a placeholder file
            const placeholderFileName = `${path}/.keep`;
            const { data, error } = await supabaseStorage
                .storage
                .from(bucket)
                .upload(placeholderFileName, new Blob(), {
                    upsert: true
                });

            if (error) {
                return supabaseHelpers.handleError(error, {
                    operation: 'create folder',
                    bucket,
                    path
                });
            }

            return data;
        } catch (error) {
            return supabaseHelpers.handleError(error, {
                operation: 'create folder',
                bucket,
                path
            });
        }
    }
};