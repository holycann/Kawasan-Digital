-- Fix RLS policies for portfolio table
-- First, disable RLS temporarily to fix policies
ALTER TABLE company_profile.portfolio DISABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Portfolio can be viewed by anyone" ON company_profile.portfolio;
DROP POLICY IF EXISTS "Portfolio can be managed by admins" ON company_profile.portfolio;

-- Enable RLS again
ALTER TABLE company_profile.portfolio ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (only published items)
CREATE POLICY "Portfolio can be viewed by anyone" ON company_profile.portfolio
FOR SELECT USING (status = 'published');

-- Create policy for insert operations (allow authenticated users)
CREATE POLICY "Portfolio can be inserted by authenticated users" ON company_profile.portfolio
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create policy for update operations (allow authenticated users)
CREATE POLICY "Portfolio can be updated by authenticated users" ON company_profile.portfolio
FOR UPDATE USING (auth.role() = 'authenticated');

-- Create policy for delete operations (allow authenticated users)
CREATE POLICY "Portfolio can be deleted by authenticated users" ON company_profile.portfolio
FOR DELETE USING (auth.role() = 'authenticated');

-- Create policy for all operations (allow authenticated users to manage all records)
CREATE POLICY "Portfolio can be managed by authenticated users" ON company_profile.portfolio
FOR ALL USING (auth.role() = 'authenticated');

-- Grant necessary permissions to the anon role for reading
GRANT SELECT ON company_profile.portfolio TO anon;

-- Grant necessary permissions to authenticated users
GRANT ALL ON company_profile.portfolio TO authenticated;


