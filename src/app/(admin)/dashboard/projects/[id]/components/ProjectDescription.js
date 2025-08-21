"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

export default function ProjectDescription({ project }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Project Description</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-neutral-700 dark:text-neutral-300">
                    {project.description || 'No description available'}
                </p>
            </CardContent>
        </Card>
    );
} 