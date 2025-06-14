import Hero from "../components/hero/Hero";
import ServicesSection from "../components/services/ServicesSection";
import AboutSection from "../components/about/AboutSection";
import TestimonialsSection from "../components/testimonials/TestimonialsSection";
import ContactSection from "../components/contact/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
