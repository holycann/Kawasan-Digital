"use client";

import Hero from "../components/hero/Hero";
import ServicesSection from "../components/services/ServicesSection";
import AboutSection from "../components/about/AboutSection";
import TestimonialsSection from "../components/testimonials/TestimonialsSection";
import ContactSection from "../components/contact/ContactSection";
import { useEffect } from "react";
import SmoothScroll from "@/components/ui/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="min-h-screen">
        <Hero />
        <ServicesSection />
        <AboutSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
    </SmoothScroll>
  );
}
