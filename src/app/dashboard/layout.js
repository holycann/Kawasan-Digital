"use client";

import React from "react";
import { DashboardSidebar } from "./components/sidebar";

export default function DashboardLayout({ children }) {
    return (
        <div className="flex h-screen w-full">
            <DashboardSidebar />
            <main className="flex-1 overflow-y-auto bg-neutral-50 dark:bg-neutral-900 p-6">
                {children}
            </main>
        </div>
    );
}
