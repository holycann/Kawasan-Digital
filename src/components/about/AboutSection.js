"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AnimatedTitle, AnimatedText } from "../ui/animated-text";

export default function AboutSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
              <div className="relative w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(56,189,248,0.3)_0%,rgba(232,121,249,0.3)_100%)]" />
                  <div className="absolute h-full w-full bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.8)_0%,rgba(232,121,249,0.3)_100%)]" />
                </div>
                
                <div className="relative z-10 text-center p-8">
                  <h3 className="text-white text-4xl font-bold mb-4">
                    8+ Years
                  </h3>
                  <p className="text-white text-lg">
                    Delivering Digital Excellence
                  </p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-white dark:border-gray-900 flex items-center justify-center text-xs font-medium text-white"
                    >
                      K{i+1}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-medium">Trusted by</p>
                  <p className="font-bold">50+ clients</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <div>
            <motion.span
              className="inline-block px-3 py-1 text-sm font-medium text-blue-800 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              About Us
            </motion.span>
            
            <AnimatedTitle 
              text="Digital Innovators Shaping the Future"
              className="text-3xl md:text-4xl font-bold mb-6"
            />
            
            <div className="space-y-4">
              <AnimatedText 
                text="Kawasan Digital was founded in 2016 with a vision to empower businesses through innovative digital solutions." 
                className="text-gray-600 dark:text-gray-400"
              />
              <AnimatedText 
                text="Our team of experts combines technical excellence with creative problem-solving to deliver results that exceed expectations." 
                className="text-gray-600 dark:text-gray-400"
              />
              <AnimatedText 
                text="We pride ourselves on being partners, not just service providers, working closely with each client to understand their unique needs and goals." 
                className="text-gray-600 dark:text-gray-400"
              />
            </div>
            
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div
                className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <h3 className="font-bold mb-1">Innovative Approach</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Always at the forefront of digital trends</p>
              </motion.div>
              
              <motion.div
                className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <h3 className="font-bold mb-1">Customer Success</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Your growth is our ultimate goal</p>
              </motion.div>
              
              <motion.div
                className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <h3 className="font-bold mb-1">Quality Delivery</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Rigorous standards for exceptional results</p>
              </motion.div>
              
              <motion.div
                className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <h3 className="font-bold mb-1">Expert Team</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Specialists in their respective domains</p>
              </motion.div>
            </div>
            
            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link 
                href="/about" 
                className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
              >
                Learn more about us
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 