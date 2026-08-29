import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://placeholder-project.supabase.co";

const supabaseKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  "placeholder-anon-key";

export const isSupabaseConfigured =
  Boolean(import.meta.env.VITE_SUPABASE_URL) &&
  (Boolean(import.meta.env.VITE_SUPABASE_ANON_KEY) ||
    Boolean(import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY)) &&
  import.meta.env.VITE_SUPABASE_URL !== "https://your-supabase-project-id.supabase.co";

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
