import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://ztubqamodfeiwefeeglx.supabase.co'
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0dWJxYW1vZGZlaXdlZmVlZ2x4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2MTUyNzcsImV4cCI6MjA3MjE5MTI3N30.tuWY6JjTeGsSEEtvLGhjHwvR3MJe59DVHcNsApISpJk'

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and Anon Key are required.");
}

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase