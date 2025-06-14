"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaTwitter, FaLinkedin, FaInstagram, FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const currentYear = new Date().getFullYear();

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function Footer() {
  return (
    <footer className="relative bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/5 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-tr from-purple-500/10 to-blue-500/5 blur-3xl" />
      </div>
      
      {/* Newsletter section */}
      <div className="relative border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 md:px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 font-heading"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Stay Updated with Our Latest News
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-400 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Subscribe to our newsletter to receive updates on our latest projects, industry insights, and company news.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg transform hover:scale-105 transition-all">
                Subscribe
              </button>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Main footer content */}
      <div className="relative container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/" className="inline-block mb-6">
                <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text font-heading">
                  Kawasan Digital
                </span>
              </Link>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                We specialize in digital innovation through app development, website creation, 
                and SaaS solutions. Let&apos;s transform your ideas into reality.
              </p>
              <div className="flex gap-4">
                <a href="https://twitter.com" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-500 hover:text-white transition-all">
                  <FaTwitter size={18} />
                  <span className="sr-only">Twitter</span>
                </a>
                <a href="https://linkedin.com" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-700 hover:text-white transition-all">
                  <FaLinkedin size={18} />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a href="https://instagram.com" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-pink-600 hover:text-white transition-all">
                  <FaInstagram size={18} />
                  <span className="sr-only">Instagram</span>
                </a>
                <a href="https://github.com" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-900 hover:text-white transition-all">
                  <FaGithub size={18} />
                  <span className="sr-only">GitHub</span>
                </a>
              </div>
            </motion.div>
          </div>
          
          <div className="md:col-span-2">
            <motion.div {...fadeInUp}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4 font-heading">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Careers
                  </Link>
                </li>
              </ul>
            </motion.div>
          </div>
          
          <div className="md:col-span-2">
            <motion.div {...fadeInUp}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4 font-heading">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/documentation" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </motion.div>
          </div>
          
          <div className="md:col-span-3">
            <motion.div {...fadeInUp}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4 font-heading">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <FaMapMarkerAlt className="mt-1 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-400">
                    123 Digital Street<br />
                    Tech City, TC 12345
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <FaEnvelope className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <a href="mailto:info@kawasandigital.com" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    info@kawasandigital.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <FaPhone className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <a href="tel:+6281234567890" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    +62 812 3456 7890
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {currentYear} Kawasan Digital. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 space-x-4 text-sm">
            <Link href="/privacy-policy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/sitemap" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Sitemap
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
} 