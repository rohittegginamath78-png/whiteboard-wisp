import { createClient } from '@supabase/supabase-js';

// These will be automatically populated by Lovable's Supabase integration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Make sure your Supabase integration is properly configured.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);