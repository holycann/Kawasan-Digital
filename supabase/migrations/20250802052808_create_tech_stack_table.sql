-- Create company profile project tech stack table
CREATE TABLE company_profile.tech_stack (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    tech_name TEXT NOT NULL UNIQUE,
    tech_category TEXT,
    tech_version TEXT,
    tech_role TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add RLS policies for secure access
ALTER TABLE company_profile.tech_stack ENABLE ROW LEVEL SECURITY;

-- Policy for select operations
CREATE POLICY "Company profile tech stack can be viewed by anyone" ON company_profile.tech_stack FOR
SELECT USING (true);

-- Optional: Add trigger to update 'updated_at' timestamp
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_tech_stack_modtime
    BEFORE UPDATE ON company_profile.tech_stack
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();