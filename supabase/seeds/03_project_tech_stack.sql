-- Seed data for company profile project tech stack
WITH project_data(title, tech_stack) AS (
    VALUES 
    ('Company Profile Sekatrans', ARRAY[
        ('WordPress', 'CMS', '6.2', 'Frontend Platform'),
        ('Elementor', 'Page Builder', '3.14', 'Design Tool'),
        ('PHP', 'Backend Language', '8.1', 'Server-side Scripting')
    ]),
    ('Company Profile Asamedia', ARRAY[
        ('WordPress', 'CMS', '6.2', 'Frontend Platform'),
        ('Elementor', 'Page Builder', '3.14', 'Design Tool'),
        ('PHP', 'Backend Language', '8.1', 'Server-side Scripting')
    ]),
    ('Company Profile Yusung Tech Indonesia', ARRAY[
        ('WordPress', 'CMS', '6.2', 'Frontend Platform'),
        ('Elementor', 'Page Builder', '3.14', 'Design Tool'),
        ('PHP', 'Backend Language', '8.1', 'Server-side Scripting')
    ]),
    ('Mobile Fin-Tech App', ARRAY[
        ('React Native', 'Mobile Framework', '0.70', 'Cross-platform Development'),
        ('Go', 'Backend Language', '1.20', 'Server-side Logic'),
        ('GraphQL', 'API Query Language', '16.1', 'Data Fetching'),
        ('AWS', 'Cloud Infrastructure', 'Latest', 'Hosting and Services')
    ])
)
INSERT INTO company_profile.project_tech_stack (
    project_id,
    tech_name,
    tech_category,
    tech_version,
    tech_role
)
SELECT 
    p.id, 
    (tech_stack).tech_name,
    (tech_stack).tech_category,
    (tech_stack).tech_version,
    (tech_stack).tech_role
FROM project_data pd,
     company_profile.projects p,
     unnest(pd.tech_stack) AS tech_stack
WHERE p.title = pd.title;