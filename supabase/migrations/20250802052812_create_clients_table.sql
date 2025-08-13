-- Create company profile clients table
CREATE TABLE company_profile.clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    name TEXT NOT NULL,
    industry TEXT,
    location TEXT,
    website_url TEXT,
    description TEXT,
    logo_image TEXT,
    contact_person TEXT,
    contact_email TEXT,
    contact_phone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add RLS policies for secure access
ALTER TABLE company_profile.clients ENABLE ROW LEVEL SECURITY;

-- Policy for select operations
CREATE POLICY "Company profile clients can be viewed by anyone" ON company_profile.clients FOR
SELECT USING (true);

-- Optional: Add trigger to update 'updated_at' timestamp
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_clients_modtime
    BEFORE UPDATE ON company_profile.clients
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();