import { generateMetadata } from '@/utils/metadata';
import HeroSection from './components/HeroSection';
import AppDevelopmentSection from './components/AppDevelopmentSection';
import WebsiteDevelopmentSection from './components/WebsiteDevelopmentSection';
import SaaSSolutionsSection from './components/SaaSSolutionsSection';
import DevelopmentProcessSection from './components/DevelopmentProcessSection';
import CTASection from './components/CTASection';

export const metadata = generateMetadata({
  title: 'Our Services',
  description: 'Explore our comprehensive digital services including app development, website design, and SaaS solutions. We transform businesses through innovative technology.',
  path: '/services',
  keywords: ['app development', 'website design', 'SaaS solutions', 'digital transformation', 'technology services']
});

export default function ServicesPage() {
    return (
        <div className="pt-24">
      <HeroSection />
      <AppDevelopmentSection />
      <WebsiteDevelopmentSection />
      <SaaSSolutionsSection />
      <DevelopmentProcessSection />
      <CTASection />
        </div>
    );
}
