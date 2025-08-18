import { useContext } from 'react';
import {
    ProjectsContext,
    ProjectCategoriesContext,
    ProjectImagesContext,
    ProjectStoriesContext,
    ProjectTechStackContext,
    ProjectClientsContext
} from '@/contexts/ProjectContext';

// Custom hook for projects
export const useProjects = () => {
    const context = useContext(ProjectsContext);
    if (!context) {
        throw new Error('useProjects must be used within a ProjectsProvider');
    }
    return context;
};

// Custom hook for project categories
export const useProjectCategories = () => {
    const context = useContext(ProjectCategoriesContext);
    if (!context) {
        throw new Error('useProjectCategories must be used within a ProjectCategoriesProvider');
    }
    return context;
};

// Custom hook for project clients
export const useProjectClients = () => {
    const context = useContext(ProjectClientsContext);
    if (!context) {
        throw new Error('useProjectClients must be used within a ProjectClientsProvider');
    }
    return context;
};

// Custom hook for project images
export const useProjectImages = () => {
    const context = useContext(ProjectImagesContext);
    if (!context) {
        throw new Error('useProjectImages must be used within a ProjectImagesProvider');
    }
    return context;
};

// Custom hook for project stories
export const useProjectStories = () => {
    const context = useContext(ProjectStoriesContext);
    if (!context) {
        throw new Error('useProjectStories must be used within a ProjectStoriesProvider');
    }
    return context;
};

// Custom hook for project tech stack
export const useProjectTechStack = () => {
    const context = useContext(ProjectTechStackContext);
    if (!context) {
        throw new Error('useProjectTechStack must be used within a ProjectTechStackProvider');
    }
    return context;
};