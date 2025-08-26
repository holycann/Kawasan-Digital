-- Create the portfolio table
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

-- Create indexes for better performance
CREATE INDEX idx_portfolio_slug ON company_profile.portfolio(slug);
CREATE INDEX idx_portfolio_category ON company_profile.portfolio(category);
CREATE INDEX idx_portfolio_status ON company_profile.portfolio(status);
CREATE INDEX idx_portfolio_featured ON company_profile.portfolio(featured);

-- Enable Row Level Security
ALTER TABLE company_profile.portfolio ENABLE ROW LEVEL SECURITY;

-- Policy for public read access (only published items)
CREATE POLICY "Portfolio can be viewed by anyone" ON company_profile.portfolio
FOR SELECT USING (status = 'published');

-- Policy for admin operations (authenticated users)
CREATE POLICY "Portfolio can be managed by admins" ON company_profile.portfolio
FOR ALL USING (auth.role() = 'authenticated');

-- Create trigger function for updating timestamp
CREATE OR REPLACE FUNCTION update_portfolio_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER update_portfolio_modtime
    BEFORE UPDATE ON company_profile.portfolio
    FOR EACH ROW
    EXECUTE FUNCTION update_portfolio_modified_column();


