"use client";

import React from 'react';
import { 
    IconChevronLeft, 
    IconChevronRight 
} from "@tabler/icons-react";
import { Button } from "./button";
import { cn } from "@/utils/cn";

export const Pagination = ({ 
    currentPage, 
    totalPages, 
    onPageChange, 
    className 
}) => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    // Generate page numbers
    const generatePageNumbers = () => {
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
    };

    generatePageNumbers();

    return (
        <div className={cn("flex items-center justify-between space-x-2", className)}>
            <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <IconChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center space-x-1">
                {pageNumbers.map(number => (
                    <Button
                        key={number}
                        variant={currentPage === number ? "default" : "outline"}
                        size="sm"
                        onClick={() => onPageChange(number)}
                    >
                        {number}
                    </Button>
                ))}
            </div>

            <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <IconChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}; 