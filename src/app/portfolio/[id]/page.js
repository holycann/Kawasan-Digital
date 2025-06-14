"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { portfolioItems } from "../../../data/portfolioData";
import { motion } from "framer-motion";
import { FaArrowLeft, FaCalendar, FaCode, FaLink } from "react-icons/fa6";
import { Spotlight } from "../../../components/ui/spotlight";

// export function generateStaticParams() {
//   return portfolioItems.map((item) => ({ id: item.id }));
// }

// export function generateMetadata({ params }) {
//   const item = portfolioItems.find((p) => p.id === params.id);
//   if (!item) return {};
//   return {
//     title: `${item.title} - Portfolio | Kawasan Digital`,
//     description: item.shortDescription,
//   };
// }

export default function PortfolioDetail({ params }) {
  const project = portfolioItems.find((p) => p.id === params.id);
  const [activeImage, setActiveImage] = useState(project?.coverImage || "");

  if (!project) {
    notFound();
  }

  // Find related projects (same category, excluding current)
  const relatedProjects = portfolioItems
    .filter(item => item.category === project.category && item.id !== project.id)
    .slice(0, 3);

  return (
    <article className="pt-24 pb-16 bg-white dark:bg-black min-h-screen">
      <Spotlight
        className="max-w-7xl mx-auto px-4 md:px-6 relative z-10"
        fill="rgba(59, 130, 246, 0.15)"
      >
        <div className="mb-6">
          <Link 
            href="/portfolio" 
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 mb-4">
              <img 
                src={activeImage} 
                alt={project.title} 
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {[project.coverImage, ...project.images].map((image, idx) => (
                <div 
                  key={idx} 
                  className={`aspect-video rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                    activeImage === image 
                      ? "border-blue-500 dark:border-blue-400 scale-95" 
                      : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                  onClick={() => setActiveImage(image)}
                >
                  <img 
                    src={image} 
                    alt={`${project.title} thumbnail ${idx + 1}`} 
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                {project.category}
              </span>
              <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                <FaCalendar size={12} />
                <span>{project.year}</span>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 font-heading">
              {project.title}
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              {project.description}
            </p>
            
            {project.techStack?.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <FaCode className="text-blue-600 dark:text-blue-400" />
                  <h2 className="text-xl font-semibold">Technologies Used</h2>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <li 
                      key={tech} 
                      className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Project Highlights</h2>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="mt-1 rounded-full p-1 bg-green-100 dark:bg-green-900/30">
                    <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Responsive design for all devices</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 rounded-full p-1 bg-green-100 dark:bg-green-900/30">
                    <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Optimized for performance and SEO</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 rounded-full p-1 bg-green-100 dark:bg-green-900/30">
                    <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Modern UI/UX with attention to detail</span>
                </li>
              </ul>
            </div>
            
            <div className="flex gap-4">
              <a 
                href="#" 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
              >
                Visit Website
                <FaLink size={12} />
              </a>
              <a 
                href="#" 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Case Study
                <FaLink size={12} />
              </a>
            </div>
          </motion.div>
        </div>
        
        {relatedProjects.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8 font-heading">Related Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Link href={`/portfolio/${item.id}`}>
                    <div className="h-48 relative overflow-hidden">
                      <img 
                        src={item.coverImage} 
                        alt={item.title} 
                        className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{item.shortDescription}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </Spotlight>
    </article>
  );
} 