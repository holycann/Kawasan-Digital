"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedTitle } from "../ui/animated-text";
import { cn } from "../../utils/cn";
import { TestimonialsSection as AnimatedTestimonials } from "../ui/animated-testimonials";

const testimonials = [
  {
    name: "Andi Wijaya",
    title: "CEO at TechIndo",
    avatar: "https://placehold.co/200x200?text=AW",
    text: "Kawasan Digital transformed our business with their innovative web solutions. Their team was professional, responsive, and delivered beyond our expectations. The new website has significantly increased our online presence and customer engagement.",
    rating: 5
  },
  {
    name: "Siti Rahayu",
    title: "Marketing Director at GlobalMart",
    avatar: "https://placehold.co/200x200?text=SR",
    text: "Working with Kawasan Digital was a game-changer for our company. Their mobile app development expertise helped us reach new customers and streamline our operations. Highly recommended for any business looking to go digital!",
    rating: 5
  },
  {
    name: "Budi Santoso",
    title: "Founder of EduTech",
    avatar: "https://placehold.co/200x200?text=BS",
    text: "The SaaS platform developed by Kawasan Digital has revolutionized how we manage our educational content. Their team understood our unique requirements and delivered a solution that perfectly fits our needs.",
    rating: 4
  },
  {
    name: "Maya Indah",
    title: "CTO at FinanceHub",
    avatar: "https://placehold.co/200x200?text=MI",
    text: "Exceptional service and technical expertise! Kawasan Digital helped us implement a secure and scalable financial management system. Their attention to detail and commitment to quality is outstanding.",
    rating: 5
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.span
            className="inline-block px-4 py-1.5 mb-4 text-xs md:text-sm font-medium uppercase tracking-wider text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Testimonials
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6 font-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            What Our Clients Say
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-400 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Don&apos;t just take our word for it. Here&apos;s what our clients have to say about their experience working with Kawasan Digital.
          </motion.p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <AnimatedTestimonials testimonials={testimonials} />
        </motion.div>
        
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg transform hover:scale-105 transition-all cursor-pointer">
            Become Our Next Success Story
          </div>
        </motion.div>
      </div>
    </section>
  );
} 