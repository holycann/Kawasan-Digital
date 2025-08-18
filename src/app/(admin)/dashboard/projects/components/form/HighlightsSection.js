"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconPlus, IconTrash } from "@tabler/icons-react";

export const HighlightsSection = ({
    projectData,
    addHighlight,
    updateHighlight,
    removeHighlight
}) => {
    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    Project Highlights
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addHighlight}
                    >
                        <IconPlus size={16} className="mr-2" /> Add Highlight
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {projectData.highlights.map((highlight, index) => (
                    <div key={index} className="space-y-4 mb-4 border-b pb-4">
                        <div>
                            <Label>Highlight Text</Label>
                            <Input
                                value={highlight}
                                onChange={(e) => updateHighlight(index, e.target.value)}
                                placeholder="Highlight text"
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => removeHighlight(index)}
                            >
                                <IconTrash size={16} className="mr-2" /> Remove Highlight
                            </Button>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}; 