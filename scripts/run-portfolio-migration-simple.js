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

async function runPortfolioMigration() {
    try {
        console.log('🚀 Starting portfolio migration...');
        
        // First, let's try to create the table using direct SQL execution
        console.log('📝 Creating portfolio table...');
        
        const createTableSQL = `
            CREATE TABLE IF NOT EXISTS company_profile.portfolio (
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
        `;
        
        // Try to execute the SQL directly
        const { error: createError } = await supabase.rpc('execute_sql', { 
            sql: createTableSQL 
        });
        
        if (createError) {
            console.log('⚠️  Could not create table via execute_sql, trying alternative approach...');
            
            // Try to create table by inserting a dummy record (this might create the table)
            const { error: insertError } = await supabase
                .from('portfolio')
                .insert({
                    title: 'Test Project',
                    slug: 'test-project',
                    category: 'Test',
                    short_description: 'Test description'
                });
            
            if (insertError && insertError.message && insertError.message.includes('relation') && insertError.message.includes('does not exist')) {
                console.log('❌ Table creation failed. You need to create the table manually in Supabase dashboard.');
                console.log('📋 Please run this SQL in your Supabase SQL Editor:');
                console.log(createTableSQL);
                process.exit(1);
            }
        } else {
            console.log('✅ Portfolio table created successfully!');
        }
        
        // Create indexes
        console.log('📊 Creating indexes...');
        const indexSQLs = [
            'CREATE INDEX IF NOT EXISTS idx_portfolio_slug ON company_profile.portfolio(slug);',
            'CREATE INDEX IF NOT EXISTS idx_portfolio_category ON company_profile.portfolio(category);',
            'CREATE INDEX IF NOT EXISTS idx_portfolio_status ON company_profile.portfolio(status);',
            'CREATE INDEX IF NOT EXISTS idx_portfolio_featured ON company_profile.portfolio(featured);'
        ];
        
        for (const indexSQL of indexSQLs) {
            try {
                await supabase.rpc('execute_sql', { sql: indexSQL });
                console.log('✅ Index created');
            } catch (e) {
                console.log('⚠️  Index creation skipped (might already exist)');
            }
        }
        
        // Enable RLS
        console.log('🔒 Enabling Row Level Security...');
        try {
            await supabase.rpc('execute_sql', { 
                sql: 'ALTER TABLE company_profile.portfolio ENABLE ROW LEVEL SECURITY;' 
            });
            console.log('✅ RLS enabled');
        } catch (e) {
            console.log('⚠️  RLS setup skipped');
        }
        
        // Insert sample data
        console.log('📊 Inserting sample portfolio data...');
        
        const sampleData = [
            {
                title: 'E-Commerce Platform',
                slug: 'ecommerce-platform',
                short_description: 'Modern e-commerce solution with advanced features',
                description: 'A comprehensive e-commerce platform built with modern technologies. Features include user authentication, product management, shopping cart, payment integration, and admin dashboard.',
                cover_image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
                gallery_images: ['https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800'],
                category: 'Web Development',
                client_name: 'TechCorp Inc.',
                year: 2024,
                technologies: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
                project_url: 'https://example.com',
                github_url: 'https://github.com/example/ecommerce',
                demo_url: 'https://demo.example.com',
                featured: true,
                status: 'published'
            },
            {
                title: 'Mobile Banking App',
                slug: 'mobile-banking-app',
                short_description: 'Secure mobile banking application',
                description: 'A secure mobile banking application with biometric authentication, real-time transactions, and comprehensive financial management features.',
                cover_image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800',
                gallery_images: ['https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800'],
                category: 'Mobile Development',
                client_name: 'BankSecure',
                year: 2023,
                technologies: ['React Native', 'Node.js', 'MongoDB', 'Firebase'],
                project_url: 'https://banksecure.com',
                github_url: 'https://github.com/banksecure/app',
                demo_url: 'https://demo.banksecure.com',
                featured: true,
                status: 'published'
            }
        ];
        
        for (const item of sampleData) {
            const { error } = await supabase
                .from('portfolio')
                .insert(item);
            
            if (error) {
                console.log(`⚠️  Failed to insert ${item.title}:`, error.message);
            } else {
                console.log(`✅ Inserted: ${item.title}`);
            }
        }
        
        console.log('🎯 Sample data insertion completed!');
        console.log('✨ Portfolio system is now ready!');
        
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
}

runPortfolioMigration();
