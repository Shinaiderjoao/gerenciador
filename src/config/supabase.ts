import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wevezwxluxszmlkhgmau.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndldmV6d3hsdXhzem1sa2hnbWF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwMDg2NzAsImV4cCI6MjA1NTU4NDY3MH0.gf32IDvxm9-2oQo0Ypr8r4L2AQigixIEY6OkaehFfGI';

export const supabase = createClient(supabaseUrl, supabaseKey); 