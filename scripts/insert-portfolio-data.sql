-- Insert sample portfolio data
INSERT INTO company_profile.portfolio (
    title, slug, short_description, description, cover_image, 
    gallery_images, category, client_name, year, technologies, 
    project_url, github_url, demo_url, featured, status
) VALUES 
(
    'E-Commerce Platform',
    'ecommerce-platform',
    'Modern e-commerce solution with advanced features',
    'A comprehensive e-commerce platform built with modern technologies. Features include user authentication, product management, shopping cart, payment integration, and admin dashboard.',
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    ARRAY['https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800'],
    'Web Development',
    'TechCorp Inc.',
    2024,
    ARRAY['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    'https://example.com',
    'https://github.com/example/ecommerce',
    'https://demo.example.com',
    true,
    'published'
),
(
    'Mobile Banking App',
    'mobile-banking-app',
    'Secure mobile banking application',
    'A secure mobile banking application with biometric authentication, real-time transactions, and comprehensive financial management features.',
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800',
    ARRAY['https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800'],
    'Mobile Development',
    'BankSecure',
    2023,
    ARRAY['React Native', 'Node.js', 'MongoDB', 'Firebase'],
    'https://banksecure.com',
    'https://github.com/banksecure/app',
    'https://demo.banksecure.com',
    true,
    'published'
),
(
    'Portfolio Website',
    'portfolio-website',
    'Professional portfolio showcase',
    'A modern portfolio website built with Next.js and Tailwind CSS, featuring smooth animations and responsive design.',
    'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800',
    ARRAY['https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800'],
    'Web Development',
    'Personal Project',
    2024,
    ARRAY['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
    'https://portfolio.example.com',
    'https://github.com/example/portfolio',
    'https://portfolio.example.com',
    false,
    'published'
);


