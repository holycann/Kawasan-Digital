import SITE_CONFIG, { generateMetadata } from "@/utils/metadata";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Hero from "./components/Hero";
import ServicesSection from "./components/ServicesSection";
import TechStackSection from "./components/TechStackSection";
import TestimonialsSection from "./components/TestimonialsSection";

export const metadata = generateMetadata({
  title: SITE_CONFIG.defaultTitle,
  description: SITE_CONFIG.defaultDescription,
  path: "/",
  keywords: SITE_CONFIG.keywords
});

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ServicesSection />
      <AboutSection />
      <TechStackSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  );
}
