"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedTitle } from "../../components/ui/animated-text";
import { cn } from "../../utils/cn";
import { TestimonialsSection as AnimatedTestimonials } from "../../components/ui/animated-testimonials";
import Image from "next/image";
import { BentoGrid } from "../../components/ui/bento-grid";
import Link from "next/link";

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
  // List of example company logos from /public
  const companyLogos = [
    { src: "/Client1.png", alt: "File", width: 120, height: 60 },
    { src: "/Client2.png", alt: "Globe", width: 60, height: 60 },
    { src: "/Client3.png", alt: "Vercel", width: 200, height: 60 },
  ];

  const [showButton, setShowButton] = useState(false);

  return (
    <section
      className="py-20 relative overflow-hidden transition-all"
    >
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
            Clients
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6 font-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Our Partners
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-400 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Several companies have entrusted their digital projects to us.
          </motion.p>
        </div>
        <div 
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setShowButton(true)}
          onMouseLeave={() => setShowButton(false)}
          onClick={() => setShowButton(true)}
        >
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-8 py-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {companyLogos.map((logo, idx) => (
              <div
                key={logo.src + idx}
                className="flex items-center justify-center w-40 h-28 rounded-xl hover:shadow-lg transition-all"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className="object-contain transition-all duration-300"
                  style={{ 
                    filter: logo.src.includes('Client1') || logo.src.includes('apple') || logo.src.includes('next') || logo.src.includes('logo') 
                      ? 'brightness(0) invert(1)' 
                      : 'none' 
                  }}
                />
              </div>
            ))}
          </motion.div>
          {/* Overlay and Button */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-20 rounded-3xl border border-blue-200/30 overflow-hidden"
            animate={{ opacity: showButton ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: showButton
                ? 'linear-gradient(135deg, rgba(55,65,81,0.7) 60%, rgba(99,102,241,0.5) 100%)'
                : 'transparent',
              backdropFilter: showButton ? 'blur(8px)' : 'none',
              WebkitBackdropFilter: showButton ? 'blur(8px)' : 'none',
              pointerEvents: showButton ? 'auto' : 'none',
            }}
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-xl shadow-lg transition-all select-none hover:scale-105"
              style={{ opacity: showButton ? 1 : 0 }}
            >
              Our Portfolio
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 