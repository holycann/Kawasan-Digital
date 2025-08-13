import React from 'react';
import {
    ProjectsProvider,
    ProjectCategoriesProvider,
    ProjectImagesProvider,
    ProjectHighlightsProvider,
    ProjectStoriesProvider,
    ProjectTechStackProvider,
    ProjectClientsProvider
} from './projects';

const AppProvider = ({ children }) => {
    return (
        <ProjectsProvider>
            <ProjectCategoriesProvider>
                <ProjectClientsProvider>
                    <ProjectImagesProvider>
                        <ProjectHighlightsProvider>
                            <ProjectStoriesProvider>
                                <ProjectTechStackProvider>
                                    {children}
                                </ProjectTechStackProvider>
                            </ProjectStoriesProvider>
                        </ProjectHighlightsProvider>
                    </ProjectImagesProvider>
                </ProjectClientsProvider>
            </ProjectCategoriesProvider>
        </ProjectsProvider>
    );
};

export default AppProvider;
