import { Metadata } from 'next/types';

// Base configuration for the entire site
const SITE_CONFIG = {
    name: 'Kawasan Digital',
    title: 'Kawasan Digital - Digital Innovation Partner',
    description: 'Transforming businesses through cutting-edge digital solutions. We specialize in web development, mobile apps, cloud services, AI integration, and innovative UI/UX design.',
    keywords: [
        'web development', 
        'mobile app development', 
        'cloud solutions', 
        'AI integration', 
        'UI/UX design', 
        'digital transformation', 
        'software engineering', 
        'technology consulting'
    ],
    authors: [
        { name: 'Kawasan Digital Team', url: 'https://kawasan.digital' }
    ],
    creator: 'Kawasan Digital',
    publisher: 'Kawasan Digital',
    robots: 'index, follow',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://kawasan.digital',
        siteName: 'Kawasan Digital',
        images: [
            {
                url: '/Logo.png',
                width: 1200,
                height: 630,
                alt: 'Kawasan Digital Logo'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Kawasan Digital - Digital Innovation Partner',
        description: 'Transforming businesses through cutting-edge digital solutions.',
        images: ['/Logo.png']
    },
    icons: {
        icon: [
            { url: '/Logo.png', type: 'image/png', sizes: '32x32' }
        ],
        shortcut: '/Logo.png',
        apple: '/Logo.png'
    }
};

// Structured Data (JSON-LD) Generator
export function generateStructuredData(type, data) {
    const baseStructure = {
        '@context': 'https://schema.org',
        '@type': type
    };

    return JSON.stringify({ ...baseStructure, ...data });
}

export default SITE_CONFIG; 