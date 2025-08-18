"use client";

import { useState } from "react";
import Image from 'next/image';
import { motion } from "motion/react";

// Shimmer effect for placeholder
const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f0f0f0" offset="20%" />
      <stop stop-color="#e0e0e0" offset="50%" />
      <stop stop-color="#f0f0f0" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f0f0f0" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str) =>
    typeof window === 'undefined'
        ? Buffer.from(str).toString('base64')
        : window.btoa(str);

export default function ProjectImages({ project }) {
    const [activeImage, setActiveImage] = useState(project?.cover_image || "");

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 mb-4">
                <Image
                    src={activeImage}
                    alt={project.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center"
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                />
            </div>

            <div className="grid grid-cols-4 gap-4">
                {[project.cover_image, ...project.images].map((image, idx) => {
                    const imageUrl = typeof image === 'string' ? image : image.image_url;
                    return (
                        <div
                            key={idx}
                            className={`aspect-video rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${activeImage === imageUrl
                                ? "border-blue-500 dark:border-blue-400 scale-95"
                                : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
                                }`}
                            onClick={() => setActiveImage(imageUrl)}
                        >
                            <Image
                                src={imageUrl}
                                alt={`${project.title} thumbnail ${idx + 1}`}
                                width={300}
                                height={200}
                                className="w-full h-full object-cover object-center"
                                placeholder="blur"
                                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(300, 200))}`}
                            />
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
} 