import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Supabase client configuration
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY
);

async function executeSQLFiles(mode = 'up') {
    const seedsDir = path.resolve('supabase/seeds');

    try {
        // Read all SQL files in the seeds directory
        const sqlFiles = fs.readdirSync(seedsDir)
            .filter(file => path.extname(file).toLowerCase() === '.sql')
            .sort(); // Optional: sort to ensure consistent execution order

        for (const file of sqlFiles) {
            // Skip drop_all.sql when in 'up' mode, or only execute drop_all.sql when in 'drop' mode
            if ((mode === 'up' && file === 'drop_all.sql') ||
                (mode === 'drop' && file !== 'drop_all.sql')) {
                continue;
            }

            const sqlFilePath = path.join(seedsDir, file);
            const sqlContent = fs.readFileSync(sqlFilePath, 'utf-8');

            // Execute the SQL file
            const { error } = await supabase.rpc('execute_sql', { sql: sqlContent });

            if (error) {
                console.error(`❌ Error executing ${file}:`, error.message);
                process.exit(1);
            }

            console.log(`✅ Successfully executed: ${file}`);
        }

        console.log(`🌱 All seed files processed successfully in ${mode} mode`);
    } catch (err) {
        console.error('❌ Error processing seed files:', err);
        process.exit(1);
    }
}

// Parse command line arguments
const args = process.argv.slice(2);
const mode = args.includes('--drop') ? 'drop' : 'up';

executeSQLFiles(mode);