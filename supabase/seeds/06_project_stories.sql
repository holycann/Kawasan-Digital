-- Seed data for company profile project stories
WITH project_data AS (
    SELECT 
        p.id AS project_id,
        CASE p.title
            WHEN 'Company Profile Sekatrans' THEN JSONB_BUILD_OBJECT(
                'whyWeBuilt', jsonb_build_object(
                    'description', 'SekaTrans needed a modern and professional website to showcase their car rental services and make it easy for customers to book vehicles. They wanted a platform that could display their fleet, services, and customer testimonials with an attractive and user-friendly design.',
                    'clientNeed', 'Digital Transformation',
                    'strategicGoals', ARRAY['Improve Online Presence', 'Simplify Booking Process']
                ),
                'problemsSolved', jsonb_build_object(
                    'problems', ARRAY[
                        'No online presence for car rental services',
                        'Difficult booking process for customers', 
                        'Lack of fleet showcase and service information',
                        'No system to display customer testimonials and reviews'
                    ],
                    'challengeComplexity', 'High',
                    'solutionInnovation', ARRAY['Integrated Booking System', 'Comprehensive Showcase']
                ),
                'developmentProcess', jsonb_build_object(
                    'planning', ARRAY[
                        'Analysis of car rental service requirements',
                        'Mapping user journey for customers booking vehicles', 
                        'Planning website structure for fleet showcase and booking'
                    ],
                    'design', ARRAY[
                        'Responsive design for fleet showcase and booking system',
                        'Implementation of service categories and testimonials',
                        'Performance optimization for loading vehicle images'
                    ],
                    'processApproach', ARRAY['User-Centric Design', 'Iterative Development'],
                    'keyMethodologies', ARRAY['Agile Methodology', 'Continuous Optimization']
                ),
                'keyFeatures', jsonb_build_object(
                    'features', ARRAY[
                        jsonb_build_object(
                            'title', 'Fleet Showcase',
                            'description', 'Displaying various car rental options with complete details and specifications.',
                            'icon', 'fleet'
                        ),
                        jsonb_build_object(
                            'title', 'Easy Booking System', 
                            'description', 'Simple and fast booking process for customers to rent vehicles.',
                            'icon', 'booking'
                        ),
                        jsonb_build_object(
                            'title', 'Service Categories',
                            'description', 'Organized service categories including daily/weekly rental, airport pickup, and special events.',
                            'icon', 'services'
                        )
                    ],
                    'featureInnovation', ARRAY['Comprehensive Service Offering', 'User-Friendly Interface'],
                    'competitiveAdvantage', ARRAY['Streamlined Booking', 'Detailed Service Information']
                ),
                'performanceResults', jsonb_build_object(
                    'performanceScore', 98,
                    'loadTime', '0.8s',
                    'accessibility', 99,
                    'performanceMetrics', ARRAY['Fast Load Time', 'High Accessibility'],
                    'technicalAchievements', ARRAY['Optimized Codebase', 'Responsive Design']
                ),
                'clientResults', jsonb_build_object(
                    'businessImpact', ARRAY[
                        '300% increase in online bookings',
                        '200% improvement in customer inquiries', 
                        '150% increase in fleet visibility'
                    ],
                    'userExperience', ARRAY[
                        '95% user satisfaction rate',
                        '80% increase in booking completion rate',
                        '70% more repeat customers'
                    ]
                )
            )
            WHEN 'Company Profile Asamedia' THEN JSONB_BUILD_OBJECT(
                'whyWeBuilt', jsonb_build_object(
                    'description', 'The client needed a modern, high-performance website that could showcase their digital services and attract potential clients. They wanted something that stood out from the competition while maintaining excellent user experience and fast loading times.',
                    'clientNeed', 'Digital Transformation',
                    'strategicGoals', ARRAY['Improve Online Presence', 'Attract Potential Clients']
                ),
                'problemsSolved', jsonb_build_object(
                    'problems', ARRAY[
                        'Slow loading times and poor mobile experience',
                        'Outdated design that did not reflect modern standards',
                        'Lack of clear call-to-action and lead generation',
                        'Poor SEO optimization and search visibility'
                    ],
                    'challengeComplexity', 'High',
                    'solutionInnovation', ARRAY['Responsive Design', 'SEO Optimization']
                ),
                'developmentProcess', jsonb_build_object(
                    'planning', ARRAY[
                        'Competitor analysis and market research',
                        'User persona development and user journey mapping',
                        'Technical requirements and architecture planning'
                    ],
                    'design', ARRAY[
                        'Wireframing and prototyping with Figma',
                        'Responsive design implementation',
                        'Performance optimization and testing'
                    ],
                    'processApproach', ARRAY['Data-Driven Design', 'User-Centric Development'],
                    'keyMethodologies', ARRAY['Design Thinking', 'Iterative Prototyping']
                ),
                'keyFeatures', jsonb_build_object(
                    'features', ARRAY[
                        jsonb_build_object(
                            'title', 'Responsive Design',
                            'description', 'Perfect experience across all devices - desktop, tablet, and mobile.',
                            'icon', 'responsive'
                        ),
                        jsonb_build_object(
                            'title', 'Fast Performance', 
                            'description', 'Optimized for speed with lazy loading and efficient code structure.',
                            'icon', 'performance'
                        ),
                        jsonb_build_object(
                            'title', 'SEO Optimized',
                            'description', 'Built with SEO best practices for better search engine visibility.',
                            'icon', 'seo'
                        )
                    ],
                    'featureInnovation', ARRAY['Cross-Device Compatibility', 'Performance Optimization'],
                    'competitiveAdvantage', ARRAY['Technical Excellence', 'Search Engine Visibility']
                ),
                'performanceResults', jsonb_build_object(
                    'performanceScore', 95,
                    'loadTime', '1.2s',
                    'accessibility', 98,
                    'performanceMetrics', ARRAY['Improved Load Time', 'High Accessibility'],
                    'technicalAchievements', ARRAY['Responsive Implementation', 'Performance Optimization']
                ),
                'clientResults', jsonb_build_object(
                    'businessImpact', ARRAY[
                        '300% increase in website traffic',
                        '150% improvement in lead generation',
                        '80% reduction in bounce rate'
                    ],
                    'userExperience', ARRAY[
                        '95% user satisfaction rate',
                        '60% increase in time on site',
                        '40% more page views per session'
                    ]
                )
            )
            WHEN 'Company Profile Yusung Tech Indonesia' THEN JSONB_BUILD_OBJECT(
                'whyWeBuilt', jsonb_build_object(
                    'description', 'Yusung Tech Indonesia needed a modern and professional company profile website to showcase their flagship products in biometric security solutions. The website needed to display various products such as SUPREMA, CMITECH, SECURE TOP, SOLITY, and LINKMAN with an attractive layout and easy navigation.',
                    'clientNeed', 'Product Showcase',
                    'strategicGoals', ARRAY['Highlight Biometric Solutions', 'Improve Online Visibility']
                ),
                'problemsSolved', jsonb_build_object(
                    'problems', ARRAY[
                        'Old website that was not responsive and difficult to access on mobile',
                        'No attractive product showcase for SUPREMA, CMITECH, and other products',
                        'Lack of detailed information about biometric product advantages',
                        'No system to display client references and testimonials'
                    ],
                    'challengeComplexity', 'High',
                    'solutionInnovation', ARRAY['Product Showcase', 'Responsive Design']
                ),
                'developmentProcess', jsonb_build_object(
                    'planning', ARRAY[
                        'Analysis of biometric security product showcase needs',
                        'Mapping user journey for customers seeking security solutions',
                        'Planning website structure to display various product categories'
                    ],
                    'design', ARRAY[
                        'Responsive design for SUPREMA, CMITECH, SECURE TOP product showcase',
                        'Implementation of sliders and galleries for flagship products',
                        'Performance optimization for loading multiple product images'
                    ],
                    'processApproach', ARRAY['Product-Centric Design', 'Technical Optimization'],
                    'keyMethodologies', ARRAY['User Experience Focus', 'Performance Engineering']
                ),
                'keyFeatures', jsonb_build_object(
                    'features', ARRAY[
                        jsonb_build_object(
                            'title', 'Product Showcase',
                            'description', 'Displaying flagship products like Bioentry W3, BioStation 3, and FaceStation F2 with complete details.',
                            'icon', 'products'
                        ),
                        jsonb_build_object(
                            'title', 'Responsive Design', 
                            'description', 'Responsive website for easy access on desktop, tablet, and mobile devices.',
                            'icon', 'responsive'
                        ),
                        jsonb_build_object(
                            'title', 'Professional Layout',
                            'description', 'Professional layout that reflects the quality of biometric and security products.',
                            'icon', 'professional'
                        )
                    ],
                    'featureInnovation', ARRAY['Comprehensive Product Display', 'Cross-Device Accessibility'],
                    'competitiveAdvantage', ARRAY['Technical Credibility', 'Visual Professionalism']
                ),
                'performanceResults', jsonb_build_object(
                    'performanceScore', 92,
                    'loadTime', '1.5s',
                    'accessibility', 96,
                    'performanceMetrics', ARRAY['Responsive Performance', 'Accessibility'],
                    'technicalAchievements', ARRAY['Product Gallery', 'Mobile Optimization']
                ),
                'clientResults', jsonb_build_object(
                    'businessImpact', ARRAY[
                        '200% increase in website traffic',
                        '150% improvement in biometric product inquiries',
                        '80% increase in engagement with product showcase'
                    ],
                    'userExperience', ARRAY[
                        '90% user satisfaction rate',
                        '70% increase in time on site',
                        '60% increase in page views for product pages'
                    ]
                )
            )
            WHEN 'Mobile Fin-Tech App' THEN JSONB_BUILD_OBJECT(
                'whyWeBuilt', jsonb_build_object(
                    'description', 'Kawasan Digital engineered a secure, compliant mobile app enabling users to invest spare change automatically while providing real-time payment transfers and budgeting tools.',
                    'clientNeed', 'Financial Innovation',
                    'strategicGoals', ARRAY['Micro-Investments', 'Instant Payments']
                )
            )
        END AS stories
    FROM company_profile.projects p
)

INSERT INTO
    company_profile.project_stories (
        project_id,
        content
    )
SELECT 
    project_id, 
    stories
FROM project_data
WHERE stories IS NOT NULL;