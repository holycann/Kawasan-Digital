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
            { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
            { url: '/favicon/favicon.ico', type: 'image/x-icon' }
        ],
        apple: [
            { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
        ],
        android: [
            { url: '/favicon/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
            { url: '/favicon/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }
        ],
        shortcut: '/favicon/favicon.ico',
        manifest: '/favicon/site.webmanifest'
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