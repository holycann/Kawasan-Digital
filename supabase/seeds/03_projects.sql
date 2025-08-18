-- Seed data for company profile projects
WITH
    client_data AS (
        SELECT id, name
        FROM company_profile.clients
        WHERE
            name IN (
                'SekaTrans',
                'Asa Media',
                'Yusung Tech Indonesia',
                'Kawasan Digital'
            )
    )
INSERT INTO
    company_profile.projects (
        title,
        short_description,
        description,
        cover_image,
        year,
        category_id,
        client_id,
        website_url,
        status,
        highlights
    )
VALUES (
    'Company Profile Sekatrans',
    'Professional car rental service website with modern booking system and fleet management.',
    'Designed and developed a comprehensive car rental website for SekaTrans, featuring easy booking system, fleet showcase, and customer testimonials. The website showcases their reliable transportation services with professional design and user-friendly interface.',
    'https://ywfdovvqqgeyrwinhmsj.supabase.co/storage/v1/object/public/projects/company_profile/images/projects/company-profile-sekatrans/cover.png',
    2025,
    (
        SELECT id
        FROM company_profile.project_categories
        WHERE
            name = 'Web Development'
    ),
    (
        SELECT id
        FROM client_data
        WHERE
            name = 'SekaTrans'
    ),
    'https://sekatrans.com/',
    'Completed',
    ARRAY[
        'Responsive design for all devices',
        'Optimized for performance and SEO', 
        'Modern UI/UX with attention to detail'
    ]
),
(
    'Company Profile Asamedia',
    'Official website of Asa Media, a creative digital agency offering web development and branding services.',
    'We transformed the client''s outdated site into a performant marketing engine with headless CMS, internationalisation, and SEO enhancements that boosted organic traffic by 150 %.',
    'https://ywfdovvqqgeyrwinhmsj.supabase.co/storage/v1/object/public/projects/company_profile/images/projects/company-profile-asamedia/cover.png',
    2024,
    (
        SELECT id
        FROM company_profile.project_categories
        WHERE
            name = 'Web Development'
    ),
    (
        SELECT id
        FROM client_data
        WHERE
            name = 'Asa Media'
    ),
    'https://asamedia.id/',
    'Completed',
    ARRAY[
        'Responsive design for all devices',
        'Optimized for performance and SEO', 
        'Modern UI/UX with attention to detail'
    ]
),
(
    'Company Profile Yusung Tech Indonesia',
    'Responsive company profile website for an automotive and AIoT-based product manufacturer.',
    'Designed and developed a modern company profile website for Yusung Tech Indonesia, a manufacturer specializing in automotive components and AIoT-based solutions. The website showcases the company''s technological innovations, product catalog, and global quality certifications in a responsive and professional layout.',
    'https://ywfdovvqqgeyrwinhmsj.supabase.co/storage/v1/object/public/projects/company_profile/images/projects/company-profile-yusung-tech-indonesia/cover.png',
    2024,
    (
        SELECT id
        FROM company_profile.project_categories
        WHERE
            name = 'Web Development'
    ),
    (
        SELECT id
        FROM client_data
        WHERE
            name = 'Yusung Tech Indonesia'
    ),
    'https://yusungtechindonesia.com/',
    'Completed',
    ARRAY[
        'Responsive design for all devices',
        'Optimized for performance and SEO', 
        'Modern UI/UX with attention to detail'
    ]
),
(
    'Mobile Fin-Tech App',
    'Cross-platform app offering micro-investments and instant payments.',
    'Kawasan Digital engineered a secure, compliant mobile app enabling users to invest spare change automatically while providing real-time payment transfers and budgeting tools.',
    'https://placehold.co/600x400?text=Fintech+App',
    2022,
    (
        SELECT id
        FROM company_profile.project_categories
        WHERE
            name = 'App Development'
    ),
    (
        SELECT id
        FROM client_data
        WHERE
            name = 'Kawasan Digital'
    ),
    NULL,
    'In Progress',
    ARRAY[
        'Cross-platform mobile application',
        'Secure financial transactions',
        'Micro-investment features'
    ]
);