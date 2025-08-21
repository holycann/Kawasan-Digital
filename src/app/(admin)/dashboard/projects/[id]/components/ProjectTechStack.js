"use client";

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

export default function ProjectTechStack({ project }) {
    if (!project.tech_stack || project.tech_stack.length === 0) return null;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Tech Stack</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Technology</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Version</TableHead>
                            <TableHead>Role</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {project.tech_stack.map((tech, index) => (
                            <TableRow key={index}>
                                <TableCell>{tech.tech.tech_name}</TableCell>
                                <TableCell>{tech.tech.tech_category}</TableCell>
                                <TableCell>{tech.tech.tech_version}</TableCell>
                                <TableCell>{tech.tech.tech_role}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
} 