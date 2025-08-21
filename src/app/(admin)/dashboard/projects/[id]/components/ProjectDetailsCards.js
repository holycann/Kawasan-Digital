"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    IconCategory,
    IconCalendar,
    IconBriefcase,
} from "@tabler/icons-react";

export default function ProjectDetailsCards({ project }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                        Category
                    </CardTitle>
                    <IconCategory className="h-4 w-4 text-neutral-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {project.category.name}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                        Year
                    </CardTitle>
                    <IconCalendar className="h-4 w-4 text-neutral-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {project.year}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                        Client
                    </CardTitle>
                    <IconBriefcase className="h-4 w-4 text-neutral-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {project.client.name}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 