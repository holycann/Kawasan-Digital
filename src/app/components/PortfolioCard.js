"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Card3D, CardImage, CardContent } from "../../components/ui/3d-card";
import { FaArrowRight } from "react-icons/fa6";
import { cn } from "../../utils/cn";
import { slugify } from "@/utils/slugify";

export default function PortfolioCard({ item }) {
  // Debug log
  console.log('🎴 PortfolioCard rendering with item:', item);
  
  // Generate slug from title if slug doesn't exist
  const slug = item.slug || item.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link href={`/portfolio/${slug}`} className="block">
        {/* Cover Image */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={item.cover_image || '/Portfolio1.png'}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
          <div className="hidden absolute inset-0 items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
            <span className="text-4xl font-bold">{item.title.charAt(0)}</span>
          </div>
        </div>

      {/* Content */}
      <CardContent className="flex flex-col flex-1 justify-center items-center">
        <div className="mb-2 flex items-center gap-2">
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
            {item.category.name}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {item.year}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold mb-2">
          {item.title}
        </h3>
        
        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-4 flex-1">
          {item.short_description}
        </p>
        
        <div className="mt-auto ">
          <Link
            href={`/portfolio/${slugify(item.title)}`}
            key={`link-${item.id}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
          >
            View Project
            <FaArrowRight size={12} />
          </Link>
        </div>
      </CardContent>
    </Card3D>
  );
}