import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function test() {
  const { data, error } = await supabase
    .from('questions')
    .select('id, title, company_tag, difficulty');
  
  if (error) {
    console.error('Error fetching questions:', error);
  } else {
    console.log(`Total questions in DB: ${data.length}`);
    console.log('Infosys questions:');
    console.log(data.filter(q => q.company_tag === 'infosys'));
  }
}

test();
