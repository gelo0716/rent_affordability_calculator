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
    rpc: async (fnName, args) => {
      console.log(`[Offline Mode] Mock RPC call to ${fnName}:`, args);
      
      if (fnName === 'submit_email_for_access') {
        return { 
          data: [{ success: true, message: 'Email registered (Offline Mode)', existing: false }], 
          error: null 
        };
      }
      
      if (fnName === 'save_calculator_session') {
        return { 
          data: [{ success: true, message: 'Session saved (Offline Mode)' }], 
          error: null 
        };
      }

      return { data: null, error: { message: 'Supabase not configured (Offline Mode)' } };
    },
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