-- Seed data for company profile projects
INSERT INTO company_profile.projects (
    id,
    title,
    short_description,
    description,
    cover_image,
    year,
    category,
    website_url,
    client_name,
    client_industry,
    project_location,
    project_status
)
VALUES (
    uuid_generate_v4(),
    'Company Profile Sekatrans',
    'Professional car rental service website with modern booking system and fleet management.',
    'Designed and developed a comprehensive car rental website for SekaTrans, featuring easy booking system, fleet showcase, and customer testimonials. The website showcases their reliable transportation services with professional design and user-friendly interface.',
    '/Portfolio2.png',
    2025,
    (
        SELECT id
        FROM company_profile.project_categories
        WHERE name = 'Web Development'
    ),
    'https://sekatrans.com/',
    'SekaTrans',
    'Transportation Services',
    'Indonesia',
    'Completed'
),
(
    uuid_generate_v4(),
    'Company Profile Asamedia',
    'Official website of Asa Media, a creative digital agency offering web development and branding services.',
    'We transformed the client''s outdated site into a performant marketing engine with headless CMS, internationalisation, and SEO enhancements that boosted organic traffic by 150 %.',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz5SS9RHF_2xs1_ORWe4WwgZvuEPTPGX_K_yKgrrqB3s3GQwJwImDRHj8yMSEpQeQRhoY&usqp=CAU',
    2024,
    (
        SELECT id
        FROM company_profile.project_categories
        WHERE name = 'Web Development'
    ),
    'https://asamedia.id/',
    'Asa Media',
    'Digital Agency',
    'Indonesia',
    'Completed'
),
(
    uuid_generate_v4(),
    'Company Profile Yusung Tech Indonesia',
    'Responsive company profile website for an automotive and AIoT-based product manufacturer.',
    'Designed and developed a modern company profile website for Yusung Tech Indonesia, a manufacturer specializing in automotive components and AIoT-based solutions. The website showcases the company''s technological innovations, product catalog, and global quality certifications in a responsive and professional layout.',
    '/Portfolio1.png',
    2024,
    (
        SELECT id
        FROM company_profile.project_categories
        WHERE name = 'Web Development'
    ),
    'https://yusungtechindonesia.com/',
    'Yusung Tech Indonesia',
    'Automotive Technology',
    'Indonesia',
    'Completed'
),
(
    uuid_generate_v4(),
    'Mobile Fin-Tech App',
    'Cross-platform app offering micro-investments and instant payments.',
    'Kawasan Digital engineered a secure, compliant mobile app enabling users to invest spare change automatically while providing real-time payment transfers and budgeting tools.',
    'https://placehold.co/600x400?text=Fintech+App',
    2022,
    (
        SELECT id
        FROM company_profile.project_categories
        WHERE name = 'App Development'
    ),
    NULL,
    'Kawasan Digital',
    'Financial Technology',
    'Indonesia',
    'In Progress'
);