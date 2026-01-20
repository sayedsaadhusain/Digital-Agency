
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let supabaseInstance

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase URL or Key is missing. Admin features will not work.')
    // Create a dummy client that warns when used, to prevent App crash
    supabaseInstance = {
        auth: {
            getSession: () => Promise.resolve({ data: { session: null } }),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
            signInWithPassword: () => Promise.resolve({ error: { message: "Supabase not configured. Check console." } }),
            signOut: () => Promise.resolve(),
        },
        from: () => ({
            select: () => ({
                order: () => Promise.resolve({ data: [], error: { message: "Supabase not configured" } }),
                eq: () => ({ single: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }) }),
            }),
            insert: () => Promise.resolve({ error: { message: "Supabase not configured" } }),
            update: () => ({ eq: () => Promise.resolve({ error: { message: "Supabase not configured" } }) }),
            delete: () => ({ eq: () => Promise.resolve({ error: { message: "Supabase not configured" } }) }),
        })
    }
} else {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
}

export const supabase = supabaseInstance
