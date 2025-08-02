-- Create company profile project categories table
CREATE TABLE company_profile.project_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    company_name TEXT,
    industry TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add RLS policies for secure access
ALTER TABLE company_profile.project_categories ENABLE ROW LEVEL SECURITY;

-- Policy for select operations
CREATE POLICY "Company profile project categories can be viewed by anyone" ON company_profile.project_categories FOR
SELECT USING (true);

-- Optional: Add trigger to update 'updated_at' timestamp
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_project_categories_modtime
    BEFORE UPDATE ON company_profile.project_categories
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();