import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL')
}
if (!supabaseAnonKey) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

// Client for use in browser/client components
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Server client (for server-side operations)
export const createServerClient = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

  if (!serviceRoleKey) {
    throw new Error('Missing env.SUPABASE_SERVICE_ROLE_KEY')
  }

  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

// Helper functions for common operations
export const getMembers = async () => {
  const { data, error } = await supabase
    .from('members')
    .select('*')
    .order('name')

  if (error) {
    console.error('Error fetching members:', error)
    return null
  }

  return data
}

export const getMeetings = async () => {
  const { data, error } = await supabase
    .from('meetings')
    .select('*')
    .order('date', { ascending: false })

  if (error) {
    console.error('Error fetching meetings:', error)
    return null
  }

  return data
}

export const getUpcomingMeetings = async () => {
  const today = new Date().toISOString().split('T')[0]

  const { data, error } = await supabase
    .from('meetings')
    .select('*')
    .gte('date', today)
    .order('date', { ascending: true })

  if (error) {
    console.error('Error fetching upcoming meetings:', error)
    return null
  }

  return data
}

export const getRecentMeetings = async () => {
  const today = new Date().toISOString().split('T')[0]

  const { data, error } = await supabase
    .from('meetings')
    .select('*')
    .lt('date', today)
    .order('date', { ascending: false })
    .limit(5)

  if (error) {
    console.error('Error fetching recent meetings:', error)
    return null
  }

  return data
}

// Member operations
export const getMemberById = async (id: string) => {
  const { data, error } = await supabase
    .from('members')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching member:', error)
    return null
  }

  return data
}

// Meeting operations
export const getMeetingById = async (id: string) => {
  const { data, error } = await supabase
    .from('meetings')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching meeting:', error)
    return null
  }

  return data
}