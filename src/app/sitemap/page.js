"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Spotlight } from "@/components/ui/spotlight";
import { FaHome, FaInfoCircle, FaBriefcase, FaFolder, FaEnvelope, FaFileAlt, FaShieldAlt } from "react-icons/fa";

export default function SitemapPage() {
  const siteLinks = [
    {
      title: "Main Pages",
      links: [
        { name: "Home", href: "/", icon: <FaHome /> },
        { name: "About Us", href: "/about", icon: <FaInfoCircle /> },
        { name: "Services", href: "/services", icon: <FaBriefcase /> },
        { name: "Portfolio", href: "/portfolio", icon: <FaFolder /> },
        { name: "Contact", href: "/contact", icon: <FaEnvelope /> },
      ],
    },
    {
      title: "Legal Pages",
      links: [
        { name: "Privacy Policy", href: "/privacy-policy", icon: <FaShieldAlt /> },
        { name: "Terms of Service", href: "/terms-of-service", icon: <FaFileAlt /> },
        { name: "Sitemap", href: "/sitemap", icon: <FaFileAlt /> },
      ],
    },
    {
      title: "Services",
      links: [
        { name: "Mobile App Development", href: "/services#mobile-app" },
        { name: "Website Development", href: "/services#website" },
        { name: "SaaS Solutions", href: "/services#saas" },
        { name: "API Development", href: "/services#api" },
        { name: "Database Solutions", href: "/services#database" },
        { name: "Automation & Bots", href: "/services#automation" },
      ],
    },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6 font-heading"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Sitemap
          </motion.h1>
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            A complete overview of all the pages available on our website
          </motion.p>
        </div>

        <Spotlight className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteLinks.map((section, idx) => (
              <motion.div
                key={section.title}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
              >
                <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                  {section.title}
                </h2>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {link.icon && <span className="text-blue-600 dark:text-blue-400">{link.icon}</span>}
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Spotlight>
      </div>
    </section>
  );
} 