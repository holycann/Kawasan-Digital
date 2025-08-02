-- Seed data for company profile project stories
WITH project_data AS (
    SELECT 
        p.id AS project_id,
        CASE p.title
            WHEN 'Company Profile Sekatrans' THEN ARRAY[
                jsonb_build_object(
                    'story_section', 'whyWeBuilt',
                    'story_content', '{
                        "description": "SekaTrans needed a modern and professional website to showcase their car rental services and make it easy for customers to book vehicles. They wanted a platform that could display their fleet, services, and customer testimonials with an attractive and user-friendly design."
                    }'::JSONB,
                    'story_type', 'Project Motivation',
                    'story_impact', '{
                        "clientNeed": "Digital Transformation",
                        "strategicGoals": ["Improve Online Presence", "Simplify Booking Process"]
                    }'::JSONB
                ),
                jsonb_build_object(
                    'story_section', 'problemsSolved',
                    'story_content', '{
                        "problems": [
                            "No online presence for car rental services",
                            "Difficult booking process for customers", 
                            "Lack of fleet showcase and service information",
                            "No system to display customer testimonials and reviews"
                        ]
                    }'::JSONB,
                    'story_type', 'Challenge Resolution',
                    'story_impact', '{
                        "challengeComplexity": "High",
                        "solutionInnovation": ["Integrated Booking System", "Comprehensive Showcase"]
                    }'::JSONB
                ),
                jsonb_build_object(
                    'story_section', 'performanceResults',
                    'story_content', '{
                        "performanceScore": 98,
                        "loadTime": "0.8s",
                        "accessibility": 99
                    }'::JSONB,
                    'story_type', 'Technical Performance',
                    'story_impact', '{
                        "performanceMetrics": ["Fast Load Time", "High Accessibility"],
                        "technicalAchievements": ["Optimized Codebase", "Responsive Design"]
                    }'::JSONB
                ),
                jsonb_build_object(
                    'story_section', 'clientResults',
                    'story_content', '{
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
                    }'::JSONB,
                    'story_type', 'Business Impact',
                    'story_impact', '{
                        "businessGrowth": ["Increased Bookings", "Customer Retention"],
                        "marketPositioning": ["Enhanced Digital Presence", "Improved Customer Trust"]
                    }'::JSONB
                )
            ]
            WHEN 'Company Profile Asamedia' THEN ARRAY[
                jsonb_build_object(
                    'story_section', 'whyWeBuilt',
                    'story_content', '{
                        "description": "The client needed a modern, high-performance website that could showcase their digital services and attract potential clients. They wanted something that stood out from the competition while maintaining excellent user experience and fast loading times."
                    }'::JSONB,
                    'story_type', 'Project Motivation',
                    'story_impact', '{
                        "clientNeed": "Digital Transformation",
                        "strategicGoals": ["Improve Online Presence", "Attract Potential Clients"]
                    }'::JSONB
                ),
                jsonb_build_object(
                    'story_section', 'problemsSolved',
                    'story_content', '{
                        "problems": [
                            "Slow loading times and poor mobile experience",
                            "Outdated design that didn''t reflect modern standards",
                            "Lack of clear call-to-action and lead generation",
                            "Poor SEO optimization and search visibility"
                        ]
                    }'::JSONB,
                    'story_type', 'Challenge Resolution',
                    'story_impact', '{
                        "challengeComplexity": "High",
                        "solutionInnovation": ["Responsive Design", "SEO Optimization"]
                    }'::JSONB
                ),
                jsonb_build_object(
                    'story_section', 'performanceResults',
                    'story_content', '{
                        "performanceScore": 95,
                        "loadTime": "1.2s",
                        "accessibility": 98
                    }'::JSONB,
                    'story_type', 'Technical Performance',
                    'story_impact', '{
                        "performanceMetrics": ["Improved Load Time", "High Accessibility"],
                        "technicalAchievements": ["Responsive Implementation", "Performance Optimization"]
                    }'::JSONB
                ),
                jsonb_build_object(
                    'story_section', 'clientResults',
                    'story_content', '{
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
                    }'::JSONB,
                    'story_type', 'Business Impact',
                    'story_impact', '{
                        "businessGrowth": ["Increased Traffic", "Lead Generation"],
                        "marketPositioning": ["Enhanced Digital Presence", "Improved User Engagement"]
                    }'::JSONB
                )
            ]
            WHEN 'Company Profile Yusung Tech Indonesia' THEN ARRAY[
                jsonb_build_object(
                    'story_section', 'whyWeBuilt',
                    'story_content', '{
                        "description": "Yusung Tech Indonesia needed a modern and professional company profile website to showcase their flagship products in biometric security solutions. The website needed to display various products such as SUPREMA, CMITECH, SECURE TOP, SOLITY, and LINKMAN with an attractive layout and easy navigation."
                    }'::JSONB,
                    'story_type', 'Project Motivation',
                    'story_impact', '{
                        "clientNeed": "Product Showcase",
                        "strategicGoals": ["Highlight Biometric Solutions", "Improve Online Visibility"]
                    }'::JSONB
                ),
                jsonb_build_object(
                    'story_section', 'problemsSolved',
                    'story_content', '{
                        "problems": [
                            "Old website that was not responsive and difficult to access on mobile",
                            "No attractive product showcase for SUPREMA, CMITECH, and other products",
                            "Lack of detailed information about biometric product advantages",
                            "No system to display client references and testimonials"
                        ]
                    }'::JSONB,
                    'story_type', 'Challenge Resolution',
                    'story_impact', '{
                        "challengeComplexity": "High",
                        "solutionInnovation": ["Product Showcase", "Responsive Design"]
                    }'::JSONB
                ),
                jsonb_build_object(
                    'story_section', 'performanceResults',
                    'story_content', '{
                        "performanceScore": 92,
                        "loadTime": "1.5s",
                        "accessibility": 96
                    }'::JSONB,
                    'story_type', 'Technical Performance',
                    'story_impact', '{
                        "performanceMetrics": ["Responsive Performance", "Accessibility"],
                        "technicalAchievements": ["Product Gallery", "Mobile Optimization"]
                    }'::JSONB
                ),
                jsonb_build_object(
                    'story_section', 'clientResults',
                    'story_content', '{
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
                    }'::JSONB,
                    'story_type', 'Business Impact',
                    'story_impact', '{
                        "businessGrowth": ["Increased Product Visibility", "Customer Engagement"],
                        "marketPositioning": ["Enhanced Digital Presence", "Product Showcase"]
                    }'::JSONB
                )
            ]
            WHEN 'Mobile Fin-Tech App' THEN ARRAY[
                jsonb_build_object(
                    'story_section', 'whyWeBuilt',
                    'story_content', '{
                        "description": "Kawasan Digital engineered a secure, compliant mobile app enabling users to invest spare change automatically while providing real-time payment transfers and budgeting tools."
                    }'::JSONB,
                    'story_type', 'Project Motivation',
                    'story_impact', '{
                        "clientNeed": "Financial Innovation",
                        "strategicGoals": ["Micro-Investments", "Instant Payments"]
                    }'::JSONB
                )
            ]
        END AS stories
    FROM company_profile.projects p
)

INSERT INTO company_profile.project_stories (
    project_id,
    story_section,
    story_content,
    story_type,
    story_impact
)
SELECT
    project_id,
    h ->> 'story_section',
    h -> 'story_content',
    h ->> 'story_type',
    h -> 'story_impact'
FROM project_data,
LATERAL unnest(stories) AS h;