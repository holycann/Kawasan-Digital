"use client";

import React, { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconPlus, IconTrash, IconUpload } from "@tabler/icons-react";
import { toast } from 'sonner';

export const ImagesSection = ({ 
    projectData, 
    removeImage,
    setProjectData 
}) => {
    const fileInputRef = useRef(null);
    const coverFileInputRef = useRef(null);
    const [pendingCoverImage, setPendingCoverImage] = useState(null);
    const [pendingProjectImages, setPendingProjectImages] = useState([]);

    // Ensure projectData has images array
    useEffect(() => {
        if (!projectData.images) {
            setProjectData(prev => ({
                ...prev,
                images: []
            }));
        }
    }, [projectData, setProjectData]);

    const handleFileValidation = useCallback((files, isCoverImage = false) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        const validFiles = Array.from(files).filter(file => {
            if (!allowedTypes.includes(file.type)) {
                toast.error(`Invalid file type for ${file.name}. Only JPEG, PNG, WebP, and GIF are allowed.`);
                return false;
            }

            if (file.size > maxSize) {
                toast.error(`File ${file.name} is too large. Maximum size is 5MB.`);
                return false;
            }

            return true;
        });

        if (isCoverImage) {
            // For cover image, only take the first valid file
            setPendingCoverImage(validFiles[0] || null);
            
            // Update project data with pending cover image
            if (validFiles[0]) {
                setProjectData(prev => ({
                    ...prev,
                    pendingCoverImage: validFiles[0]
                }));
            }
        } else {
            // For project images, add to pending images
            const newPendingImages = validFiles.map(file => ({
                file,
                title: file.name,
                order: pendingProjectImages.length
            }));

            setPendingProjectImages(prev => [
                ...prev, 
                ...newPendingImages
            ]);

            // Update project data with pending project images
            setProjectData(prev => ({
                ...prev,
                pendingProjectImages: [
                    ...(prev.pendingProjectImages || []),
                    ...newPendingImages
                ]
            }));
        }

        // Reset file inputs
        if (fileInputRef.current) fileInputRef.current.value = '';
        if (coverFileInputRef.current) coverFileInputRef.current.value = '';
    }, [pendingProjectImages, setProjectData]);

    const removePendingCoverImage = useCallback(() => {
        setPendingCoverImage(null);
        setProjectData(prev => ({
            ...prev,
            pendingCoverImage: null,
            cover_image: ''
        }));
    }, [setProjectData]);

    const removePendingProjectImage = useCallback((index) => {
        setPendingProjectImages(prev => prev.filter((_, i) => i !== index));
        
        setProjectData(prev => ({
            ...prev,
            pendingProjectImages: (prev.pendingProjectImages || [])
                .filter((_, i) => i !== index)
        }));
    }, [setProjectData]);

    return (
        <>
            <Card className="mt-4">
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        Project Cover Image
                        <div className="flex items-center space-x-2">
                            <input 
                                type="file" 
                                ref={coverFileInputRef}
                                accept="image/jpeg,image/png,image/webp,image/gif"
                                className="hidden" 
                                multiple={false}
                                onChange={(e) => handleFileValidation(e.target.files, true)}
                            />
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => coverFileInputRef.current?.click()}
                            >
                                <IconUpload size={16} className="mr-2" /> Upload Cover Image
                            </Button>
                        </div>
                    </CardTitle>
                </CardHeader>
                {(projectData.cover_image || pendingCoverImage) && (
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                                <Label>Cover Image</Label>
                                <Input
                                    value={
                                        pendingCoverImage 
                                            ? pendingCoverImage.name 
                                            : (projectData.cover_image || '')
                                    }
                                    readOnly
                                    placeholder="Cover image"
                                />
                            </div>
                            <div>
                                <Label>Preview</Label>
                                <Image
                                    src={
                                        pendingCoverImage 
                                            ? URL.createObjectURL(pendingCoverImage)
                                            : projectData.cover_image
                                    }
                                    alt="Cover"
                                    className="w-full h-32 object-cover rounded"
                                    width={200}
                                    height={200}
                                />
                            </div>
                            <div className="flex items-end">
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    onClick={removePendingCoverImage}
                                >
                                    Remove Cover
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                )}
            </Card>

            <Card className="mt-4">
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        Project Images
                        <div className="flex items-center space-x-2">
                            <input 
                                type="file" 
                                ref={fileInputRef}
                                accept="image/jpeg,image/png,image/webp,image/gif"
                                className="hidden" 
                                multiple
                                onChange={(e) => handleFileValidation(e.target.files)}
                            />
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <IconPlus size={16} className="mr-2" /> Upload Images
                            </Button>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Existing Project Images */}
                    {projectData.images.map((image, index) => (
                        <div key={`existing-${index}`} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                                <Label>Image URL</Label>
                                <Input
                                    value={image.image_url}
                                    readOnly
                                    placeholder="Image URL"
                                />
                            </div>
                            <div>
                                <Label>Image Title</Label>
                                <Input
                                    value={image.image_title}
                                    readOnly
                                    placeholder="Image title"
                                />
                            </div>
                            <div className="flex items-end space-x-2">
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => removeImage(index)}
                                >
                                    <IconTrash size={16} />
                                </Button>
                            </div>
                        </div>
                    ))}

                    {/* Pending Project Images */}
                    {pendingProjectImages.map((image, index) => (
                        <div key={`pending-${index}`} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                                <Label>Image Name</Label>
                                <Input
                                    value={image.file.name}
                                    readOnly
                                    placeholder="Image name"
                                />
                            </div>
                            <div>
                                <Label>Preview</Label>
                                <Image
                                    src={URL.createObjectURL(image.file)}
                                    alt={`Pending image ${index + 1}`}
                                    className="w-full h-32 object-cover rounded"
                                    width={200}
                                    height={200}
                                />
                            </div>
                            <div className="flex items-end space-x-2">
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => removePendingProjectImage(index)}
                                >
                                    <IconTrash size={16} />
                                </Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </>
    );
}; 