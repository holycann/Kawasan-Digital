"use client";

import Hero from "./components/Hero";
import ServicesSection from "./components/ServicesSection";
import AboutSection from "./components/AboutSection";
import TestimonialsSection from "./components/TestimonialsSection";
import ContactSection from "./components/ContactSection";
import { usePerformanceMetrics, logPerformanceMetrics } from "../hooks/performance";
import { useEffect } from "react";

export default function Home() {
  const performanceMetrics = usePerformanceMetrics();

  useEffect(() => {
    // Check if all metrics have been collected
    const allMetricsCollected = Object.values(performanceMetrics).every(metric => metric !== null);

    if (allMetricsCollected) {
      logPerformanceMetrics(performanceMetrics);
    }
  }, [performanceMetrics]);

  return (
    <main className="min-h-screen">
      <Hero />
      <ServicesSection />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  );
}
