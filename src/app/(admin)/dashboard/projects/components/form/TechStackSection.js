"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { IconPlus, IconTrash } from "@tabler/icons-react";

export const TechStackSection = ({
    projectData,
    techStacks,
    addTechStack,
    updateTechStack,
    removeTechStack
}) => {
    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    Tech Stack
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addTechStack}
                    >
                        <IconPlus size={16} className="mr-2" /> Add Tech Stack
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {projectData.tech_stack.map((tech, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                            <Label>Technology</Label>
                            <Select
                                value={tech.tech_id}
                                onValueChange={(value) => updateTechStack(index, 'tech_id', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select technology" />
                                </SelectTrigger>
                                <SelectContent>
                                    {techStacks.map(stack => (
                                        <SelectItem
                                            key={stack.id}
                                            value={stack.id}
                                        >
                                            {stack.tech_name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-end">
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                onClick={() => removeTechStack(index)}
                            >
                                <IconTrash size={16} />
                            </Button>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}; 