-- Create company profile project build stories table
CREATE TABLE company_profile.project_stories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    project_id UUID REFERENCES company_profile.projects (id) ON DELETE CASCADE,
    content JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add RLS policies for secure access
ALTER TABLE company_profile.project_stories ENABLE ROW LEVEL SECURITY;

-- Policy for select operations
CREATE POLICY "Company profile project stories can be viewed by anyone" ON company_profile.project_stories FOR
SELECT USING (true);