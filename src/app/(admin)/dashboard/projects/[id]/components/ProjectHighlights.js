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

export default function ProjectHighlights({ project }) {
    if (!project.highlights || project.highlights.length === 0) return null;

    console.log("PROJECT HIGHLIGHTS:", project.highlights)

    return (
        <Card>
            <CardHeader>
                <CardTitle>Project Highlights</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {project.highlights.map((highlight, index) => (
                            <TableRow key={index}>
                                <TableCell>{highlight}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
} 