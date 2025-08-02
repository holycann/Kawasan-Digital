"use client";

import { useState, useEffect } from "react";
import PortfolioCard from "../components/PortfolioCard";
import { portfolioItems } from "../../data/portfolioData";
import dynamic from 'next/dynamic';

const SparklesCore = dynamic(() => import('../../components/ui/sparkles').then((mod) => mod.SparklesCore), {
  loading: () => <div className="w-full h-full bg-gray-100 dark:bg-gray-900 animate-pulse"></div>,
  ssr: false,
});

const Spotlight = dynamic(() => import('../../components/ui/spotlight').then((mod) => mod.Spotlight), {
  loading: () => <div className="w-full h-full bg-transparent"></div>,
  ssr: false,
});

const AnimatedTabs = dynamic(() => import('../../components/ui/animated-tabs').then((mod) => mod.AnimatedTabs), {
  loading: () => <div className="w-full h-12 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-full"></div>,
  ssr: false,
});

import { motion, useScroll, useTransform } from "framer-motion";
import { FaFilter, FaChevronLeft, FaChevronRight } from "react-icons/fa6";

// export const metadata = {
//   title: "Portfolio - Kawasan Digital",
//   description: "A selection of projects delivered by Kawasan Digital across apps, web, and SaaS.",
// };

// Get unique categories from portfolio items
const categories = ["All", ...new Set(portfolioItems.map(item => item.category))];

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  
  const itemsPerPage = 3;
  
  // Filter items based on active tab
  const filteredItems = activeTab === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeTab);
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);
  
  // Reset to page 1 when changing tabs
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);
  
  // Create tabs for AnimatedTabs component
  const tabs = categories.map(category => ({
    id: category,
    label: category,
    content: (
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {currentItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <PortfolioCard item={item} />
            </motion.div>
          ))}
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaChevronLeft size={14} />
              Previous
            </button>
            
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <FaChevronRight size={14} />
            </button>
          </div>
        )}
        
        {/* Page info */}
        <div className="text-center text-gray-600 dark:text-gray-400 mt-4">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredItems.length)} of {filteredItems.length} projects
        </div>
      </div>
    ),
  }));

  return (
    <section className="pt-24 pb-16 bg-white dark:bg-black min-h-screen relative overflow-hidden">
      {/* 3D decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        
        {/* Sparkles effect */}
        <div className="absolute inset-0 h-screen w-full">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={70}
            className="w-full h-full"
            particleColor="#4f46e5"
          />
        </div>
        
        {/* Floating 3D elements */}
        <motion.div 
          className="absolute top-40 right-20 w-24 h-24 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 opacity-70"
          style={{ y }}
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.05, 0.95, 1]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        
        <motion.div 
          className="absolute bottom-40 left-20 w-16 h-16 rounded-full bg-gradient-to-tr from-purple-400 to-pink-500 opacity-70"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        
        <motion.div 
          className="absolute top-1/2 left-1/3 w-12 h-12 rounded-md bg-gradient-to-r from-blue-500 to-indigo-500 opacity-70"
          animate={{ 
            y: [0, 30, 0],
            x: [0, 20, 0],
            rotate: [0, -45, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
      </div>
      
      <Spotlight
        className="max-w-7xl mx-auto px-4 md:px-6 relative z-10"
        fill="rgba(59, 130, 246, 0.15)"
      >
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.span
            className="inline-block px-4 py-1.5 mb-4 text-xs md:text-sm font-medium uppercase tracking-wider text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Portfolio
          </motion.span>
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 font-heading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Our Work
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-400 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore some of the digital products and experiences we&apos;ve crafted for our clients.
            From mobile apps to enterprise solutions, we bring ideas to life.
          </motion.p>
          
          <motion.div
            className="flex items-center justify-center gap-2 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <FaFilter className="text-blue-600 dark:text-blue-400" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">Filter by category:</span>
          </motion.div>
          
          <AnimatedTabs 
            tabs={tabs} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            tabsContainerClassName="justify-center mb-12"
          />
        </div>
      </Spotlight>
      
      {/* Stats section */}
      <motion.div 
        className="max-w-5xl mx-auto mt-20 px-4 py-10 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl shadow-lg"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">35+</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Projects Completed</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400">25+</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Happy Clients</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-pink-600 dark:text-pink-400">15+</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Expert Team</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-pink-600 dark:text-pink-400">6+</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Years of Experience</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
} 