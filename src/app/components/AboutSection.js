"use client";

import { motion, useScroll, useTransform } from "framer-motion";  
import Link from "next/link";
import { ScrollRevealSection } from "../../components/ui/scroll-reveal";
import { FaRocket, FaUsers, FaLightbulb, FaTrophy, FaCode, FaMobile, FaServer, FaGlobe } from "react-icons/fa6";
import dynamic from 'next/dynamic';

const MeteorEffect = dynamic(() => import('../../components/ui/meteor-effect').then((mod) => mod.MeteorEffect), {
  loading: () => <div className="absolute inset-0 bg-gray-100 dark:bg-gray-900"></div>,
  ssr: false,
});

const Spotlight = dynamic(() => import('../../components/ui/spotlight').then((mod) => mod.Spotlight), {
  loading: () => <div className="w-full h-full bg-transparent"></div>,
  ssr: false,
});

const Sparkles = dynamic(() => import('../../components/ui/sparkles').then((mod) => mod.Sparkles), {
  loading: () => <div className="w-full h-full bg-gray-100 dark:bg-gray-900"></div>,
  ssr: false,
});

import { useRef } from "react";

export default function AboutSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -20]);

  // Items for the sticky scroll reveal
  const scrollItems = [
    // Item 1: Our Story
    <div key="story" className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div>
        <motion.span
          className="inline-block px-4 py-1.5 text-xs md:text-sm font-medium uppercase tracking-wider text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4"
        >
          Our Story
        </motion.span>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading">
          Digital Innovators Shaping the Future
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Kawasan Digital was founded in 2019 with a vision to empower businesses through innovative digital solutions. Our journey began with a small team of passionate developers and has grown into a comprehensive digital solutions provider.
        </p>
                  <p className="text-gray-600 dark:text-gray-400">
            Today, we&apos;re proud to be recognized as an industry leader, with a team of specialists working across multiple disciplines to deliver cutting-edge solutions to clients worldwide.
          </p>
      </div>
      <div className="relative">
        <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
          <div className="relative w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(56,189,248,0.3)_0%,rgba(232,121,249,0.3)_100%)]" />
              <div className="absolute h-full w-full bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.8)_0%,rgba(232,121,249,0.3)_100%)]" />
            </div>
            
            <Sparkles
              className="w-full h-full absolute inset-0"
              background="transparent"
              minSize={0.5}
              maxSize={1.2}
              particleColor="#fff"
              particleDensity={20}
              speed={0.3}
            >
              <div className="relative z-10 text-center p-8">
                <h3 className="text-white text-4xl font-bold mb-4">
                  6+ Years
                </h3>
                <p className="text-white text-lg">
                  Delivering Digital Excellence
                </p>
              </div>
            </Sparkles>
          </div>
        </div>
        
        {/* Floating 3D elements - Reduced for performance */}
        <motion.div 
          className="absolute -top-10 -right-10 w-16 h-16 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 opacity-50"
          style={{ y: y1, rotate: rotate1 }}
        />
        <motion.div 
          className="absolute -bottom-10 -left-10 w-12 h-12 rounded-full bg-gradient-to-tr from-purple-400 to-pink-500 opacity-50"
          style={{ y: y2, rotate: rotate2 }}
        />
      </div>
    </div>,
    
    // Item 2: Our Values
    <div key="values" className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className="md:order-2">
        <motion.span
          className="inline-block px-4 py-1.5 text-xs md:text-sm font-medium uppercase tracking-wider text-purple-700 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4"
        >
          Our Values
        </motion.span>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading">
          Principles That Guide Our Work
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          At Kawasan Digital, our core values define who we are and how we approach every project and client relationship.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <FaRocket size={20} />
            </div>
            <div>
              <h3 className="font-semibold">Innovation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Always exploring new technologies</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors">
            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
              <FaUsers size={20} />
            </div>
            <div>
              <h3 className="font-semibold">Collaboration</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Working closely with clients</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/10 transition-colors">
            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
              <FaLightbulb size={20} />
            </div>
            <div>
              <h3 className="font-semibold">Excellence</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Striving for perfection</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/10 transition-colors">
            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
              <FaTrophy size={20} />
            </div>
            <div>
              <h3 className="font-semibold">Integrity</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Honesty in all we do</p>
            </div>
          </div>
        </div>
      </div>
      <div className="md:order-1 grid grid-cols-2 gap-4 relative">
        <motion.div 
          className="aspect-square bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center p-6 hover:shadow-lg transition-all hover:-translate-y-1"
          whileHover={{ scale: 1.05 }}
        >
          <FaRocket className="text-blue-600 dark:text-blue-400" size={64} />
        </motion.div>
        <motion.div 
          className="aspect-square bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center p-6 hover:shadow-lg transition-all hover:-translate-y-1"
          whileHover={{ scale: 1.05 }}
        >
          <FaUsers className="text-purple-600 dark:text-purple-400" size={64} />
        </motion.div>
        <motion.div 
          className="aspect-square bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center p-6 hover:shadow-lg transition-all hover:-translate-y-1"
          whileHover={{ scale: 1.05 }}
        >
          <FaLightbulb className="text-green-600 dark:text-green-400" size={64} />
        </motion.div>
        <motion.div 
          className="aspect-square bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center p-6 hover:shadow-lg transition-all hover:-translate-y-1"
          whileHover={{ scale: 1.05 }}
        >
          <FaTrophy className="text-amber-600 dark:text-amber-400" size={64} />
        </motion.div>
        
        {/* Floating 3D elements */}
        <motion.div 
          className="absolute -top-10 -left-10 w-16 h-16 rounded-lg bg-gradient-to-br from-green-400 to-blue-500 opacity-70"
          style={{ y: y2, rotate: rotate1 }}
        />
        <motion.div 
          className="absolute -bottom-10 -right-10 w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-red-500 opacity-70"
          style={{ y: y1, rotate: rotate2 }}
        />
      </div>
    </div>,
    
    // Item 3: Our Team
    <div key="team" className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div>
        <motion.span
          className="inline-block px-4 py-1.5 text-xs md:text-sm font-medium uppercase tracking-wider text-indigo-700 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4"
        >
          Our Team
        </motion.span>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading">
          Talented Individuals Behind Our Success
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Our diverse team of experts brings together the perfect blend of technical knowledge, creative thinking, and business acumen to deliver exceptional results.
        </p>
        <div className="flex gap-4">
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.1, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-2 border-2 border-blue-500">
              <img src="https://placehold.co/200x200?text=CEO" alt="CEO" className="w-full h-full object-cover" />
            </div>
            <p className="text-sm font-medium">Siro</p>
            <p className="text-xs text-gray-500">CEO</p>
          </motion.div>
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.1, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-2 border-2 border-purple-500">
              <img src="https://placehold.co/200x200?text=CTO" alt="CTO" className="w-full h-full object-cover" />
            </div>
            <p className="text-sm font-medium">Rama</p>
            <p className="text-xs text-gray-500">CTO</p>
          </motion.div>
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.1, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-2 border-2 border-indigo-500">
              <img src="https://placehold.co/200x200?text=CD" alt="Creative Director" className="w-full h-full object-cover" />
            </div>
            <p className="text-sm font-medium">Lutfi</p>
            <p className="text-xs text-gray-500">Creative</p>
          </motion.div>
        </div>
        <div className="mt-6 relative z-10">
          <Link 
            href="/about#leadership" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors cursor-pointer"
          >
            Meet our full team
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
      <div className="relative">
        <div className="grid grid-cols-2 gap-4">
          <motion.div 
            className="aspect-square bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex items-center justify-center hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">15+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Team Members</div>
            </div>
          </motion.div>
          <motion.div 
            className="aspect-square bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex items-center justify-center hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">35+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
            </div>
          </motion.div>
          <motion.div 
            className="aspect-square bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex items-center justify-center hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">6+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Years</div>
            </div>
          </motion.div>
          <motion.div 
            className="aspect-square bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex items-center justify-center hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">24/7</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Support</div>
            </div>
          </motion.div>
        </div>
        
        {/* Floating 3D elements */}
        <motion.div 
          className="absolute -top-10 -right-10 w-20 h-20 rounded-lg bg-gradient-to-br from-indigo-400 to-blue-500 opacity-70 pointer-events-none"
          style={{ y: y1, rotate: rotate1 }}
        />
        <motion.div 
          className="absolute -bottom-10 -left-10 w-16 h-16 rounded-full bg-gradient-to-tr from-pink-400 to-red-500 opacity-70 pointer-events-none"
          style={{ y: y2, rotate: rotate2 }}
        />
      </div>
    </div>,
    
    // Item 4: Our Expertise
    <div key="expertise" className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className="md:order-2">
        <motion.span
          className="inline-block px-4 py-1.5 text-xs md:text-sm font-medium uppercase tracking-wider text-pink-700 dark:text-pink-400 bg-pink-100 dark:bg-pink-900/30 rounded-full mb-4"
        >
          Our Expertise
        </motion.span>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading">
          Building Digital Solutions That Matter
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          We specialize in delivering impactful digital products and platforms, tailored to your business needs.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <FaMobile size={20} />
            </div>
            <div>
              <h3 className="font-semibold">App Development</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">iOS & Android</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors">
            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
              <FaGlobe size={20} />
            </div>
            <div>
              <h3 className="font-semibold">Web Development</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Responsive sites</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/10 transition-colors">
            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
              <FaServer size={20} />
            </div>
            <div>
              <h3 className="font-semibold">SaaS Solutions</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Cloud platforms</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/10 transition-colors">
            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
              <FaCode size={20} />
            </div>
            <div>
              <h3 className="font-semibold">API Development</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Integration solutions</p>
            </div>
          </div>
        </div>
      </div>
      <div className="md:order-1 relative">
        <div className="grid grid-cols-2 gap-4">
          <motion.div 
            className="aspect-square bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center p-6 hover:shadow-lg transition-all hover:-translate-y-1"
            whileHover={{ scale: 1.05 }}
          >
            <FaMobile className="text-blue-600 dark:text-blue-400" size={64} />
          </motion.div>
          <motion.div 
            className="aspect-square bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center p-6 hover:shadow-lg transition-all hover:-translate-y-1"
            whileHover={{ scale: 1.05 }}
          >
            <FaGlobe className="text-purple-600 dark:text-purple-400" size={64} />
          </motion.div>
          <motion.div 
            className="aspect-square bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center p-6 hover:shadow-lg transition-all hover:-translate-y-1"
            whileHover={{ scale: 1.05 }}
          >
            <FaServer className="text-green-600 dark:text-green-400" size={64} />
          </motion.div>
          <motion.div 
            className="aspect-square bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center p-6 hover:shadow-lg transition-all hover:-translate-y-1"
            whileHover={{ scale: 1.05 }}
          >
            <FaCode className="text-amber-600 dark:text-amber-400" size={64} />
          </motion.div>
        </div>
        
        {/* Floating 3D elements */}
        <motion.div 
          className="absolute -top-10 -left-10 w-16 h-16 rounded-lg bg-gradient-to-br from-pink-400 to-purple-500 opacity-70"
          style={{ y: y2, rotate: rotate1 }}
        />
        <motion.div 
          className="absolute -bottom-10 -right-10 w-20 h-20 rounded-full bg-gradient-to-tr from-blue-400 to-cyan-500 opacity-70"
          style={{ y: y1, rotate: rotate2 }}
        />
      </div>
    </div>
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden" ref={containerRef}>
      <MeteorEffect className="absolute inset-0" number={20} />
      
      {/* 3D decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>
      
      <Spotlight
        className="max-w-7xl mx-auto px-4 md:px-6 py-4 relative z-10"
        fill="rgba(59, 130, 246, 0.15)"
      >
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-xs md:text-sm font-medium uppercase tracking-wider text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              About Us
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl md:text-4xl font-bold mb-6 font-heading"
          >
            Get to Know Kawasan Digital
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-lg"
          >
            We&apos;re a team of passionate digital experts committed to helping businesses thrive in the digital era
          </motion.p>
        </div>
      </Spotlight>
      
      <ScrollRevealSection items={scrollItems} />
      
      <div className="container mx-auto px-4 md:px-6 mt-16 text-center relative z-10">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            href="/about" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg transform hover:scale-105 transition-all"
          >
            Learn More About Us
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 