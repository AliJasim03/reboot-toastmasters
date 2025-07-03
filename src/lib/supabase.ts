import { createClient } from '@supabase/supabase-js'
import type { Database, Member, Meeting, Event, Questionnaire, RSVP, MemberFilters, MeetingFilters, EventFilters } from './database.types'

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

// ============================
// MEMBER OPERATIONS
// ============================

export const memberOps = {
  /**
   * Get all members with optional filtering
   */
  async getAll(filters?: MemberFilters) {
    let query = supabase
      .from('members')
      .select('*')
      .order('name')

    if (filters?.status) {
      query = query.eq('membership_status', filters.status)
    }
    if (filters?.pathwaysLevel) {
      query = query.eq('pathways_level', filters.pathwaysLevel)
    }
    if (filters?.joinedAfter) {
      query = query.gte('join_date', filters.joinedAfter)
    }
    if (filters?.joinedBefore) {
      query = query.lte('join_date', filters.joinedBefore)
    }
    if (filters?.isOfficer) {
      query = query.not('roles', 'eq', '[]')
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching members:', error)
      return { data: null, error }
    }

    return { data, error: null }
  },

  /**
   * Get member by ID
   */
  async getById(id: string) {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching member:', error)
      return { data: null, error }
    }

    return { data, error: null }
  },

  /**
   * Get active members only
   */
  async getActive() {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('membership_status', 'Active')
      .order('name')

    if (error) {
      console.error('Error fetching active members:', error)
      return { data: null, error }
    }

    return { data, error: null }
  },

  /**
   * Get club officers (members with active roles)
   */
  async getOfficers() {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('membership_status', 'Active')
      .order('name')

    if (error) {
      console.error('Error fetching officers:', error)
      return { data: null, error }
    }

    // Filter members who have active officer roles
    const officers = data?.filter(member => {
      const roles = Array.isArray(member.roles) ? member.roles : []
      return roles.some((role: any) =>
        role.isActive &&
        role.role !== 'Member' &&
        ['President', 'VP Education', 'VP Membership', 'VP Public Relations', 'Secretary', 'Treasurer', 'Sergeant at Arms'].includes(role.role)
      )
    }) || []

    return { data: officers, error: null }
  },

  /**
   * Create new member
   */
  async create(member: Database['public']['Tables']['members']['Insert']) {
    const { data, error } = await supabase
      .from('members')
      .insert(member)
      .select()
      .single()

    if (error) {
      console.error('Error creating member:', error)
      return { data: null, error }
    }

    return { data, error: null }
  },

  /**
   * Update member
   */
  async update(id: string, updates: Database['public']['Tables']['members']['Update']) {
    const { data, error } = await supabase
      .from('members')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating member:', error)
      return { data: null, error }
    }

    return { data, error: null }
  },

  /**
   * Delete member
   */
  async delete(id: string) {
    const { error } = await supabase
      .from('members')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting member:', error)
      return { success: false, error }
    }

    return { success: true, error: null }
  }
}

// ============================
// MEETING OPERATIONS
// ============================

export const meetingOps = {
  /**
   * Get all meetings with optional filtering
   */
  async getAll(filters?: MeetingFilters) {
    let query = supabase
      .from('meetings')
      .select('*')
      .order('date', { ascending: false })

    if (filters?.type) {
      query = query.eq('type', filters.type)
    }
    if (filters?.status) {
      query = query.eq('status', filters.status)
    }
    if (filters?.dateFrom) {
      query = query.gte('date', filters.dateFrom)
    }
    if (filters?.dateTo) {
      query = query.lte('date', filters.dateTo)
    }
    if (filters?.location) {
      query = query.ilike('location', `%${filters.location}%`)
    }
    if (filters?.theme) {
      query = query.ilike('theme', `%${filters.theme}%`)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching meetings:', error)
      return { data: null, error }
    }

    return { data, error: null }
  },

  /**
   * Get meeting by ID
   */
  async getById(id: string) {
    const { data, error } = await supabase
      .from('meetings')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching meeting:', error)
      return { data: null, error }
    }

    return { data, error: null }
  },

  /**
   * Get upcoming meetings
   */
  async getUpcoming(limit = 10) {
    const today = new Date().toISOString().split('T')[0]

    const { data, error } = await supabase
      .from('meetings')
      .select('*')
      .gte('date', today)
      .eq('status', 'Scheduled')
      .order('date', { ascending: true })
      .limit(limit)

    if (error) {
      console.error('Error fetching upcoming meetings:', error)
      return { data: null, error }
    }

    return { data, error: null }
  },

  /**
   * Get recent meetings
   */
  async getRecent(limit = 5) {
    const today = new Date().toISOString().split('T')[0]

    const { data, error } = await supabase
      .from('meetings')
      .select('*')
      .lt('date', today)
      .eq('status', 'Completed')
      .order('date', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching recent meetings:', error)
      return { data: null, error }
    }

    return { data, error: null }
  },

  /**
   * Create new meeting
   */
  async create(meeting: Database['public']['Tables']['meetings']['Insert']) {
    const { data, error } = await supabase
      .from('meetings')
      .insert(meeting)
      .select()
      .single()

    if (error) {
      console.error('Error creating meeting:', error)
      return { data: null, error }
    }

    return { data, error: null }
  },

  /**
   * Update meeting
   */
  async update(id: string, updates: Database['public']['Tables']['meetings']['Update']) {
    const { data, error } = await supabase
      .from('meetings')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating meeting:', error)
      return { data: null, error }
    }

    return { data, error: null }
  },

  /**
   * Delete meeting
   */
  async delete(id: string) {
    const { error } = await supabase
      .from('meetings')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting meeting:', error)
      return { success: false, error }
    }

    return { success: true, error: null }
  }
}

