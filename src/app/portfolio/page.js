import { generateMetadata } from '@/utils/metadata';
import dynamic from 'next/dynamic';

import HeroSection from './components/HeroSection';
import DecorativeBackground from './components/DecorativeBackground';
import PortfolioTabs from './components/PortfolioTabs';
import StatsSection from './components/StatsSection';

const Spotlight = dynamic(() => import('@/components/ui/spotlight').then((mod) => mod.Spotlight), {
  loading: () => <div className="w-full h-full bg-transparent"></div>,
  ssr: true,
});

export const metadata = generateMetadata({
  title: 'Our Portfolio',
  description: 'Explore our diverse range of digital projects showcasing innovation, creativity, and technical expertise across various industries.',
  path: '/portfolio',
  keywords: ['digital projects', 'web development portfolio', 'mobile app showcase', 'technology solutions']
});

export default function PortfolioPage() {
  return (
    <section className="pt-24 pb-16 bg-white dark:bg-black min-h-screen relative overflow-hidden">
      {/* 3D decorative elements */}
      <DecorativeBackground />

      <Spotlight
        className="max-w-7xl mx-auto px-4 md:px-6 relative z-10"
        fill="rgba(59, 130, 246, 0.15)"
      >
        <HeroSection />
        <PortfolioTabs />
      </Spotlight>

      {/* Stats section */}
      <StatsSection />
    </section>
  );
} 