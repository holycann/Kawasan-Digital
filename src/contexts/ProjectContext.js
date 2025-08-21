import React, { createContext } from 'react';

// Projects Context
export const ProjectsContext = createContext({
    projects: [],
    currentProject: null,
    loading: false,
    error: null,
    fetchProjects: async () => { },
    fetchProjectById: async () => { },
    createProject: async () => { },
    updateProject: async () => { },
    deleteProject: async () => { },
    setCurrentProject: () => { },
});

// Project Categories Context
export const ProjectCategoriesContext = createContext({
    categories: [],
    categoriesWithCount: [],
    loading: false,
    error: null,
    fetchCategories: async () => { },
    fetchCategoriesWithCount: async () => { },
    createCategory: async () => { },
    updateCategory: async () => { },
    deleteCategory: async () => { }
});

// Clients Context
export const ProjectClientsContext = createContext({
    clients: [],
    loading: false,
    error: null,
    fetchClients: async () => { },
    createClient: async () => { },
    updateClient: async () => { },
    deleteClient: async () => { },
    getClientById: async () => { }
});

// Project Images Context
export const ProjectImagesContext = createContext({
    images: [],
    loading: false,
    error: null,
    fetchProjectImages: async () => { },
    uploadProjectImages: async () => { },
    updateProjectImage: async () => { },
    deleteProjectImage: async () => { },
    reorderProjectImages: async () => { },
    getProjectImageById: async () => { }
});

// Project Stories Context
export const ProjectStoriesContext = createContext({
    stories: [],
    loading: false,
    error: null,
    fetchProjectStories: async () => { },
    addProjectStory: async () => { },
    updateProjectStory: async () => { },
    deleteProjectStory: async () => { },
    reorderProjectStories: async () => { },
    getStoryById: async () => { }
});

// Project Tech Stack Context
export const ProjectTechStackContext = createContext({
    techStacks: [],
    projectTechStack: [],
    loading: false,
    error: null,
    fetchTechStacks: async () => { },
    fetchProjectTechStack: async () => { },
    createTechStack: async () => { },
    updateTechStack: async () => { },
    deleteTechStack: async () => { },
    addProjectTechStack: async () => { },
    removeProjectTechStack: async () => { }
});

// Combine all contexts for easier export
export const ProjectContexts = {
    ProjectsContext,
    ProjectCategoriesContext,
    ProjectImagesContext,
    ProjectStoriesContext,
    ProjectTechStackContext,
    ProjectClientsContext
};

export default ProjectContexts;