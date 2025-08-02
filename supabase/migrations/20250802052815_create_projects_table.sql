-- Create company profile projects table
CREATE TABLE company_profile.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    title TEXT NOT NULL,
    short_description TEXT,
    description TEXT,
    cover_image TEXT,
    year INTEGER,
    category_id UUID REFERENCES company_profile.project_categories (id),
    client_id UUID REFERENCES company_profile.clients (id),
    website_url TEXT,
    project_location TEXT,
    project_status TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add RLS policies for secure access
ALTER TABLE company_profile.projects ENABLE ROW LEVEL SECURITY;

-- Policy for select operations
CREATE POLICY "Company profile projects can be viewed by anyone" ON company_profile.projects FOR
SELECT USING (true);

-- Optional: Add trigger to update 'updated_at' timestamp
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_projects_modtime
    BEFORE UPDATE ON company_profile.projects
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();