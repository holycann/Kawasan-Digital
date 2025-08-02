"use client";

import { Toaster } from "sonner";

export const Toast = () => {
    return (
        <Toaster 
            position="top-right" 
            richColors 
            closeButton 
            expand={false}
            duration={3000}
        />
    );
}; 