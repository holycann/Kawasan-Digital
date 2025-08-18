// Base configuration for the entire site
const SITE_CONFIG = {
    name: 'Kawasan Digital',
    defaultTitle: 'Kawasan Digital - Digital Innovation Partner',
    defaultDescription: 'Transforming businesses through cutting-edge digital solutions. We specialize in web development, mobile apps, cloud services, AI integration, and innovative UI/UX design.',
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
                url: '/logo.png',
                width: 1200,
                height: 630,
                alt: 'Kawasan Digital logo'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Kawasan Digital - Digital Innovation Partner',
        description: 'Transforming businesses through cutting-edge digital solutions.',
        images: ['/logo.png']
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

// Metadata Generator
export function generateMetadata(options = {}) {
    const {
        title,
        description,
        keywords = [],
        path = '',
        image = '/logo.png',
        noIndex = false
    } = options;

    // Merge custom keywords with default keywords
    const mergedKeywords = [...new Set([...SITE_CONFIG.keywords, ...keywords])];

    // Construct title (custom title or fallback to default)
    const pageTitle = title
        ? `${title} | ${SITE_CONFIG.name}`
        : SITE_CONFIG.defaultTitle;

    // Construct description (custom description or fallback to default)
    const pageDescription = description || SITE_CONFIG.defaultDescription;

    // Construct canonical URL
    const canonicalUrl = path
        ? `${SITE_CONFIG.openGraph.url}${path.startsWith('/') ? path : `/${path}`}`
        : SITE_CONFIG.openGraph.url;

    return {
        title: pageTitle,
        description: pageDescription,
        keywords: mergedKeywords,
        authors: SITE_CONFIG.authors,
        creator: SITE_CONFIG.creator,
        publisher: SITE_CONFIG.publisher,
        robots: noIndex ? 'noindex, nofollow' : SITE_CONFIG.robots,
        alternates: {
            canonical: canonicalUrl
        },
        openGraph: {
            ...SITE_CONFIG.openGraph,
            title: pageTitle,
            description: pageDescription,
            url: canonicalUrl,
            images: [{
                url: image.startsWith('http') ? image : `/public${image.startsWith('/') ? image : `/${image}`}`,
                width: 1200,
                height: 630,
                alt: pageTitle
            }]
        },
        twitter: {
            ...SITE_CONFIG.twitter,
            title: pageTitle,
            description: pageDescription,
            images: [image]
        },
        icons: SITE_CONFIG.icons
    };
}

export default SITE_CONFIG;