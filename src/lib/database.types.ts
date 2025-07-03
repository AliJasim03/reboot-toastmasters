export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// Database enums
export type MembershipStatus = 'Active' | 'Inactive' | 'Guest'
export type MeetingType = 'Regular Meeting' | 'Contest Meeting' | 'Special Event' | 'Officer Training' | 'Demo Meeting'
export type MeetingStatus = 'Scheduled' | 'Completed' | 'Cancelled'
export type EventType = 'Club Meeting' | 'Contest' | 'Training' | 'Social' | 'Open House' | 'Conference' | 'Workshop'
export type EventStatus = 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled'
export type AttendanceStatus = 'attending' | 'not_attending' | 'maybe'

// Database schema interface
export interface Database {
  public: {
    Tables: {
      members: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          join_date: string
          membership_status: MembershipStatus
          toastmasters_id: string | null
          pathways_level: number | null
          awards: Json[]
          roles: Json[]
          profile_image: string | null
          bio: string | null
          communication_track: Json | null
          leadership_track: Json | null
          achievements: Json[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          join_date: string
          membership_status?: MembershipStatus
          toastmasters_id?: string | null
          pathways_level?: number | null
          awards?: Json[]
          roles?: Json[]
          profile_image?: string | null
          bio?: string | null
          communication_track?: Json | null
          leadership_track?: Json | null
          achievements?: Json[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          join_date?: string
          membership_status?: MembershipStatus
          toastmasters_id?: string | null
          pathways_level?: number | null
          awards?: Json[]
          roles?: Json[]
          profile_image?: string | null
          bio?: string | null
          communication_track?: Json | null
          leadership_track?: Json | null
          achievements?: Json[]
          created_at?: string
          updated_at?: string
        }
      }
      meetings: {
        Row: {
          id: string
          date: string
          theme: string
          type: MeetingType
          location: string
          attendance: number
          speakers: Json[]
          table_topics_master: string
          toastmaster: string
          evaluators: Json[]
          awards: Json
          highlights: Json[]
          photos: Json[]
          agenda: Json
          status: MeetingStatus
          meeting_minutes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          date: string
          theme: string
          type?: MeetingType
          location: string
          attendance?: number
          speakers?: Json[]
          table_topics_master: string
          toastmaster: string
          evaluators?: Json[]
          awards?: Json
          highlights?: Json[]
          photos?: Json[]
          agenda?: Json
          status?: MeetingStatus
          meeting_minutes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          date?: string
          theme?: string
          type?: MeetingType
          location?: string
          attendance?: number
          speakers?: Json[]
          table_topics_master?: string
          toastmaster?: string
          evaluators?: Json[]
          awards?: Json
          highlights?: Json[]
          photos?: Json[]
          agenda?: Json
          status?: MeetingStatus
          meeting_minutes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string
          date: string
          start_time: string
          end_time: string
          location: string
          type: EventType
          is_public: boolean
          max_attendees: number | null
          current_attendees: number
          registration_required: boolean
          registration_deadline: string | null
          organizer: string
          cost: number | null
          images: Json[]
          agenda: Json | null
          attendees: Json[]
          status: EventStatus
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          date: string
          start_time: string
          end_time: string
          location: string
          type?: EventType
          is_public?: boolean
          max_attendees?: number | null
          current_attendees?: number
          registration_required?: boolean
          registration_deadline?: string | null
          organizer: string
          cost?: number | null
          images?: Json[]
          agenda?: Json | null
          attendees?: Json[]
          status?: EventStatus
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          date?: string
          start_time?: string
          end_time?: string
          location?: string
          type?: EventType
          is_public?: boolean
          max_attendees?: number | null
          current_attendees?: number
          registration_required?: boolean
          registration_deadline?: string | null
          organizer?: string
          cost?: number | null
          images?: Json[]
          agenda?: Json | null
          attendees?: Json[]
          status?: EventStatus
          created_at?: string
          updated_at?: string
        }
      }
      questionnaires: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          message: string
          interest_level: string
          preferred_contact: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          message: string
          interest_level: string
          preferred_contact: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          message?: string
          interest_level?: string
          preferred_contact?: string
          created_at?: string
        }
      }
      rsvps: {
        Row: {
          id: string
          meeting_id: string
          member_id: string
          member_name: string
          member_email: string
          status: AttendanceStatus
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          meeting_id: string
          member_id: string
          member_name: string
          member_email: string
          status?: AttendanceStatus
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          meeting_id?: string
          member_id?: string
          member_name?: string
          member_email?: string
          status?: AttendanceStatus
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      membership_status: MembershipStatus
      meeting_type: MeetingType
      meeting_status: MeetingStatus
      event_type: EventType
      event_status: EventStatus
      attendance_status: AttendanceStatus
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Helpful type aliases for application use
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Inserts<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type Updates<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]

// Specific table types
export type Member = Tables<'members'>
export type Meeting = Tables<'meetings'>
export type Event = Tables<'events'>
export type Questionnaire = Tables<'questionnaires'>
export type RSVP = Tables<'rsvps'>

// Insert types for forms
export type MemberInsert = Inserts<'members'>
export type MeetingInsert = Inserts<'meetings'>
export type EventInsert = Inserts<'events'>
export type QuestionnaireInsert = Inserts<'questionnaires'>
export type RSVPInsert = Inserts<'rsvps'>

// Update types for edits
export type MemberUpdate = Updates<'members'>
export type MeetingUpdate = Updates<'meetings'>
export type EventUpdate = Updates<'events'>
export type QuestionnaireUpdate = Updates<'questionnaires'>
export type RSVPUpdate = Updates<'rsvps'>

// Extended types with computed properties
export interface MemberWithDetails extends Member {
  currentRole?: string
  isOfficer?: boolean
  pathwaysProgress?: number
  totalAwards?: number
  yearsActive?: number
}

export interface MeetingWithDetails extends Meeting {
  speakersCount?: number
  isUpcoming?: boolean
  daysFromNow?: number
  formattedDate?: string
  formattedTime?: string
}

export interface EventWithDetails extends Event {
  spotsRemaining?: number
  isRegistrationOpen?: boolean
  daysFromNow?: number
  formattedDate?: string
  formattedTime?: string
  attendeesCount?: number
}

// Pathways-specific types
export interface PathwaysTrack {
  path: string
  level: number
  projects: PathwaysProject[]
  completedProjects: number
  totalProjects: number
  progress: number
}

export interface PathwaysProject {
  id: string
  name: string
  level: number
  completed: boolean
  completedDate?: string
  objectives: string[]
  duration: string
  resources: string[]
}

// Meeting agenda types
export interface MeetingAgenda {
  openingCeremony: string
  education: string
  tableTopics: string
  evaluations: string
  reports: string
  closing: string
}

// Meeting speaker types
export interface MeetingSpeaker {
  name: string
  project: string
  time: string
  pathwaysPath: string
  level: number
  speechTitle: string
  objectives: string[]
  duration?: string
  evaluator?: string
}

// Meeting roles types
export interface MeetingRole {
  role: string
  member: string
  description?: string
  time?: string
  duration?: string
}

// Awards types
export interface Award {
  name: string
  dateEarned: string
  level?: number
  category?: string
  description?: string
}

// Member role types
export interface MemberRole {
  role: string
  startDate: string
  endDate?: string
  isActive: boolean
  description?: string
}

// Achievement types
export interface Achievement {
  id: string
  name: string
  description: string
  dateEarned: string
  category: string
  level?: number
  points?: number
}

// Event attendee types
export interface EventAttendee {
  id: string
  name: string
  email: string
  registrationDate: string
  status: AttendanceStatus
  notes?: string
}

// Form validation types
export interface FormError {
  field: string
  message: string
}

export interface FormResponse<T = any> {
  success: boolean
  data?: T
  errors?: FormError[]
  message?: string
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
  count?: number
}

// Pagination types
export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  search?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrevious: boolean
  }
}

// Filter types
export interface MemberFilters {
  status?: MembershipStatus
  role?: string
  pathwaysLevel?: number
  joinedAfter?: string
  joinedBefore?: string
  hasAwards?: boolean
  isOfficer?: boolean
}

export interface MeetingFilters {
  type?: MeetingType
  status?: MeetingStatus
  dateFrom?: string
  dateTo?: string
  theme?: string
  location?: string
}

export interface EventFilters {
  type?: EventType
  status?: EventStatus
  dateFrom?: string
  dateTo?: string
  isPublic?: boolean
  hasSpots?: boolean
  registrationRequired?: boolean
}