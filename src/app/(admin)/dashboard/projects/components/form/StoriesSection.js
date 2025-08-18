"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { IconPlus, IconTrash } from "@tabler/icons-react";

export const StoriesSection = ({
    projectData,
    addStory,
    updateStory,
    removeStory,
    setProjectData
}) => {
    const renderStorySection = (story, index) => {
        switch (story.story_section) {
            case 'whyWeBuilt':
                return (
                    <div className="space-y-4">
                        <div>
                            <Label>Description</Label>
                            <Textarea
                                value={story.content.whyWeBuilt.description}
                                onChange={(e) => updateStory(index, 'whyWeBuilt', 'description', e.target.value)}
                                placeholder="Describe why the project was built"
                                rows={3}
                            />
                        </div>
                        <div>
                            <Label>Client Need</Label>
                            <Input
                                value={story.content.whyWeBuilt.clientNeed}
                                onChange={(e) => updateStory(index, 'whyWeBuilt', 'clientNeed', e.target.value)}
                                placeholder="Primary client need"
                            />
                        </div>
                        <div>
                            <Label>Strategic Goals</Label>
                            <div className="space-y-2">
                                {story.content.whyWeBuilt.strategicGoals.map((goal, goalIndex) => (
                                    <div key={goalIndex} className="flex items-center space-x-2">
                                        <Input
                                            value={goal}
                                            onChange={(e) => {
                                                const updatedGoals = [...story.content.whyWeBuilt.strategicGoals];
                                                updatedGoals[goalIndex] = e.target.value;
                                                updateStory(index, 'whyWeBuilt', 'strategicGoals', updatedGoals);
                                            }}
                                            placeholder="Enter strategic goal"
                                            className="flex-grow"
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => {
                                                const updatedGoals = story.content.whyWeBuilt.strategicGoals
                                                    .filter((_, i) => i !== goalIndex);
                                                updateStory(index, 'whyWeBuilt', 'strategicGoals', updatedGoals);
                                            }}
                                        >
                                            <IconTrash size={16} />
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        const updatedGoals = [
                                            ...story.content.whyWeBuilt.strategicGoals,
                                            ''
                                        ];
                                        updateStory(index, 'whyWeBuilt', 'strategicGoals', updatedGoals);
                                    }}
                                >
                                    <IconPlus size={16} className="mr-2" /> Add Goal
                                </Button>
                            </div>
                        </div>
                    </div>
                );
            case 'problemsSolved':
                return (
                    <div className="space-y-4">
                        <div>
                            <Label>Problems</Label>
                            <div className="space-y-2">
                                {story.content.problemsSolved.problems.map((problem, problemIndex) => (
                                    <div key={problemIndex} className="flex items-center space-x-2">
                                        <Input
                                            value={problem}
                                            onChange={(e) => {
                                                const updatedProblems = [...story.content.problemsSolved.problems];
                                                updatedProblems[problemIndex] = e.target.value;
                                                updateStory(index, 'problemsSolved', 'problems', updatedProblems);
                                            }}
                                            placeholder="Enter problem"
                                            className="flex-grow"
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => {
                                                const updatedProblems = story.content.problemsSolved.problems
                                                    .filter((_, i) => i !== problemIndex);
                                                updateStory(index, 'problemsSolved', 'problems', updatedProblems);
                                            }}
                                        >
                                            <IconTrash size={16} />
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        const updatedProblems = [
                                            ...story.content.problemsSolved.problems,
                                            ''
                                        ];
                                        updateStory(index, 'problemsSolved', 'problems', updatedProblems);
                                    }}
                                >
                                    <IconPlus size={16} className="mr-2" /> Add Problem
                                </Button>
                            </div>
                        </div>
                        <div>
                            <Label>Challenge Complexity</Label>
                            <Input
                                value={story.content.problemsSolved.challengeComplexity}
                                onChange={(e) => updateStory(index, 'problemsSolved', 'challengeComplexity', e.target.value)}
                                placeholder="Describe challenge complexity"
                            />
                        </div>
                        <div>
                            <Label>Solution Innovation</Label>
                            <div className="space-y-2">
                                {story.content.problemsSolved.solutionInnovation.map((solution, solutionIndex) => (
                                    <div key={solutionIndex} className="flex items-center space-x-2">
                                        <Input
                                            value={solution}
                                            onChange={(e) => {
                                                const updatedSolutions = [...story.content.problemsSolved.solutionInnovation];
                                                updatedSolutions[solutionIndex] = e.target.value;
                                                updateStory(index, 'problemsSolved', 'solutionInnovation', updatedSolutions);
                                            }}
                                            placeholder="Enter solution innovation"
                                            className="flex-grow"
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => {
                                                const updatedSolutions = story.content.problemsSolved.solutionInnovation
                                                    .filter((_, i) => i !== solutionIndex);
                                                updateStory(index, 'problemsSolved', 'solutionInnovation', updatedSolutions);
                                            }}
                                        >
                                            <IconTrash size={16} />
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        const updatedSolutions = [
                                            ...story.content.problemsSolved.solutionInnovation,
                                            ''
                                        ];
                                        updateStory(index, 'problemsSolved', 'solutionInnovation', updatedSolutions);
                                    }}
                                >
                                    <IconPlus size={16} className="mr-2" /> Add Solution
                                </Button>
                            </div>
                        </div>
                    </div>
                );
            // Add other story section renderers here
            default:
                return <div>Select a story section</div>;
        }
    };

    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    Project Stories
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addStory}
                    >
                        <IconPlus size={16} className="mr-2" /> Add Story
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {projectData.stories.map((story, index) => (
                    <div key={index} className="space-y-4 mb-4 border-b pb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label>Story Section</Label>
                                <Select
                                    value={story.story_section}
                                    onValueChange={(value) => {
                                        const newStories = [...projectData.stories];
                                        newStories[index].story_section = value;
                                        // Reset content when changing section
                                        newStories[index].content = {
                                            whyWeBuilt: {
                                                description: '',
                                                clientNeed: '',
                                                strategicGoals: []
                                            },
                                            problemsSolved: {
                                                problems: [],
                                                challengeComplexity: '',
                                                solutionInnovation: []
                                            }
                                            // Add other sections as needed
                                        };
                                        // Update state
                                        setProjectData(prev => ({
                                            ...prev,
                                            stories: newStories
                                        }));
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select story section" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="whyWeBuilt">Why We Built</SelectItem>
                                        <SelectItem value="problemsSolved">Problems Solved</SelectItem>
                                        <SelectItem value="developmentProcess">Development Process</SelectItem>
                                        <SelectItem value="keyFeatures">Key Features</SelectItem>
                                        <SelectItem value="performanceResults">Performance Results</SelectItem>
                                        <SelectItem value="clientResults">Client Results</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Dynamic Story Content */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Story Content</h3>
                            {renderStorySection(story, index)}
                        </div>

                        <div className="flex justify-end">
                            <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => removeStory(index)}
                            >
                                <IconTrash size={16} className="mr-2" /> Remove Story
                            </Button>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}; 