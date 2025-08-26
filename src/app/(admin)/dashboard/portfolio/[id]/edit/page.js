"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import PortfolioForm from '../../components/PortfolioForm';
import { usePortfolio } from '@/hooks/usePortfolio';

export default function EditPortfolioPage() {
    const { id } = useParams();
    const { getPortfolioById } = usePortfolio();
    const [portfolio, setPortfolio] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const data = await getPortfolioById(id);
                setPortfolio(data);
            } catch (error) {
                console.error('Error fetching portfolio:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPortfolio();
        }
    }, [id, getPortfolioById]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white dark:bg-black">
                <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            </div>
        );
    }

    if (!portfolio) {
        return (
            <div className="text-center p-8">
                <h1 className="text-2xl font-bold text-red-600">Portfolio not found</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    The portfolio item you're looking for doesn't exist.
                </p>
            </div>
        );
    }

    return <PortfolioForm portfolio={portfolio} mode="edit" />;
}
