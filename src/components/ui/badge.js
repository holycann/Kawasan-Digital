"use client";

import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";

const badgeVariants = cva(
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default: "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50",
                primary: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
                secondary: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
                destructive: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
                success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
                warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
                info: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
            },
            size: {
                sm: "text-xs px-2 py-0.5",
                md: "text-sm px-2.5 py-1",
                lg: "text-base px-3 py-1.5",
            }
        },
        defaultVariants: {
            variant: "default",
            size: "sm"
        }
    }
);

export const Badge = ({ 
    className, 
    variant = "default", 
    size = "sm", 
    children, 
    ...props 
}) => {
    return (
        <div 
            className={cn(badgeVariants({ variant, size, className }))} 
            {...props}
        >
            {children}
        </div>
    );
}; 