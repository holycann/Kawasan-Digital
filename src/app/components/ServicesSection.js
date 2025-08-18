"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { BentoGrid, BentoGridItem } from "../../components/ui/bento-grid";
import { FaCode, FaGlobe, FaCloudArrowUp, FaArrowRight, FaMobileScreen, FaDatabase, FaRobot } from "react-icons/fa6";
import dynamic from 'next/dynamic';

const Spotlight = dynamic(() => import('../../components/ui/spotlight').then((mod) => mod.Spotlight), {
  loading: () => <div className="w-full h-full bg-transparent"></div>,
  ssr: false,
});

const SparklesCore = dynamic(() => import('../../components/ui/sparkles').then((mod) => mod.SparklesCore), {
  loading: () => <div className="w-full h-full bg-gray-100 dark:bg-gray-900 animate-pulse"></div>,
  ssr: false,
});

import { useRef } from "react";

export default function ServicesSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  return (
    <section id="services" className="py-20 relative overflow-hidden" ref={containerRef}>
      {/* 3D decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-20 right-10 w-64 h-64 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-500/20 blur-3xl"
          style={{ y: y1, rotate: rotate1 }}
        />
        <motion.div 
          className="absolute bottom-40 left-10 w-72 h-72 rounded-full bg-gradient-to-tr from-purple-400/20 to-pink-500/20 blur-3xl"
          style={{ y: y2, rotate: rotate2 }}
        />
        <motion.div 
          className="absolute top-1/3 left-1/3 w-48 h-48 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-3xl"
          style={{ scale, rotate: rotate1 }}
        />
        
        {/* Sparkles effect */}
        <div className="absolute inset-0 h-full w-full">
          <SparklesCore
            id="serviceSparkles"
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={30}
            className="w-full h-full"
            particleColor="#4f46e5"
          />
        </div>
      </div>
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white dark:from-gray-900/50 dark:to-black z-0"></div>
      
      <Spotlight
        className="max-w-7xl mx-auto px-4 md:px-6 relative z-10"
        fill="rgba(59, 130, 246, 0.15)"
      >
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-xs md:text-sm font-medium uppercase tracking-wider text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              Our Services
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl md:text-4xl font-bold mb-6 font-heading"
          >
            Digital Solutions for Modern Businesses
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-lg"
          >
            We provide comprehensive digital services to help your business thrive in the digital era
          </motion.p>
        </div>

        <BentoGrid className="mb-12">
          {/* App Development */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <BentoGridItem
              title="Mobile App Development"
              description="Native and cross-platform solutions that work seamlessly across all devices with beautiful UI/UX design."
              className="md:col-span-2 hover:shadow-xl transition-all hover:-translate-y-1"
              icon={
                <div className="p-3 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  <FaMobileScreen size={24} />
                </div>
              }
            />
          </motion.div>
          
          {/* Web Development */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <BentoGridItem
              title="Website Development"
              description="Responsive, fast-loading websites with modern designs that convert visitors into customers."
              className="hover:shadow-xl transition-all hover:-translate-y-1"
              icon={
                <div className="p-3 rounded-2xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                  <FaGlobe size={24} />
                </div>
              }
            />
          </motion.div>
          
          {/* SaaS Development */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <BentoGridItem
              title="SaaS Solutions"
              description="Scalable, cloud-based software solutions that automate processes and drive business growth."
              className="hover:shadow-xl transition-all hover:-translate-y-1"
              icon={
                <div className="p-3 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                  <FaCloudArrowUp size={24} />
                </div>
              }
            />
          </motion.div>
          
          {/* API Development */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <BentoGridItem
              title="API Development"
              description="Custom API solutions that connect your systems and enable seamless data flow between applications."
              className="hover:shadow-xl transition-all hover:-translate-y-1"
              icon={
                <div className="p-3 rounded-2xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                  <FaCode size={24} />
                </div>
              }
            />
          </motion.div>
          
          {/* Database Solutions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <BentoGridItem
              title="Database Solutions"
              description="Optimized database design and management for efficient data storage and retrieval."
              className="hover:shadow-xl transition-all hover:-translate-y-1"
              icon={
                <div className="p-3 rounded-2xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                  <FaDatabase size={24} />
                </div>
              }
            />
          </motion.div>
          
          {/* Automation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <BentoGridItem
              title="Automation & Bots"
              description="Custom automation solutions that streamline processes and reduce manual work."
              className="md:col-span-2 hover:shadow-xl transition-all hover:-translate-y-1"
              icon={
                <div className="p-3 rounded-2xl bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400">
                  <FaRobot size={24} />
                </div>
              }
            />
          </motion.div>
        </BentoGrid>
        
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/services" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg transform transition-all"
            >
              View All Services
              <FaArrowRight size={14} />
            </Link>
          </motion.div>
        </motion.div>
      </Spotlight>
    </section>
  );
} 