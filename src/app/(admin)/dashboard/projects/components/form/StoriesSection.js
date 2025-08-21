"use client";

import React, { useCallback } from 'react';
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
    updateStory,
    setProjectData
}) => {
    // Ensure stories array exists and has at least one item
    const ensureStoriesInitialized = useCallback(() => {
        if (!projectData.stories || projectData.stories.length === 0) {
            setProjectData(prev => ({
                ...prev,
                stories: [{
                    story_section: null,
                    content: {
                        whyWeBuilt: {
                            description: '',
                            clientNeed: '',
                            strategicGoals: []
                        },
                        problemsSolved: {
                            problems: [],
                            challengeComplexity: '',
                            solutionInnovation: []
                        },
                        developmentProcess: {
                            planning: [],
                            processApproach: []
                        },
                        keyFeatures: {
                            features: []
                        },
                        performanceResults: {
                            performanceScore: '',
                            loadTime: '',
                            performanceMetrics: []
                        },
                        clientResults: {
                            businessImpact: [],
                            userExperience: []
                        }
                    }
                }]
            }));
        }
    }, [setProjectData]);

    // Callback to handle story section change
    const handleStorySectionChange = useCallback((value) => {
        setProjectData(prev => {
            // Ensure stories are initialized
            const stories = prev.stories && prev.stories.length > 0
                ? [...prev.stories]
                : [{
                    story_section: null,
                    content: {
                        whyWeBuilt: {
                            description: '',
                            clientNeed: '',
                            strategicGoals: []
                        },
                        problemsSolved: {
                            problems: [],
                            challengeComplexity: '',
                            solutionInnovation: []
                        },
                        developmentProcess: {
                            planning: [],
                            processApproach: []
                        },
                        keyFeatures: {
                            features: []
                        },
                        performanceResults: {
                            performanceScore: '',
                            loadTime: '',
                            performanceMetrics: []
                        },
                        clientResults: {
                            businessImpact: [],
                            userExperience: []
                        }
                    }
                }];

            // Update the story section while preserving existing content
            const currentContent = stories[0].content;
            stories[0].story_section = value;

            // Ensure the new section exists in the content
            if (!currentContent[value]) {
                switch (value) {
                    case 'whyWeBuilt':
                        currentContent[value] = {
                            description: '',
                            clientNeed: '',
                            strategicGoals: []
                        };
                        break;
                    case 'problemsSolved':
                        currentContent[value] = {
                            problems: [],
                            challengeComplexity: '',
                            solutionInnovation: []
                        };
                        break;
                    case 'developmentProcess':
                        currentContent[value] = {
                            planning: [],
                            processApproach: []
                        };
                        break;
                    case 'keyFeatures':
                        currentContent[value] = {
                            features: []
                        };
                        break;
                    case 'performanceResults':
                        currentContent[value] = {
                            performanceScore: '',
                            loadTime: '',
                            performanceMetrics: []
                        };
                        break;
                    case 'clientResults':
                        currentContent[value] = {
                            businessImpact: [],
                            userExperience: []
                        };
                        break;
                }
            }

            return { ...prev, stories };
        });
    }, [setProjectData]);

    // Ensure stories are initialized on first render
    React.useEffect(() => {
        ensureStoriesInitialized();
    }, [ensureStoriesInitialized]);

    // If no stories exist, return null or loading state
    if (!projectData.stories || projectData.stories.length === 0) {
        return null;
    }

    const story = projectData.stories[0];

    const renderStorySection = (sectionKey) => {
        switch (sectionKey) {
            case 'whyWeBuilt':
                return (
                    <div className="space-y-4">
                        <div>
                            <Label>Description</Label>
                            <Textarea
                                value={story.content.whyWeBuilt.description}
                                onChange={(e) => updateStory(0, 'whyWeBuilt', 'description', e.target.value)}
                                placeholder="Describe why the project was built"
                                rows={3}
                            />
                        </div>
                        <div>
                            <Label>Client Need</Label>
                            <Input
                                value={story.content.whyWeBuilt.clientNeed}
                                onChange={(e) => updateStory(0, 'whyWeBuilt', 'clientNeed', e.target.value)}
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
                                                updateStory(0, 'whyWeBuilt', 'strategicGoals', updatedGoals);
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
                                                updateStory(0, 'whyWeBuilt', 'strategicGoals', updatedGoals);
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
                                        updateStory(0, 'whyWeBuilt', 'strategicGoals', updatedGoals);
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
                                                updateStory(0, 'problemsSolved', 'problems', updatedProblems);
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
                                                updateStory(0, 'problemsSolved', 'problems', updatedProblems);
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
                                        updateStory(0, 'problemsSolved', 'problems', updatedProblems);
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
                                onChange={(e) => updateStory(0, 'problemsSolved', 'challengeComplexity', e.target.value)}
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
                                                updateStory(0, 'problemsSolved', 'solutionInnovation', updatedSolutions);
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
                                                updateStory(0, 'problemsSolved', 'solutionInnovation', updatedSolutions);
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
                                        updateStory(0, 'problemsSolved', 'solutionInnovation', updatedSolutions);
                                    }}
                                >
                                    <IconPlus size={16} className="mr-2" /> Add Solution
                                </Button>
                            </div>
                        </div>
                    </div>
                );
            case 'developmentProcess':
                return (
                    <div className="space-y-4">
                        <div>
                            <Label>Planning</Label>
                            <div className="space-y-2">
                                {story.content.developmentProcess.planning.map((plan, planIndex) => (
                                    <div key={planIndex} className="flex items-center space-x-2">
                                        <Input
                                            value={plan}
                                            onChange={(e) => {
                                                const updatedPlanning = [...story.content.developmentProcess.planning];
                                                updatedPlanning[planIndex] = e.target.value;
                                                updateStory(0, 'developmentProcess', 'planning', updatedPlanning);
                                            }}
                                            placeholder="Enter planning step"
                                            className="flex-grow"
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => {
                                                const updatedPlanning = story.content.developmentProcess.planning
                                                    .filter((_, i) => i !== planIndex);
                                                updateStory(0, 'developmentProcess', 'planning', updatedPlanning);
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
                                        const updatedPlanning = [
                                            ...story.content.developmentProcess.planning,
                                            ''
                                        ];
                                        updateStory(0, 'developmentProcess', 'planning', updatedPlanning);
                                    }}
                                >
                                    <IconPlus size={16} className="mr-2" /> Add Planning Step
                                </Button>
                            </div>
                        </div>
                        <div>
                            <Label>Process Approach</Label>
                            <div className="space-y-2">
                                {story.content.developmentProcess.processApproach.map((approach, approachIndex) => (
                                    <div key={approachIndex} className="flex items-center space-x-2">
                                        <Input
                                            value={approach}
                                            onChange={(e) => {
                                                const updatedApproaches = [...story.content.developmentProcess.processApproach];
                                                updatedApproaches[approachIndex] = e.target.value;
                                                updateStory(0, 'developmentProcess', 'processApproach', updatedApproaches);
                                            }}
                                            placeholder="Enter process approach"
                                            className="flex-grow"
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => {
                                                const updatedApproaches = story.content.developmentProcess.processApproach
                                                    .filter((_, i) => i !== approachIndex);
                                                updateStory(0, 'developmentProcess', 'processApproach', updatedApproaches);
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
                                        const updatedApproaches = [
                                            ...story.content.developmentProcess.processApproach,
                                            ''
                                        ];
                                        updateStory(0, 'developmentProcess', 'processApproach', updatedApproaches);
                                    }}
                                >
                                    <IconPlus size={16} className="mr-2" /> Add Process Approach
                                </Button>
                            </div>
                        </div>
                    </div>
                );
            case 'keyFeatures':
                return (
                    <div className="space-y-4">
                        <div>
                            <Label>Features</Label>
                            <div className="space-y-2">
                                {story.content.keyFeatures.features.map((feature, featureIndex) => (
                                    <div key={featureIndex} className="space-y-2 border p-2 rounded">
                                        <div className="flex items-center space-x-2">
                                            <Label>Title</Label>
                                            <Input
                                                value={feature.title}
                                                onChange={(e) => {
                                                    const updatedFeatures = [...story.content.keyFeatures.features];
                                                    updatedFeatures[featureIndex].title = e.target.value;
                                                    updateStory(0, 'keyFeatures', 'features', updatedFeatures);
                                                }}
                                                placeholder="Enter feature title"
                                                className="flex-grow"
                                            />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => {
                                                    const updatedFeatures = story.content.keyFeatures.features
                                                        .filter((_, i) => i !== featureIndex);
                                                    updateStory(0, 'keyFeatures', 'features', updatedFeatures);
                                                }}
                                            >
                                                <IconTrash size={16} />
                                            </Button>
                                        </div>
                                        <div>
                                            <Label>Description</Label>
                                            <Textarea
                                                value={feature.description}
                                                onChange={(e) => {
                                                    const updatedFeatures = [...story.content.keyFeatures.features];
                                                    updatedFeatures[featureIndex].description = e.target.value;
                                                    updateStory(0, 'keyFeatures', 'features', updatedFeatures);
                                                }}
                                                placeholder="Enter feature description"
                                                rows={2}
                                            />
                                        </div>
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        const updatedFeatures = [
                                            ...story.content.keyFeatures.features,
                                            { title: '', description: '' }
                                        ];
                                        updateStory(0, 'keyFeatures', 'features', updatedFeatures);
                                    }}
                                >
                                    <IconPlus size={16} className="mr-2" /> Add Feature
                                </Button>
                            </div>
                        </div>
                    </div>
                );
            case 'performanceResults':
                return (
                    <div className="space-y-4">
                        <div>
                            <Label>Performance Score</Label>
                            <Input
                                type="number"
                                value={story.content.performanceResults.performanceScore}
                                onChange={(e) => updateStory(0, 'performanceResults', 'performanceScore', e.target.value)}
                                placeholder="Enter performance score"
                            />
                        </div>
                        <div>
                            <Label>Load Time</Label>
                            <Input
                                value={story.content.performanceResults.loadTime}
                                onChange={(e) => updateStory(0, 'performanceResults', 'loadTime', e.target.value)}
                                placeholder="Enter load time"
                            />
                        </div>
                        <div>
                            <Label>Performance Metrics</Label>
                            <div className="space-y-2">
                                {story.content.performanceResults.performanceMetrics.map((metric, metricIndex) => (
                                    <div key={metricIndex} className="flex items-center space-x-2">
                                        <Input
                                            value={metric}
                                            onChange={(e) => {
                                                const updatedMetrics = [...story.content.performanceResults.performanceMetrics];
                                                updatedMetrics[metricIndex] = e.target.value;
                                                updateStory(0, 'performanceResults', 'performanceMetrics', updatedMetrics);
                                            }}
                                            placeholder="Enter performance metric"
                                            className="flex-grow"
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => {
                                                const updatedMetrics = story.content.performanceResults.performanceMetrics
                                                    .filter((_, i) => i !== metricIndex);
                                                updateStory(0, 'performanceResults', 'performanceMetrics', updatedMetrics);
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
                                        const updatedMetrics = [
                                            ...story.content.performanceResults.performanceMetrics,
                                            ''
                                        ];
                                        updateStory(0, 'performanceResults', 'performanceMetrics', updatedMetrics);
                                    }}
                                >
                                    <IconPlus size={16} className="mr-2" /> Add Metric
                                </Button>
                            </div>
                        </div>
                    </div>
                );
            case 'clientResults':
                return (
                    <div className="space-y-4">
                        <div>
                            <Label>Business Impact</Label>
                            <div className="space-y-2">
                                {story.content.clientResults.businessImpact.map((impact, impactIndex) => (
                                    <div key={impactIndex} className="flex items-center space-x-2">
                                        <Input
                                            value={impact}
                                            onChange={(e) => {
                                                const updatedImpacts = [...story.content.clientResults.businessImpact];
                                                updatedImpacts[impactIndex] = e.target.value;
                                                updateStory(0, 'clientResults', 'businessImpact', updatedImpacts);
                                            }}
                                            placeholder="Enter business impact"
                                            className="flex-grow"
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => {
                                                const updatedImpacts = story.content.clientResults.businessImpact
                                                    .filter((_, i) => i !== impactIndex);
                                                updateStory(0, 'clientResults', 'businessImpact', updatedImpacts);
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
                                        const updatedImpacts = [
                                            ...story.content.clientResults.businessImpact,
                                            ''
                                        ];
                                        updateStory(0, 'clientResults', 'businessImpact', updatedImpacts);
                                    }}
                                >
                                    <IconPlus size={16} className="mr-2" /> Add Business Impact
                                </Button>
                            </div>
                        </div>
                        <div>
                            <Label>User Experience</Label>
                            <div className="space-y-2">
                                {story.content.clientResults.userExperience.map((experience, experienceIndex) => (
                                    <div key={experienceIndex} className="flex items-center space-x-2">
                                        <Input
                                            value={experience}
                                            onChange={(e) => {
                                                const updatedExperiences = [...story.content.clientResults.userExperience];
                                                updatedExperiences[experienceIndex] = e.target.value;
                                                updateStory(0, 'clientResults', 'userExperience', updatedExperiences);
                                            }}
                                            placeholder="Enter user experience"
                                            className="flex-grow"
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => {
                                                const updatedExperiences = story.content.clientResults.userExperience
                                                    .filter((_, i) => i !== experienceIndex);
                                                updateStory(0, 'clientResults', 'userExperience', updatedExperiences);
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
                                        const updatedExperiences = [
                                            ...story.content.clientResults.userExperience,
                                            ''
                                        ];
                                        updateStory(0, 'clientResults', 'userExperience', updatedExperiences);
                                    }}
                                >
                                    <IconPlus size={16} className="mr-2" /> Add User Experience
                                </Button>
                            </div>
                        </div>
                    </div>
                );
            default:
                return <div>Select a story section</div>;
        }
    };

    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    Project Story
                    <Select
                        value={story.story_section || ''}
                        onValueChange={handleStorySectionChange}
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
                </CardTitle>
            </CardHeader>
            <CardContent>
                {story.story_section && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Story Content</h3>
                        {renderStorySection(story.story_section)}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}; 