"use client";

import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";

export default function ProjectStories({ project }) {
    if (!project.stories || project.stories.length === 0 || !project.stories[0].content) return null;

    const formatSectionName = (section) => {
        switch (section) {
            case 'whyWeBuilt': return 'Why We Built';
            case 'problemsSolved': return 'Problems Solved';
            case 'developmentProcess': return 'Development Process';
            case 'keyFeatures': return 'Key Features';
            case 'performanceResults': return 'Performance Results';
            case 'clientResults': return 'Client Results';
            default: return section;
        }
    };

    const renderValue = (value) => {
        if (Array.isArray(value)) {
            return (
                <ul className="list-disc list-inside text-xs">
                    {value.map((item, idx) => (
                        <li key={idx}>
                            {typeof item === 'object' ? JSON.stringify(item) : item}
                        </li>
                    ))}
                </ul>
            );
        } else if (typeof value === 'object') {
            return (
                <div className="text-xs">
                    {Object.entries(value).map(([subKey, subValue]) => (
                        <div key={subKey} className="ml-2">
                            <span className="capitalize">{subKey}: </span>
                            {renderValue(subValue)}
                        </div>
                    ))}
                </div>
            );
        }
        return <span className="text-xs">{value}</span>;
    };

    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>Project Stories</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-1/4">Story Section</TableHead>
                            <TableHead className="w-3/4">Story Content</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Object.entries(project.stories[0].content).map(([section, sectionData], index) => (
                            section !== 'id' && section !== 'project_id' && section !== 'created_at' && (
                                <TableRow key={index}>
                                    <TableCell className="font-bold">
                                        {formatSectionName(section)}
                                    </TableCell>
                                    <TableCell>
                                        {Object.entries(sectionData).map(([key, value]) => (
                                            <div key={key} className="mb-2">
                                                <span className="capitalize font-semibold text-sm">{key}: </span>
                                                {renderValue(value)}
                                            </div>
                                        ))}
                                    </TableCell>
                                </TableRow>
                            )
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
} 