import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://ztubqamodfeiwefeeglx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0dWJxYW1vZGZlaXdlZmVlZ2x4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2MTUyNzcsImV4cCI6MjA3MjE5MTI3N30.tuWY6JjTeGsSEEtvLGhjHwvR3MJe59DVHcNsApISpJk";

export const supabase2 = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});