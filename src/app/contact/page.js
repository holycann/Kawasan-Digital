import ContactSection from "../components/ContactSection";

export const metadata = {
  title: "Contact Us - Kawasan Digital",
  description: "Get in touch with the Kawasan Digital team to discuss your project or learn more about our services.",
};

export default function ContactPage() {
  return (
    <div className="pt-24 pb-16 bg-white dark:bg-black min-h-screen">
      <ContactSection />
    </div>
  );
}