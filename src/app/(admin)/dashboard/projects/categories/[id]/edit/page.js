"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { CategoryForm } from '../../components/CategoryForm';
import { ProjectHooks } from '@/providers/projects';

export default function EditCategoryPage() {
    const params = useParams();
    const categoryId = params.id;

    const { useProjectCategories } = ProjectHooks;
    const { categories, fetchCategories } = useProjectCategories();

    const [initialData, setInitialData] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        const category = categories.find(cat => cat.id === categoryId);
        if (category) {
            setInitialData({
                name: category.name || '',
                description: category.description || '',
                company_name: category.company_name || 'Kawasan Digital',
                industry: category.industry || ''
            });
        }
    }, [categories, categoryId]);

    if (!initialData) {
        return <div>Loading...</div>;
    }

    return <CategoryForm 
        initialData={initialData} 
        mode="edit" 
        categoryId={categoryId} 
    />;
}