// ============================
// EVENT OPERATIONS
// ============================

export const eventOps = {
  /**
   * Get all events with optional filtering
   */
  async getAll(filters?: EventFilters) {
    let query = supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true })

    if (filters?.type) {
      query = query.eq('type', filters.type)
    }
    if (filters?.status) {
      query = query.eq('status', filters.status)
    }
    if (filters?.dateFrom) {
      query = query.gte('date', filters.dateFrom)
    }
    if (filters?.dateTo) {
      query = query.lte('date', filters.dateTo)
    }
    if (filters?.isPublic !== undefined) {
      query = query.eq('is_public', filters.isPublic)
    }
    if (filters?.registrationRequired !== undefined) {
      query = query.eq('registration_required', filters.registrationRequired)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching events:', error)
      return { data: null, error }
    }

    return { data, error: null }
  },

  /**
   * Get event by ID
   */
  async getById(id: string) {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching event:', error)
      return { data: null, error }
    }

    return { data, error: null }
  },

  /**
   * Get upcoming events
   */
  async getUpcoming(limit = 10) {
    const today = new Date().toISOString().split('T')[0]

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .gte('date', today)
      .in('status', ['Upcoming', 'Ongoing'])
      .order('date', { ascending: true })
      .limit(limit)

    if (error) {
      console.error('Error fetching upcoming events:', error)
      return { data: null, error }
    }

    return { data, error: null }
  },

  /**
   * Get public events
   */
  async getPublic(limit = 10) {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('is_public', true)
      .in('status', ['Upcoming', 'Ongoing'])
      .order('date', { ascending: true })
      .limit(limit)

    if (error) {
      console.error('Error fetching public events:', error)
      return { data: null, error }
    }

    return { data, error: null }
  },

  /**
   * Create new event
   */
  async create(event: Database['public']['Tables']['events']['Insert']) {
    const { data, error } = await supabase
      .from('events')
      .insert(event)
      .select()
      .single()

    if (error) {
      console.error('Error creating event:', error)
      return { data: null, error }
    }

    return { data, error: null }
  },

  /**
   * Update event
   */
  async update(id: string, updates: Database['public']['Tables']['events']['Update']) {
    const { data, error } = await supabase
      .from('events')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating event:', error)
      return { data: null, error }
    }

    return { data, error: null }
  },

  /**
   * Delete event
   */
  async delete(id: string) {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting event:', error)
      return { success: false, error }
    }

    return { success: true, error: null }
  }
}

// ============================
// QUESTIONNAIRE OPERATIONS
// ============================

export const questionnaireOps = {
  /**
   * Submit contact form
   */
  async submit(questionnaire: Database['public']['Tables']['questionnaires']['Insert']) {
    const { data, error } = await supabase
      .from('questionnaires')
      .insert(questionnaire)
      .select()
      .single()

    if (error) {
      console.error('Error submitting questionnaire:', error)
      return { data: null, error }
    }

    return { data, error: null }
  },

  /**
   * Get all questionnaires (admin only)
   */
  async getAll() {
    const { data, error } = await supabase
      .from('questionnaires')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching questionnaires:', error)
      return { data: null, error }
    }

    return { data, error: null }
  }
}

// ============================
// RSVP OPERATIONS
// ============================

export const rsvpOps = {
  /**
   * Create or update RSVP
   */
  async upsert(rsvp: Database['public']['Tables']['rsvps']['Insert']) {
    const { data, error } = await supabase
      .from('rsvps')
      .upsert(rsvp, {
        onConflict: 'meeting_id,member_email',
        ignoreDuplicates: false
      })
      .select()
      .single()

    if (error) {
      console.error('Error upserting RSVP:', error)
      return { data: null, error }
    }

    return { data, error: null }
  },

  /**
   * Get RSVPs for a meeting
   */
  async getByMeeting(meetingId: string) {
    const { data, error } = await supabase
      .from('rsvps')
      .select('*')
      .eq('meeting_id', meetingId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching RSVPs:', error)
      return { data: null, error }
    }

    return { data, error: null }
  },

  /**
   * Get RSVP by member and meeting
   */
  async getByMemberAndMeeting(memberEmail: string, meetingId: string) {
    const { data, error } = await supabase
      .from('rsvps')
      .select('*')
      .eq('member_email', memberEmail)
      .eq('meeting_id', meetingId)
      .single()

    if (error) {
      console.error('Error fetching RSVP:', error)
      return { data: null, error }
    }

    return { data, error: null }
  }
}

// ============================
// UTILITY FUNCTIONS
// ============================

/**
 * Test database connection
 */
export async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('members')
      .select('count')
      .limit(1)

    if (error) {
      console.error('Database connection failed:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Database connection error:', error)
    return false
  }
}

/**
 * Get database stats
 */
export async function getDatabaseStats() {
  try {
    const [membersResult, meetingsResult, eventsResult] = await Promise.all([
      supabase.from('members').select('count', { count: 'exact' }),
      supabase.from('meetings').select('count', { count: 'exact' }),
      supabase.from('events').select('count', { count: 'exact' })
    ])

    return {
      members: membersResult.count || 0,
      meetings: meetingsResult.count || 0,
      events: eventsResult.count || 0
    }
  } catch (error) {
    console.error('Error fetching database stats:', error)
    return { members: 0, meetings: 0, events: 0 }
  }
}

// Export the main client
export default supabase