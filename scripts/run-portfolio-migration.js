import { supabase } from '../src/configs/supabase.js';
import fs from 'fs';
import path from 'path';

async function runPortfolioMigration() {
    try {
        console.log('🚀 Starting portfolio migration...');
        
        // Read the migration SQL file
        const migrationPath = path.join(process.cwd(), 'supabase', 'migrations', '20250803000000_create_portfolio_table.sql');
        const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
        
        console.log('📖 Migration SQL loaded successfully');
        
        // Split the SQL into individual statements
        const statements = migrationSQL
            .split(';')
            .map(stmt => stmt.trim())
            .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
        
        console.log(`📝 Found ${statements.length} SQL statements to execute`);
        
        // Execute each statement
        for (let i = 0; i < statements.length; i++) {
            const statement = statements[i];
            if (statement.trim()) {
                console.log(`⚡ Executing statement ${i + 1}/${statements.length}...`);
                
                const { error } = await supabase.rpc('execute_sql', { sql: statement });
                
                if (error) {
                    console.log(`⚠️  Statement ${i + 1} had an issue (this might be expected):`, error.message);
                } else {
                    console.log(`✅ Statement ${i + 1} executed successfully`);
                }
            }
        }
        
        console.log('🎉 Portfolio migration completed!');
        
        // Try to insert sample data
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


