import ContactSection from "../components/ContactSection";
import { generateMetadata } from '@/utils/metadata';

export const metadata = generateMetadata({
  title: 'Contact Us',
  description: 'Get in touch with the Kawasan Digital team to discuss your project, request a consultation, or learn more about our innovative digital solutions.',
  path: '/contact',
  keywords: ['contact', 'consultation', 'digital services', 'project inquiry', 'business solutions']
});

export default function ContactPage() {
  return (
    <div className="pt-24 pb-16 bg-white dark:bg-black min-h-screen">
      <ContactSection />
    </div>
  );
}