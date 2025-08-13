"use client";

import * as React from "react";
import { cn } from "@/utils/cn";

export const Table = React.forwardRef(
    ({ className, ...props }, ref) => (
        <div className="w-full overflow-auto">
            <table
                ref={ref}
                className={cn(
                    "w-full caption-bottom text-sm",
                    className
                )}
                {...props}
            />
        </div>
    )
);
Table.displayName = "Table";

export const TableHeader = React.forwardRef(
    ({ className, ...props }, ref) => (
        <thead
            ref={ref}
            className={cn(
                "[&_tr]:border-b border-neutral-200 dark:border-neutral-800",
                className
            )}
            {...props}
        />
    )
);
TableHeader.displayName = "TableHeader";

export const TableBody = React.forwardRef(
    ({ className, ...props }, ref) => (
        <tbody
            ref={ref}
            className={cn(
                "[&_tr:last-child]:border-0",
                className
            )}
            {...props}
        />
    )
);
TableBody.displayName = "TableBody";

export const TableFooter = React.forwardRef(
    ({ className, ...props }, ref) => (
        <tfoot
            ref={ref}
            className={cn(
                "bg-neutral-900 font-medium text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900",
                className
            )}
            {...props}
        />
    )
);
TableFooter.displayName = "TableFooter";

export const TableRow = React.forwardRef(
    ({ className, ...props }, ref) => (
        <tr
            ref={ref}
            className={cn(
                "border-b transition-colors hover:bg-neutral-100 data-[state=selected]:bg-neutral-100 dark:hover:bg-neutral-800 dark:data-[state=selected]:bg-neutral-800 border-neutral-200 dark:border-neutral-800",
                className
            )}
            {...props}
        />
    )
);
TableRow.displayName = "TableRow";

export const TableHead = React.forwardRef(
    ({ className, ...props }, ref) => (
        <th
            ref={ref}
            className={cn(
                "h-12 px-4 text-left align-middle font-medium text-neutral-500 dark:text-neutral-400 [&:has([role=checkbox])]:pr-0",
                className
            )}
            {...props}
        />
    )
);
TableHead.displayName = "TableHead";

export const TableCell = React.forwardRef(
    ({ className, ...props }, ref) => (
        <td
            ref={ref}
            className={cn(
                "p-4 align-middle [&:has([role=checkbox])]:pr-0",
                className
            )}
            {...props}
        />
    )
);
TableCell.displayName = "TableCell"; 