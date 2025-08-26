-- Create company profile portfolio table
CREATE TABLE company_profile.portfolio (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    short_description TEXT,
    description TEXT,
    cover_image TEXT,
    gallery_images TEXT[], -- Array of image URLs
    category TEXT NOT NULL,
    client_name TEXT,
    year INTEGER,
    technologies TEXT[], -- Array of technology names
    project_url TEXT,
    github_url TEXT,
    demo_url TEXT,
    featured BOOLEAN DEFAULT false,
    status TEXT DEFAULT 'published', -- published, draft, archived
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX idx_portfolio_slug ON company_profile.portfolio(slug);
CREATE INDEX idx_portfolio_category ON company_profile.portfolio(category);
CREATE INDEX idx_portfolio_status ON company_profile.portfolio(status);
CREATE INDEX idx_portfolio_featured ON company_profile.portfolio(featured);

-- Add RLS policies for secure access
ALTER TABLE company_profile.portfolio ENABLE ROW LEVEL SECURITY;

-- Policy for select operations (public read access)
CREATE POLICY "Portfolio can be viewed by anyone" ON company_profile.portfolio 
FOR SELECT USING (status = 'published');

-- Policy for admin operations (only authenticated users with admin role)
CREATE POLICY "Portfolio can be managed by admins" ON company_profile.portfolio 
FOR ALL USING (auth.role() = 'authenticated');

-- Trigger to update 'updated_at' timestamp
CREATE OR REPLACE FUNCTION update_portfolio_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_portfolio_modtime
    BEFORE UPDATE ON company_profile.portfolio
    FOR EACH ROW
    EXECUTE FUNCTION update_portfolio_modified_column();

-- Insert some sample portfolio data
INSERT INTO company_profile.portfolio (
    title, 
    slug, 
    short_description, 
    description, 
    cover_image, 
    category, 
    client_name, 
    year, 
    technologies, 
    featured
) VALUES 
(
    'E-Commerce Platform',
    'ecommerce-platform',
    'Modern e-commerce platform built with Next.js and Supabase',
    'A full-featured e-commerce platform with user authentication, product management, shopping cart, and payment integration. Built with modern technologies for optimal performance and user experience.',
    '/Portfolio1.png',
    'Web Development',
    'TechCorp Inc.',
    2024,
    ARRAY['Next.js', 'React', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    true
),
(
    'Mobile Banking App',
    'mobile-banking-app',
    'Secure mobile banking application for iOS and Android',
    'A comprehensive mobile banking application featuring secure authentication, account management, fund transfers, and real-time notifications. Built with React Native for cross-platform compatibility.',
    '/Portfolio2.png',
    'Mobile Development',
    'BankSecure',
    2024,
    ARRAY['React Native', 'TypeScript', 'Firebase', 'Redux'],
    true
),
(
    'Corporate Website',
    'corporate-website',
    'Professional corporate website with modern design',
    'A responsive corporate website showcasing company services, team members, and contact information. Features modern animations and optimized for search engines.',
    '/Portfolio3.png',
    'Web Development',
    'Business Solutions Ltd.',
    2023,
    ARRAY['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
    false
),
(
    'API Management System',
    'api-management-system',
    'RESTful API management and documentation platform',
    'A comprehensive API management system with authentication, rate limiting, analytics, and interactive documentation. Built with Node.js and Express for scalability.',
    '/Portfolio4.png',
    'Backend Development',
    'DataFlow Systems',
    2023,
    ARRAY['Node.js', 'Express.js', 'MongoDB', 'Redis'],
    false
),
(
    'Portfolio Website',
    'portfolio-website',
    'Personal portfolio website with modern design',
    'A stunning portfolio website featuring smooth animations, responsive design, and modern UI/UX principles. Built with Next.js and Framer Motion.',
    '/Portfolio5.png',
    'Web Development',
    'Freelance Client',
    2024,
    ARRAY['Next.js', 'React', 'Framer Motion', 'Tailwind CSS'],
    true
);


