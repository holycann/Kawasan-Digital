-- Seed data for company profile tech stack
INSERT INTO company_profile.tech_stack (
    id,
    tech_name,
    tech_category,
    tech_version,
    tech_role
) VALUES 
(
    uuid_generate_v4(),
    'WordPress',
    'CMS',
    '6.2',
    'Frontend Platform'
),
(
    uuid_generate_v4(),
    'Elementor',
    'Page Builder',
    '3.14',
    'UI Design Tool'
),
(
    uuid_generate_v4(),
    'PHP',
    'Backend Language',
    '8.2',
    'Server-side Scripting'
),
(
    uuid_generate_v4(),
    'React Native',
    'Mobile Framework',
    '0.70',
    'Cross-platform Development'
),
(
    uuid_generate_v4(),
    'Next.js',
    'Frontend Framework',
    '13.4',
    'Web Application Development'
),
(
    uuid_generate_v4(),
    'Go',
    'Backend Language',
    '1.20',
    'Server-side Logic'
),
(
    uuid_generate_v4(),
    'GraphQL',
    'API Query Language',
    '16.1',
    'Data Fetching'
),
(
    uuid_generate_v4(),
    'AWS',
    'Cloud Infrastructure',
    'Latest',
    'Hosting and Services'
); 