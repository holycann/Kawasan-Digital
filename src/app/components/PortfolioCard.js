"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card3D, CardImage, CardContent } from "../../components/ui/3d-card";
import { FaArrowRight } from "react-icons/fa6";
import { cn } from "../../utils/cn";

export default function PortfolioCard({ item, className = "" }) {
  return (
    <Card3D
      containerClassName={cn("h-full", className)}
      className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 h-full flex flex-col"
    >
      {/* Cover image */}
      <CardImage
        src={item.coverImage}
        alt={item.title}
      />

      {/* Content */}
      <CardContent className="flex flex-col flex-1">
        <div className="mb-2 flex items-center gap-2">
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
            {item.category}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {item.year}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold mb-2">
          {item.title}
        </h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-1">
          {item.shortDescription}
        </p>
        
        <div className="mt-auto">
          <Link
            href={`/portfolio/${item.id}`}
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