"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/utils/cn";

export const AnimatedTabs = ({
  tabs,
  activeTab,
  setActiveTab,
  containerClassName,
  tabsContainerClassName,
  contentContainerClassName,
}) => {
  const [hoveredTab, setHoveredTab] = useState(null);
  const tabRefs = useRef([]);

  useEffect(() => {
    tabRefs.current = tabRefs.current.slice(0, tabs.length);
  }, [tabs.length]);

  return (
    <div className={cn("w-full", containerClassName)}>
      <div className={cn("relative flex items-center justify-center p-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 shadow-input", tabsContainerClassName)}>
        {tabs.map((tab, idx) => {
          return (
            <button
              key={`tab-${tab.id || idx}`}
              ref={(el) => (tabRefs.current[idx] = el)}
              className={cn(
                "relative z-10 px-4 py-2 rounded-full text-sm md:text-base font-medium transition-colors",
                activeTab === tab.id
                  ? "text-black dark:text-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              )}
              onMouseEnter={() => setHoveredTab(tab.id)}
              onMouseLeave={() => setHoveredTab(null)}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
        <AnimatePresence>
          {hoveredTab !== null && hoveredTab !== activeTab && (
            <motion.div
              key={`hovered-pill-${hoveredTab}`}
              className="absolute rounded-full bg-gray-200/50 dark:bg-gray-800/50 backdrop-blur-sm z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              style={{
                width: tabRefs.current[tabs.findIndex((t) => t.id === hoveredTab)]?.offsetWidth,
                height: tabRefs.current[tabs.findIndex((t) => t.id === hoveredTab)]?.offsetHeight,
                left: tabRefs.current[tabs.findIndex((t) => t.id === hoveredTab)]?.offsetLeft,
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            />
          )}
        </AnimatePresence>
        <motion.div
          key={`active-pill-${activeTab}`}
          className="absolute rounded-full bg-gradient-to-r from-blue-600/80 to-purple-600/80 backdrop-blur-sm shadow-lg z-0"
          animate={{
            width: tabRefs.current[tabs.findIndex((t) => t.id === activeTab)]?.offsetWidth,
            left: tabRefs.current[tabs.findIndex((t) => t.id === activeTab)]?.offsetLeft,
          }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          style={{
            height: tabRefs.current[tabs.findIndex((t) => t.id === activeTab)]?.offsetHeight,
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        />
      </div>
      <div className={cn("mt-6", contentContainerClassName)}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${activeTab}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {tabs.find((tab) => tab.id === activeTab)?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}; 