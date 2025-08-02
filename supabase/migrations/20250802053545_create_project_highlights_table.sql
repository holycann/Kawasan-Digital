-- Create company profile project highlights table
CREATE TABLE company_profile.project_highlights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES company_profile.projects(id) ON DELETE CASCADE,
    highlight_text TEXT NOT NULL,
    highlight_type TEXT,
    highlight_impact TEXT,
    highlight_metrics JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add RLS policies for secure access
ALTER TABLE company_profile.project_highlights ENABLE ROW LEVEL SECURITY;

-- Policy for select operations
CREATE POLICY "Company profile project highlights can be viewed by anyone" 
    ON company_profile.project_highlights FOR SELECT 
    USING (true);
