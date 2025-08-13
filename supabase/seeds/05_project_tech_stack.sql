-- Seed data for company profile project tech stack
WITH project_data(title, tech_names) AS (
    VALUES 
    ('Company Profile Sekatrans', ARRAY['WordPress', 'Elementor', 'PHP']),
    ('Company Profile Asamedia', ARRAY['WordPress', 'Elementor', 'PHP']),
    ('Company Profile Yusung Tech Indonesia', ARRAY['WordPress', 'Elementor', 'PHP']),
    ('Mobile Fin-Tech App', ARRAY['React Native', 'Go', 'GraphQL', 'AWS'])
),
tech_data AS (
    SELECT 
        p.id AS project_id, 
        t.id AS tech_id
    FROM company_profile.projects p
    CROSS JOIN company_profile.tech_stack t
    WHERE 
        (p.title = 'Company Profile Sekatrans' AND t.tech_name IN ('WordPress', 'Elementor', 'PHP')) OR
        (p.title = 'Company Profile Asamedia' AND t.tech_name IN ('WordPress', 'Elementor', 'PHP')) OR
        (p.title = 'Company Profile Yusung Tech Indonesia' AND t.tech_name IN ('WordPress', 'Elementor', 'PHP')) OR
        (p.title = 'Mobile Fin-Tech App' AND t.tech_name IN ('React Native', 'Go', 'GraphQL', 'AWS'))
)
INSERT INTO company_profile.project_tech_stack (
    project_id,
    tech_id
)
SELECT 
    project_id, 
    tech_id
FROM tech_data;