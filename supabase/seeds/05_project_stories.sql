-- Seed data for company profile project stories
WITH project_data(title, stories) AS (
    VALUES 
    ('Company Profile Sekatrans', ARRAY[
        ('whyWeBuilt', '{
            "description": "SekaTrans needed a modern and professional website to showcase their car rental services and make it easy for customers to book vehicles. They wanted a platform that could display their fleet, services, and customer testimonials with an attractive and user-friendly design."
        }'::JSONB, 'Project Motivation', '{
            "clientNeed": "Digital Transformation",
            "strategicGoals": ["Improve Online Presence", "Simplify Booking Process"]
        }'::JSONB),
        ('problemsSolved', '{
            "problems": [
                "No online presence for car rental services",
                "Difficult booking process for customers", 
                "Lack of fleet showcase and service information",
                "No system to display customer testimonials and reviews"
            ]
        }'::JSONB, 'Challenge Resolution', '{
            "challengeComplexity": "High",
            "solutionInnovation": ["Integrated Booking System", "Comprehensive Showcase"]
        }'::JSONB),
        ('performanceResults', '{
            "performanceScore": 98,
            "loadTime": "0.8s",
            "accessibility": 99
        }'::JSONB, 'Technical Performance', '{
            "performanceMetrics": ["Fast Load Time", "High Accessibility"],
            "technicalAchievements": ["Optimized Codebase", "Responsive Design"]
        }'::JSONB),
        ('clientResults', '{
            "businessImpact": [
                "300% increase in online bookings",
                "200% improvement in customer inquiries", 
                "150% increase in fleet visibility"
            ],
            "userExperience": [
                "95% user satisfaction rate",
                "80% increase in booking completion rate",
                "70% more repeat customers"
            ]
        }'::JSONB, 'Business Impact', '{
            "businessGrowth": ["Increased Bookings", "Customer Retention"],
            "marketPositioning": ["Enhanced Digital Presence", "Improved Customer Trust"]
        }'::JSONB)
    ]),
    ('Company Profile Asamedia', ARRAY[
        ('whyWeBuilt', '{
            "description": "The client needed a modern, high-performance website that could showcase their digital services and attract potential clients. They wanted something that stood out from the competition while maintaining excellent user experience and fast loading times."
        }'::JSONB, 'Project Motivation', '{
            "clientNeed": "Digital Branding",
            "strategicGoals": ["Improve Online Visibility", "Attract New Clients"]
        }'::JSONB),
        ('problemsSolved', '{
            "problems": [
                "Slow loading times and poor mobile experience",
                "Outdated design that didn''t reflect modern standards", 
                "Lack of clear call-to-action and lead generation",
                "Poor SEO optimization and search visibility"
            ]
        }'::JSONB, 'Challenge Resolution', '{
            "challengeComplexity": "High",
            "solutionInnovation": ["Responsive Design", "SEO Optimization"]
        }'::JSONB),
        ('performanceResults', '{
            "performanceScore": 95,
            "loadTime": "1.2s",
            "accessibility": 98
        }'::JSONB, 'Technical Performance', '{
            "performanceMetrics": ["Improved Load Time", "High Accessibility"],
            "technicalAchievements": ["Performance Optimization", "Mobile-First Approach"]
        }'::JSONB),
        ('clientResults', '{
            "businessImpact": [
                "300% increase in website traffic",
                "150% improvement in lead generation",
                "80% reduction in bounce rate"
            ],
            "userExperience": [
                "95% user satisfaction rate", 
                "60% increase in time on site",
                "40% more page views per session"
            ]
        }'::JSONB, 'Business Impact', '{
            "businessGrowth": ["Increased Web Traffic", "Lead Generation"],
            "marketPositioning": ["Enhanced Digital Presence", "Improved User Engagement"]
        }'::JSONB)
    ]),
    ('Company Profile Yusung Tech Indonesia', ARRAY[
        ('whyWeBuilt', '{
            "description": "Yusung Tech Indonesia needed a modern and professional company profile website to showcase their flagship products in biometric security solutions. The website needed to display various products such as SUPREMA, CMITECH, SECURE TOP, SOLITY, and LINKMAN with an attractive layout and easy navigation."
        }'::JSONB, 'Project Motivation', '{
            "clientNeed": "Product Showcase",
            "strategicGoals": ["Highlight Biometric Solutions", "Improve Product Visibility"]
        }'::JSONB),
        ('problemsSolved', '{
            "problems": [
                "Old website that was not responsive and difficult to access on mobile",
                "No attractive product showcase for SUPREMA, CMITECH, and other products",
                "Lack of detailed information about biometric product advantages", 
                "No system to display client references and testimonials"
            ]
        }'::JSONB, 'Challenge Resolution', '{
            "challengeComplexity": "High",
            "solutionInnovation": ["Product Showcase", "Responsive Design"]
        }'::JSONB),
        ('performanceResults', '{
            "performanceScore": 92,
            "loadTime": "1.5s",
            "accessibility": 96
        }'::JSONB, 'Technical Performance', '{
            "performanceMetrics": ["Improved Load Time", "High Accessibility"],
            "technicalAchievements": ["Performance Optimization", "Product Visualization"]
        }'::JSONB),
        ('clientResults', '{
            "businessImpact": [
                "200% increase in website traffic",
                "150% improvement in biometric product inquiries",
                "80% increase in engagement with product showcase"
            ],
            "userExperience": [
                "90% user satisfaction rate",
                "70% increase in time on site", 
                "60% increase in page views for product pages"
            ]
        }'::JSONB, 'Business Impact', '{
            "businessGrowth": ["Increased Product Inquiries", "User Engagement"],
            "marketPositioning": ["Enhanced Product Visibility", "Improved Customer Understanding"]
        }'::JSONB)
    ]),
    ('Mobile Fin-Tech App', ARRAY[]::JSONB[])
)
INSERT INTO company_profile.project_stories (
    project_id,
    story_section,
    story_content,
    story_order,
    story_type,
    story_impact
)
SELECT 
    p.id, 
    (stories).story_section,
    (stories).story_content,
    generate_series(1, array_length(pd.stories, 1)),
    (stories).story_type,
    (stories).story_impact
FROM project_data pd,
     company_profile.projects p,
     unnest(pd.stories) AS stories
WHERE p.title = pd.title;