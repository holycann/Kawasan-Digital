-- Seed data for company profile project highlights
WITH project_data(title, highlights) AS (
    VALUES 
    ('Company Profile Sekatrans', ARRAY[
        ('Responsive design for all devices', 'UI/UX', 'Enhanced User Experience', '{
            "deviceCoverage": "100%",
            "responsiveBreakpoints": 5
        }'::JSONB),
        ('Optimized for performance and SEO', 'Performance', 'Improved Search Rankings', '{
            "pageSpeedScore": 98,
            "seoImprovementPercentage": 75
        }'::JSONB),
        ('Modern UI/UX with attention to detail', 'Design', 'Increased User Engagement', '{
            "userSatisfactionRate": 95,
            "designAwards": 2
        }'::JSONB)
    ]),
    ('Company Profile Asamedia', ARRAY[
        ('Responsive design for all devices', 'UI/UX', 'Enhanced User Experience', '{
            "deviceCoverage": "100%",
            "responsiveBreakpoints": 5
        }'::JSONB),
        ('Optimized for performance and SEO', 'Performance', 'Improved Search Rankings', '{
            "pageSpeedScore": 95,
            "seoImprovementPercentage": 70
        }'::JSONB),
        ('Modern UI/UX with attention to detail', 'Design', 'Increased User Engagement', '{
            "userSatisfactionRate": 95,
            "designAwards": 1
        }'::JSONB)
    ]),
    ('Company Profile Yusung Tech Indonesia', ARRAY[
        ('Responsive design for all devices', 'UI/UX', 'Enhanced User Experience', '{
            "deviceCoverage": "100%",
            "responsiveBreakpoints": 5
        }'::JSONB),
        ('Optimized for performance and SEO', 'Performance', 'Improved Search Rankings', '{
            "pageSpeedScore": 92,
            "seoImprovementPercentage": 65
        }'::JSONB),
        ('Modern UI/UX with attention to detail', 'Design', 'Increased User Engagement', '{
            "userSatisfactionRate": 90,
            "designAwards": 1
        }'::JSONB)
    ]),
    ('Mobile Fin-Tech App', ARRAY[]::TEXT[])
)
INSERT INTO company_profile.project_highlights (
    project_id,
    highlight_text,
    highlight_type,
    highlight_impact,
    highlight_metrics
)
SELECT 
    p.id, 
    (highlights).highlight_text,
    (highlights).highlight_type,
    (highlights).highlight_impact,
    (highlights).highlight_metrics
FROM project_data pd,
     company_profile.projects p,
     unnest(pd.highlights) AS highlights
WHERE p.title = pd.title;