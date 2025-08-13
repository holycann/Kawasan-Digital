"use client";

import React from "react";
import { redirect } from 'next/navigation';
import { DashboardSidebar } from "./components/sidebar";
import { Toast } from "@/components/ui/toast";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardLayout({ children }) {
    const { isAuthenticated, isLoading } = useAuth();

    if (!isAuthenticated && !isLoading) {
        redirect('/login');
    }

    return (
        <div className="flex h-screen w-full">
            <DashboardSidebar />
            <main className="flex-1 overflow-y-auto bg-neutral-50 dark:bg-neutral-900 p-6">
                {children}
            </main>
            <Toast />
        </div>
    );
}
