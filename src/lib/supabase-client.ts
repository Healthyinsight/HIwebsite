import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// null when env vars are absent (local dev without Supabase, or missing Vercel config).
// All callers must guard: if (!supabase) return
export const supabase = url && key ? createClient(url, key) : null
