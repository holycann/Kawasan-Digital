"use client";

import Image from 'next/image';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

export default function ProjectImages({ project }) {
    if (!project.images || project.images.length === 0) return null;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Project Images</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {project.images.map((image, index) => (
                        <div
                            key={index}
                            className="rounded-lg overflow-hidden shadow-md"
                        >
                            <Image
                                src={image.image_url}
                                alt={image.image_title || `Project Image ${index + 1}`}
                                className="w-full h-48 object-cover"
                                width={500}
                                height={500}
                            />
                            {image.image_title && (
                                <div className="p-2 text-sm text-center bg-neutral-100 dark:bg-neutral-800">
                                    {image.image_title}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
} 