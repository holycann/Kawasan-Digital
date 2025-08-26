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

async function fixPortfolioPermissions() {
    try {
        console.log('🔧 Fixing portfolio permissions...');
        
        // Read the permission fix SQL file
        const permissionSQLPath = path.join(__dirname, 'fix-portfolio-permissions.sql');
        const permissionSQL = fs.readFileSync(permissionSQLPath, 'utf8');
        
        console.log('📖 Permission SQL loaded successfully');
        
        // Split the SQL into individual statements
        const statements = permissionSQL
            .split(';')
            .map(stmt => stmt.trim())
            .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
        
        console.log(`📝 Found ${statements.length} SQL statements to execute`);
        
        // Execute each statement
        for (let i = 0; i < statements.length; i++) {
            const statement = statements[i];
            if (statement.trim()) {
                console.log(`⚡ Executing statement ${i + 1}/${statements.length}...`);
                
                try {
                    const { error } = await supabase.rpc('execute_sql', { sql: statement });
                    
                    if (error) {
                        console.log(`⚠️  Statement ${i + 1} had an issue:`, error.message);
                    } else {
                        console.log(`✅ Statement ${i + 1} executed successfully`);
                    }
                } catch (e) {
                    console.log(`⚠️  Statement ${i + 1} failed:`, e.message);
                }
            }
        }
        
        console.log('🎉 Portfolio permissions fixed!');
        
        // Test if we can now read from the table
        console.log('🧪 Testing table access...');
        const { data, error } = await supabase.from('portfolio').select('*');
        
        if (error) {
            console.log('❌ Still cannot access table:', error.message);
        } else {
            console.log('✅ Table access successful!');
            console.log('📊 Current data:', data);
        }
        
    } catch (error) {
        console.error('❌ Permission fix failed:', error);
        process.exit(1);
    }
}

fixPortfolioPermissions();


