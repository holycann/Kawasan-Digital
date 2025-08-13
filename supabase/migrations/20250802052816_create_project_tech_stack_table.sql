-- Create company profile project tech stack table
CREATE TABLE company_profile.project_tech_stack (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    project_id UUID REFERENCES company_profile.projects (id) ON DELETE CASCADE,
    tech_id UUID REFERENCES company_profile.tech_stack (id) ON DELETE CASCADE,
    UNIQUE (project_id, tech_id)
);

-- Add RLS policies for secure access
ALTER TABLE company_profile.project_tech_stack ENABLE ROW LEVEL SECURITY;

-- Policy for select operations
CREATE POLICY "Company profile project tech stack can be viewed by anyone" ON company_profile.project_tech_stack FOR
SELECT USING (true);