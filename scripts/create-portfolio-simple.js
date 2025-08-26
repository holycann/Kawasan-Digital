import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables manually
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

// Parse environment variables
const envVars = {};
envContent.split('\n').forEach(line => {
    if (line.includes('=') && !line.startsWith('#')) {
        const [key, ...valueParts] = line.split('=');
        envVars[key.trim()] = valueParts.join('=').trim();
    }
});

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Missing Supabase environment variables');
    process.exit(1);
}

console.log('🔑 Supabase configuration loaded successfully');

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    db: {
        schema: 'company_profile',
    }
});

async function createPortfolioSimple() {
    try {
        console.log('🚀 Creating portfolio table with simple approach...');
        
        // Try to create a simple table structure by inserting data
        // This might trigger table creation if it doesn't exist
        console.log('📝 Attempting to create table via insert...');
        
        const testData = {
            title: 'Test Project',
            slug: 'test-project',
            short_description: 'Test description',
            category: 'Test',
            status: 'published'
        };
        
        const { error: insertError } = await supabase
            .from('portfolio')
            .insert(testData);
        
        if (insertError) {
            if (insertError.message.includes('relation') && insertError.message.includes('does not exist')) {
                console.log('❌ Table does not exist. You need to create it manually in Supabase dashboard.');
                console.log('📋 Please run this SQL in your Supabase SQL Editor:');
                console.log(`
-- Create the portfolio table
CREATE TABLE company_profile.portfolio (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    short_description TEXT,
    description TEXT,
    cover_image TEXT,
    gallery_images TEXT[],
    category TEXT NOT NULL,
    client_name TEXT,
    year INTEGER,
    technologies TEXT[],
    project_url TEXT,
    github_url TEXT,
    demo_url TEXT,
    featured BOOLEAN DEFAULT false,
    status TEXT DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_portfolio_slug ON company_profile.portfolio(slug);
CREATE INDEX idx_portfolio_category ON company_profile.portfolio(category);
CREATE INDEX idx_portfolio_status ON company_profile.portfolio(status);
CREATE INDEX idx_portfolio_featured ON company_profile.portfolio(featured);

-- Enable RLS
ALTER TABLE company_profile.portfolio ENABLE ROW LEVEL SECURITY;

-- Create simple policy for all operations (temporary for testing)
CREATE POLICY "Allow all operations" ON company_profile.portfolio FOR ALL USING (true);

-- Grant permissions
GRANT ALL ON company_profile.portfolio TO anon;
GRANT ALL ON company_profile.portfolio TO authenticated;
                `);
                process.exit(1);
            } else {
                console.log('⚠️  Insert failed with error:', insertError.message);
            }
        } else {
            console.log('✅ Test data inserted successfully!');
            
            // Clean up test data
            const { error: deleteError } = await supabase
                .from('portfolio')
                .delete()
                .eq('slug', 'test-project');
            
            if (deleteError) {
                console.log('⚠️  Could not clean up test data:', deleteError.message);
            } else {
                console.log('🧹 Test data cleaned up');
            }
        }
        
        // Test reading from table
        console.log('🧪 Testing table access...');
        const { data, error: readError } = await supabase.from('portfolio').select('*');
        
        if (readError) {
            console.log('❌ Cannot read from table:', readError.message);
        } else {
            console.log('✅ Table access successful!');
            console.log('📊 Current data:', data);
        }
        
    } catch (error) {
        console.error('❌ Operation failed:', error);
        process.exit(1);
    }
}

createPortfolioSimple();


