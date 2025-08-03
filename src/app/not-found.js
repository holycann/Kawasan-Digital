"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 p-4">
            <div className="text-center space-y-6 max-w-md">
                <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                    404
                </h1>
                <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">
                    Page Not Found
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                    Oops! The page you are looking for does not exist or you do not have permission to access it.
                </p>
                <div className="flex justify-center space-x-4">
                    <Link href="/">
                        <Button variant="outline" className="px-6">
                            Go Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
} 