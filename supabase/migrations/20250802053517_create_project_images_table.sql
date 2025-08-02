-- Create company profile project images table
CREATE TABLE company_profile.project_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES company_profile.projects(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    image_order INTEGER DEFAULT 0,
    image_type TEXT,
    image_caption TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add RLS policies for secure access
ALTER TABLE company_profile.project_images ENABLE ROW LEVEL SECURITY;

-- Policy for select operations
CREATE POLICY "Company profile project images can be viewed by anyone" 
    ON company_profile.project_images FOR SELECT 
    USING (true);
