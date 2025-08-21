"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { IconLink } from "@tabler/icons-react";

export default function ProjectWebsite({ project }) {
    if (!project.website_url) return null;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Project Website</CardTitle>
            </CardHeader>
            <CardContent>
                <a
                    href={project.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-500 hover:underline"
                >
                    <IconLink size={18} />
                    {project.website_url}
                </a>
            </CardContent>
        </Card>
    );
} 