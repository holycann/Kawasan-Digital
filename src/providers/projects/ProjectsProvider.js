import React, { useState, useCallback } from 'react';
import { ProjectsContext } from '@/contexts/ProjectContext';
import { projectsService } from '@/services/projects';

// Provider component
export const ProjectsProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [currentProject, setCurrentProjectState] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch projects
    const fetchProjects = useCallback(async (options = {}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await projectsService.fetchProjects(options);
            setProjects(response.data);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Create a new project
    const createProject = useCallback(async (projectData) => {
        setLoading(true);
        setError(null);
        try {
            const newProject = await projectsService.createProject(projectData);
            // Update local state
            setProjects(prev => [...prev, newProject[0]]);
            return newProject[0];
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Update an existing project
    const updateProject = useCallback(async (projectId, updateData) => {
        setLoading(true);
        setError(null);
        try {
            const updatedProject = await projectsService.updateProject(projectId, updateData);
            // Update local state
            setProjects(prev =>
                prev.map(project =>
                    project.id === projectId ? updatedProject[0] : project
                )
            );
            // Update current project if it matches
            if (currentProject?.id === projectId) {
                setCurrentProjectState(updatedProject[0]);
            }
            return updatedProject[0];
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [currentProject]);

    // Delete a project
    const deleteProject = useCallback(async (projectId) => {
        setLoading(true);
        setError(null);
        try {
            await projectsService.deleteProject(projectId);
            // Remove from local state
            setProjects(prev => prev.filter(project => project.id !== projectId));
            // Clear current project if it matches
            if (currentProject?.id === projectId) {
                setCurrentProjectState(null);
            }
            return { success: true, projectId };
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [currentProject]);

    // Fetch full project details
    const fetchFullProjectDetails = useCallback(async (projectId) => {
        setLoading(true);
        setError(null);
        try {
            const projectDetails = await projectsService.fetchFullProjectDetails(projectId);

            console.log("PROJECT DETAILS:", projectDetails);
            // Update current project
            setCurrentProjectState(projectDetails.project);
            return projectDetails;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Set current project
    const setCurrentProject = useCallback((project) => {
        setCurrentProjectState(project);
    }, []);

    // Provide context value
    const contextValue = {
        projects,
        currentProject,
        loading,
        error,
        fetchProjects,
        createProject,
        updateProject,
        deleteProject,
        fetchFullProjectDetails,
        setCurrentProject
    };

    return (
        <ProjectsContext.Provider value={contextValue}>
            {children}
        </ProjectsContext.Provider>
    );
};

export default ProjectsProvider; 