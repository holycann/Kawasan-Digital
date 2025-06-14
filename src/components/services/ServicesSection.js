"use client";

import { motion } from "framer-motion";
import { IconDeviceLaptop, IconWorld, IconCloud } from "@tabler/icons-react";
import { FeatureCard } from "../ui/animated-card";
import { AnimatedTitle } from "../ui/animated-text";

const servicesData = [
  {
    id: 1,
    icon: <IconDeviceLaptop size={24} />,
    title: "App Development",
    description: "We build native and cross-platform applications that deliver exceptional user experiences on mobile, desktop, and tablet.",
  },
  {
    id: 2,
    icon: <IconWorld size={24} />,
    title: "Website Development",
    description: "Our team creates responsive, fast-loading websites with modern designs that convert visitors into customers.",
  },
  {
    id: 3,
    icon: <IconCloud size={24} />,
    title: "SaaS Solutions",
    description: "We develop scalable, cloud-based software solutions that automate processes and drive business growth.",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            className="inline-block px-3 py-1 text-sm font-medium text-blue-800 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Our Services
          </motion.span>
          
          <AnimatedTitle 
            text="Digital Solutions for Modern Business"
            className="text-3xl md:text-4xl font-bold mb-6"
          />
          
          <motion.p
            className="text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We offer comprehensive digital services to help your business thrive in the digital age.
          </motion.p>
        </div>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {servicesData.map((service) => (
            <FeatureCard
              key={service.id}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <a 
            href="/services" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            Discover all our services
            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
} 