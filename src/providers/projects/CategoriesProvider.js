import React, { useState, useCallback } from 'react';
import { ProjectCategoriesContext } from '@/contexts/ProjectContext';
import { categoriesService } from '@/services/projects';

// Provider component
export const ProjectCategoriesProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [categoriesWithCount, setCategoriesWithCount] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch categories
    const fetchCategories = useCallback(async (options = {}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await categoriesService.fetchCategories(options);
            setCategories(response.data);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch categories with project count
    const fetchCategoriesWithCount = useCallback(async (options = {}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await categoriesService.fetchCategoriesWithProjectCount(options);
            setCategoriesWithCount(response);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Create a new category
    const createCategory = useCallback(async (categoryData) => {
        setLoading(true);
        setError(null);
        try {
            const newCategory = await categoriesService.createCategory(categoryData);
            // Optionally update local state
            setCategories(prev => [...prev, newCategory[0]]);
            return newCategory[0];
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Update an existing category
    const updateCategory = useCallback(async (categoryId, updateData) => {
        setLoading(true);
        setError(null);
        try {
            const updatedCategory = await categoriesService.updateCategory(categoryId, updateData);
            // Update local state
            setCategories(prev =>
                prev.map(category =>
                    category.id === categoryId ? updatedCategory[0] : category
                )
            );
            return updatedCategory[0];
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Delete a category
    const deleteCategory = useCallback(async (categoryId) => {
        setLoading(true);
        setError(null);
        try {
            await categoriesService.deleteCategory(categoryId);
            // Remove from local state
            setCategories(prev => prev.filter(category => category.id !== categoryId));
            return { success: true, categoryId };
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Provide context value
    const contextValue = {
        categories,
        categoriesWithCount,
        loading,
        error,
        fetchCategories,
        fetchCategoriesWithCount,
        createCategory,
        updateCategory,
        deleteCategory
    };

    return (
        <ProjectCategoriesContext.Provider value={contextValue}>
            {children}
        </ProjectCategoriesContext.Provider>
    );
};

export default ProjectCategoriesProvider; 