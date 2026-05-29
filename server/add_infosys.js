import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://hroewewttmkwjmjbmcxd.supabase.co';
const SUPABASE_SERVICE_KEY = process.argv[2];

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function addInfosys() {
  const { data, error } = await supabase
    .from('companies')
    .upsert([
      { 
        slug: 'infosys', 
        name: 'Infosys', 
        logo_url: null, 
        description: 'HackWithINFY & core CS concepts',
        display_order: 6
      }
    ], { onConflict: 'slug' });

  if (error) {
    console.error('Error adding Infosys:', error);
  } else {
    console.log('Infosys company added successfully!');
  }
}

addInfosys();
