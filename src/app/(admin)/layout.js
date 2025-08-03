"use client";

import AuthProvider from "@/providers/AuthProvider";

export default function AdminLayout({ children }) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}