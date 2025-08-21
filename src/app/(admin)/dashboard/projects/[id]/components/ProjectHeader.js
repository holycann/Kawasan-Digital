"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useProjects } from '@/hooks/useProject';

export default function ProjectHeader({ project, projectId }) {
    const router = useRouter();
    const { deleteProject } = useProjects();

    const handleDeleteProject = async () => {
        try {
            await deleteProject(projectId);
            toast.success('Project deleted successfully');
            router.push('/dashboard/projects');
        } catch (err) {
            toast.error('Failed to delete project');
            console.error(err);
        }
    };

    return (
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">
                {project.title}
            </h1>
            <div className="flex gap-2">
                <Link href={`/dashboard/projects/${projectId}/edit`}>
                    <Button variant="outline" className="flex items-center gap-2">
                        <IconEdit size={18} />
                        Edit Project
                    </Button>
                </Link>
                <Button
                    variant="destructive"
                    className="flex items-center gap-2"
                    onClick={handleDeleteProject}
                >
                    <IconTrash size={18} />
                    Delete Project
                </Button>
            </div>
        </div>
    );
} 