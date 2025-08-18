import { use } from "react";
import { deslugify } from "@/utils/slugify";
import { generateMetadata as generateSiteMetadata } from '@/utils/metadata';

import PortfolioDetailContent from './components/PortfolioDetailContent';

export async function generateMetadata({ params }) {
  const { name } = params;
  const projectName = deslugify(name);

  return generateSiteMetadata({
    title: projectName,
    description: `Explore the details of our ${projectName} project, showcasing our innovative digital solutions and technical expertise.`,
    path: `/portfolio/${name}`,
    keywords: ['digital project', 'case study', 'web development', 'technology solution']
  });
}

export default function PortfolioDetail({ params }) {
  const { name } = use(params);

  return <PortfolioDetailContent name={name} />;
} 
