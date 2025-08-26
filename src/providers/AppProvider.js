import React from 'react';
import {
    ProjectsProvider,
    ProjectCategoriesProvider,
    ProjectImagesProvider,
    ProjectStoriesProvider,
    ProjectTechStackProvider,
    ProjectClientsProvider
} from './projects';
import { PortfolioProvider } from './portfolio';

const AppProvider = ({ children }) => {
    return (
        <ProjectsProvider>
            <ProjectCategoriesProvider>
                <ProjectClientsProvider>
                    <ProjectImagesProvider>
                        <ProjectStoriesProvider>
                            <ProjectTechStackProvider>
                                {children}
                            </ProjectTechStackProvider>
                        </ProjectStoriesProvider>
                    </ProjectImagesProvider>
                </ProjectClientsProvider>
            </ProjectCategoriesProvider>
        </ProjectsProvider>
    );
};

export default AppProvider;
