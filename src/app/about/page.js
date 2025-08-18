import { generateMetadata } from '@/utils/metadata';
import HeroSection from './components/HeroSection';
import OurStoryTimeline from './components/OurStoryTimeline';
import OurValues from './components/OurValues';
import LeadershipSection from './components/LeadershipSection';
import CTASection from './components/CTASection';

export const metadata = generateMetadata({
  title: 'About Kawasan Digital',
  description: 'Learn about our journey, values, and the passionate team behind Kawasan Digital. We are dedicated to transforming businesses through innovative digital solutions.',
  path: '/about',
  keywords: ['digital transformation', 'company story', 'team values', 'leadership', 'digital innovation']
});

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16 bg-white dark:bg-black">
      <HeroSection />
      <OurStoryTimeline />
      <OurValues />
      <LeadershipSection />
      <CTASection />
    </div>
  );
}
