import { supabase } from './src/configs/supabase.js';

async function testSupabase() {
  console.log('Testing Supabase connection...');
  
  try {
    // Test basic connection
    console.log('1. Testing basic connection...');
    const { data, error } = await supabase.from('portfolio').select('count');
    
    if (error) {
      console.error('❌ Error connecting to portfolio table:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
    } else {
      console.log('✅ Successfully connected to portfolio table');
      console.log('Data:', data);
    }
    
    // Test with the actual query from PortfolioService
    console.log('\n2. Testing actual portfolio query...');
    const { data: portfolioData, error: portfolioError } = await supabase
      .from('portfolio')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });
    
    if (portfolioError) {
      console.error('❌ Error fetching portfolio:', portfolioError);
      console.error('Error details:', JSON.stringify(portfolioError, null, 2));
    } else {
      console.log('✅ Successfully fetched portfolio data');
      console.log('Portfolio count:', portfolioData?.length || 0);
      if (portfolioData && portfolioData.length > 0) {
        console.log('First item:', portfolioData[0]);
      }
    }
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
  }
}

testSupabase();
