export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

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
          membership_status: 'Active' | 'Inactive' | 'Guest'
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
          membership_status?: 'Active' | 'Inactive' | 'Guest'
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
          membership_status?: 'Active' | 'Inactive' | 'Guest'
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
          type: 'Regular Meeting' | 'Contest Meeting' | 'Special Event' | 'Officer Training' | 'Demo Meeting'
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
          status: 'Scheduled' | 'Completed' | 'Cancelled'
          meeting_minutes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          date: string
          theme: string
          type?: 'Regular Meeting' | 'Contest Meeting' | 'Special Event' | 'Officer Training' | 'Demo Meeting'
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
          status?: 'Scheduled' | 'Completed' | 'Cancelled'
          meeting_minutes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          date?: string
          theme?: string
          type?: 'Regular Meeting' | 'Contest Meeting' | 'Special Event' | 'Officer Training' | 'Demo Meeting'
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
          status?: 'Scheduled' | 'Completed' | 'Cancelled'
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
          type: 'Club Meeting' | 'Contest' | 'Training' | 'Social' | 'Open House' | 'Conference' | 'Workshop'
          is_public: boolean
          max_attendees: number | null
          current_attendees: number
          registration_required: boolean
          registration_deadline: string | null
          organizer: string
          cost: number | null
          images: Json[]
          agenda: Json[] | null
          attendees: Json[]
          status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled'
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
          type?: 'Club Meeting' | 'Contest' | 'Training' | 'Social' | 'Open House' | 'Conference' | 'Workshop'
          is_public?: boolean
          max_attendees?: number | null
          current_attendees?: number
          registration_required?: boolean
          registration_deadline?: string | null
          organizer: string
          cost?: number | null
          images?: Json[]
          agenda?: Json[] | null
          attendees?: Json[]
          status?: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled'
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
          type?: 'Club Meeting' | 'Contest' | 'Training' | 'Social' | 'Open House' | 'Conference' | 'Workshop'
          is_public?: boolean
          max_attendees?: number | null
          current_attendees?: number
          registration_required?: boolean
          registration_deadline?: string | null
          organizer?: string
          cost?: number | null
          images?: Json[]
          agenda?: Json[] | null
          attendees?: Json[]
          status?: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled'
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
          member_name: string
          member_email: string
          attendance_status: 'attending' | 'not_attending' | 'maybe'
          guest_count: number
          dietary_requirements: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          meeting_id: string
          member_name: string
          member_email: string
          attendance_status: 'attending' | 'not_attending' | 'maybe'
          guest_count?: number
          dietary_requirements?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          meeting_id?: string
          member_name?: string
          member_email?: string
          attendance_status?: 'attending' | 'not_attending' | 'maybe'
          guest_count?: number
          dietary_requirements?: string | null
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
      membership_status: 'Active' | 'Inactive' | 'Guest'
      meeting_type: 'Regular Meeting' | 'Contest Meeting' | 'Special Event' | 'Officer Training' | 'Demo Meeting'
      meeting_status: 'Scheduled' | 'Completed' | 'Cancelled'
      event_type: 'Club Meeting' | 'Contest' | 'Training' | 'Social' | 'Open House' | 'Conference' | 'Workshop'
      event_status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled'
      attendance_status: 'attending' | 'not_attending' | 'maybe'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}