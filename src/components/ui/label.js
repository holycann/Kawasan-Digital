"use client";

import * as React from "react";
import { cn } from "@/utils/cn";

export const Label = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2",
          className
        )}
        {...props}
      />
    );
  }
);
Label.displayName = "Label"; 