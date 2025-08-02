-- Seed data for company profile project highlights
WITH project_data AS (
    SELECT 
        p.id AS project_id,
        p.title,
        ARRAY[
            jsonb_build_object(
                'highlight_text', 'Responsive design for all devices',
                'highlight_type', 'UI/UX',
                'highlight_impact', 'Enhanced User Experience',
                'highlight_metrics', jsonb_build_object('deviceCoverage', '100%', 'responsiveBreakpoints', 5)
            ),
            jsonb_build_object(
                'highlight_text', 'Optimized for performance and SEO',
                'highlight_type', 'Performance',
                'highlight_impact', 'Improved Search Rankings',
                'highlight_metrics', jsonb_build_object('pageSpeedScore', 98, 'seoImprovementPercentage', 75)
            ),
            jsonb_build_object(
                'highlight_text', 'Modern UI/UX with attention to detail',
                'highlight_type', 'Design',
                'highlight_impact', 'Increased User Engagement',
                'highlight_metrics', jsonb_build_object('userSatisfactionRate', 95, 'designAwards', 2)
            )
        ] AS highlights
    FROM company_profile.projects p
)

INSERT INTO company_profile.project_highlights (
    project_id,
    highlight_text,
    highlight_type,
    highlight_impact,
    highlight_metrics
)
SELECT
    project_id,
    h ->> 'highlight_text',
    h ->> 'highlight_type',
    h ->> 'highlight_impact',
    h -> 'highlight_metrics'
FROM project_data,
LATERAL unnest(highlights) AS h;