import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env?.VITE_SUPABASE_ANON_KEY;

let supabaseInstance;

if (supabaseUrl && supabaseKey) {
  supabaseInstance = createClient(supabaseUrl, supabaseKey);
} else {
  console.warn('Missing Supabase environment variables. Running in offline mode.');
  // Create a mock client
  supabaseInstance = {
    rpc: async () => ({ data: null, error: { message: 'Supabase not configured (Offline Mode)' } }),
    from: () => ({
      select: () => ({ data: null, error: { message: 'Supabase not configured (Offline Mode)' } }),
      insert: () => ({ data: null, error: { message: 'Supabase not configured (Offline Mode)' } }),
      update: () => ({ data: null, error: { message: 'Supabase not configured (Offline Mode)' } }),
      delete: () => ({ data: null, error: { message: 'Supabase not configured (Offline Mode)' } }),
    }),
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    }
  };
}

export const supabase = supabaseInstance;