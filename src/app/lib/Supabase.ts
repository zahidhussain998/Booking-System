import { createClient } from '@supabase/supabase-js';

const SupabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SupabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(SupabaseURL, SupabaseAnonKey,{
     persistSession: true, // persists across refresh
    autoRefreshToken: true,
    detectSessionInUrl: true,
})


export default supabase;
