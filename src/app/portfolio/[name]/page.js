"use client";

import { useState, useEffect, use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from 'next/image';
import { motion } from "framer-motion";
import { FaArrowLeft, FaCalendar, FaCode, FaLink } from "react-icons/fa6";
import dynamic from 'next/dynamic';

import ProjectHooks from '@/hooks/useProject';
import { deslugify, slugify } from "@/utils/slugify";

const Spotlight = dynamic(() => import('../../../components/ui/spotlight').then((mod) => mod.Spotlight), {
  loading: () => <div className="w-full h-full bg-transparent"></div>,
  ssr: false,
});

export default function PortfolioDetail({ params }) {
  const { name: unwrappedParams } = use(params);

  // Destructure all available hooks
  const {
    useProjects,
  } = ProjectHooks;

  // Initialize all project-related hooks
  const {
    projects,
    projectDetails,
    fetchFullProjectDetails,
    loading
  } = useProjects();

  console.log("Projects:", projects)

  // Find the project based on the title (URL-decoded)
  const project = projects.find((p) => slugify(p.title) === unwrappedParams);

  // State for active image
  const [activeImage, setActiveImage] = useState(project?.cover_image || "");

  // Fetch full project details when project is found
  useEffect(() => {
    const fetchProjectDetails = async () => {
      if (project?.id) {
        try {
          await fetchFullProjectDetails(project.id);
        } catch (error) {
          console.error("Error fetching project details:", error);
        }
      }
    };

    fetchProjectDetails();
  }, [project?.id, fetchFullProjectDetails]);

  if (!project) {
    notFound();
  }

  // Find related projects (same category, excluding current)
  const relatedProjects = projects
    .filter(item => item.category.name === project.category.name && item.id !== project.id)
    .slice(0, 3);

  // Ensure projectDetails is loaded before rendering
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  console.log("PROJECT DETAILS:", projectDetails)

  return (
    <>
      {
        projectDetails && (
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
                    {[project.cover_image, ...projectDetails.images].map((image, idx) => {
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

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {/* Project details content */}
                  <div className="mb-2 flex items-center gap-2">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                      {project.category.name}
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

                  {projectDetails.techStack?.length > 0 && (
                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-3">
                        <FaCode className="text-blue-600 dark:text-blue-400" />
                        <h2 className="text-xl font-semibold">Technologies Used</h2>
                      </div>
                      <ul className="flex flex-wrap gap-2">
                        {projectDetails.techStack.map((tech) => (
                          <li
                            key={tech.id}
                            className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                          >
                            {tech.tech_stack.tech_name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {projectDetails.highlights && (
                    <div className="mb-8">
                      <h2 className="text-xl font-semibold mb-3">Project Highlights</h2>
                      <ul className="space-y-2">
                        {projectDetails.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="mt-1 rounded-full p-1 bg-green-100 dark:bg-green-900/30">
                              <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span className="text-gray-700 dark:text-gray-300">{highlight.highlight_text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.website_url && (
                    <div className="flex gap-4">
                      <a
                        href={project.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                      >
                        Visit Website
                        <FaLink size={12} />
                      </a>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Build Story Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 md:p-12"
              >
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 font-heading">
                    Build Story
                  </h2>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Why We Built This */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </div>
                        Why We Built This
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {projectDetails.stories.find(story => story.story_section === 'whyWeBuilt')?.story_content?.description || "The client needed a modern, high-performance website that could showcase their digital services and attract potential clients. They wanted something that stood out from the competition while maintaining excellent user experience and fast loading times."}
                      </p>
                    </div>

                    {/* Problems Solved */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        Problems We Solved
                      </h3>
                      <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                        {(projectDetails.stories.find(story => story.story_section === 'problemsSolved')?.story_content?.problems || [
                          "Slow loading times and poor mobile experience",
                          "Outdated design that didn't reflect modern standards",
                          "Lack of clear call-to-action and lead generation",
                          "Poor SEO optimization and search visibility"
                        ]).map((problem, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                            <span>{problem}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="mt-12">
                    <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                      <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      Performance Results
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                          {projectDetails.stories.find(story => story.story_section === 'performanceResults')?.story_content?.performanceScore || 95}%
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Performance Score</div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
                        <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                          {projectDetails.stories.find(story => story.story_section === 'performanceResults')?.story_content?.loadTime || "1.2s"}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Load Time</div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
                        <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                          {projectDetails.stories.find(story => story.story_section === 'performanceResults')?.story_content?.accessibility || 98}%
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Accessibility</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Development Process */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 md:p-12"
              >
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600 font-heading">
                    Development Process
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        Planning & Research
                      </h3>
                      <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                        {projectDetails.stories
                          .find(story => story.story_section === 'developmentProcess')?.story_content.planning
                          .map((plan, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="mt-1.5 w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              <span>{plan}</span>
                            </li>
                          ))
                        }
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                          </svg>
                        </div>
                        Design & Development
                      </h3>
                      <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                        {projectDetails.stories
                          .find(story =>
                            story.story_section === 'developmentProcess')?.story_content.design
                          .map((design, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              <span>{design}</span>
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Key Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="mt-16 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 md:p-12"
              >
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 font-heading">
                    Key Features
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {projectDetails.stories
                      .find(story => story.story_section === 'keyFeatures')?.story_content?.features.map((feature, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6">
                          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </motion.div>

              {/* Client Results */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                className="mt-16 bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 md:p-12"
              >
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600 font-heading">
                    Client Results
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        Business Impact
                      </h3>
                      <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                        {projectDetails.stories.find(story => story.story_section === 'clientResults')?.story_content?.businessImpact?.map((impact, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="mt-1.5 w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                            <span>{impact}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        User Experience
                      </h3>
                      <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                        {projectDetails.stories.find(story => story.story_section === 'clientResults')?.story_content?.userExperience?.map((experience, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="mt-1.5 w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                            <span>{experience}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

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
                        <Link href={`/portfolio/${slugify(item.title)}`}>
                          <div className="h-48 relative overflow-hidden">
                            <Image
                              src={item.cover_image}
                              alt={item.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-300"
                              placeholder="blur"
                              blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(400, 300))}`}
                            />
                          </div>
                          <div className="p-6">
                            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{item.short_description}</p>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </Spotlight>
          </article>
        )
      }
    </>
  );
}

// Existing shimmer and toBase64 functions remain the same
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
