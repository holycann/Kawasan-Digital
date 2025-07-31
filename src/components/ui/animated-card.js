"use client";

import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export const AnimatedCard = ({
  className,
  children,
  containerClassName,
  imageUrl,
  hoverEffect = true,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
      viewport={{ once: true }}
      className={cn(
        "relative overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300",
        hoverEffect && "group cursor-pointer hover:-translate-y-1",
        containerClassName
      )}
    >
      {imageUrl && (
        <div className="absolute inset-0 z-0">
          <img
            src={imageUrl}
            alt="Background"
            className="w-full h-full object-cover object-center opacity-10 group-hover:opacity-15 transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-gray-900" />
        </div>
      )}
      <div className={cn("relative z-10", className)}>{children}</div>
    </motion.div>
  );
};

export const AnimatedCardHoverEffect = ({
  items,
  className,
  cardClassName,
  renderItem,
}) => {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4", className)}>
      {items.map((item, idx) => (
        <AnimatedCard
          key={item.id || idx}
          containerClassName={cn(
            "col-span-1 h-full",
            cardClassName
          )}
          hoverEffect={true}
        >
          {renderItem(item)}
        </AnimatedCard>
      ))}
    </div>
  );
};

export const FeatureCard = ({ icon, title, description }) => {
  return (
    <AnimatedCard containerClassName="h-full">
      <div className="p-6 flex flex-col h-full">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-full w-12 h-12 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 flex-1">{description}</p>
      </div>
    </AnimatedCard>
  );
}; 