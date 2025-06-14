"use client";

import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import Image from "next/image";

export const BentoGrid = ({ className, children }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  image,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      className={cn(
        "row-span-1 rounded-3xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 md:p-6 bg-white dark:bg-black/60 dark:border dark:border-white/[0.1] flex flex-col justify-between space-y-4",
        className
      )}
    >
      {header}
      <div className="group-hover/bento:-translate-y-2 transition duration-200">
        {icon && <div className="mb-4">{icon}</div>}
        {image && (
          <div className="w-full h-40 mb-4 relative overflow-hidden rounded-xl">
            <Image
              src={image}
              alt={title || "Image"}
              fill
              className="object-cover transition-transform duration-500 group-hover/bento:scale-110"
            />
          </div>
        )}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg md:text-xl text-black dark:text-white">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}; 