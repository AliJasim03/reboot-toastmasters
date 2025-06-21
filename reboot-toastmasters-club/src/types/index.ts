// src/types/index.ts

// Core Member Types
export interface Member {
    id: string;
    name: string;
    email: string;
    phone?: string;
    joinDate: string;
    membershipStatus: 'Active' | 'Inactive' | 'Guest';
    toastmastersId?: string;
    pathwaysLevel?: number;
    awards: Award[];
    roles: MemberRole[];
    profileImage?: string;
    bio?: string;
    communicationTrack?: PathwaysTrack;
    leadershipTrack?: PathwaysTrack;
    achievements: Achievement[];
}

export interface MemberRole {
    role: ClubRole;
    startDate: string;
    endDate?: string;
    isActive: boolean;
}

export type ClubRole =
    | 'President'
    | 'VP Education'
    | 'VP Membership'
    | 'VP Public Relations'
    | 'Secretary'
    | 'Treasurer'
    | 'Sergeant at Arms'
    | 'Member';

// Meeting Types
export interface Meeting {
    id: string;
    date: string;
    theme: string;
    type: MeetingType;
    location: string;
    attendance: number;
    speakers: Speaker[];
    tableTopicsMaster: string;
    toastmaster: string;
    evaluators: string[];
    awards: MeetingAwards;
    highlights: string[];
    photos: string[];
    agenda: MeetingAgenda;
    status: 'Scheduled' | 'Completed' | 'Cancelled';
    meetingMinutes?: string;
    createdAt: string;
    updatedAt: string;
}

export type MeetingType =
    | 'Regular Meeting'
    | 'Contest Meeting'
    | 'Special Event'
    | 'Officer Training'
    | 'Demo Meeting';

export interface Speaker {
    name: string;
    project: string;
    time: string;
    pathwaysPath?: string;
    level?: number;
    objectives?: string[];
    speechTitle?: string;
}

export interface MeetingAwards {
    bestSpeaker?: string;
    bestEvaluator?: string;
    bestTableTopics?: string;
    mostImproved?: string;
}

export interface MeetingAgenda {
    openingCeremony: string;
    education: string;
    tableTopics: string;
    evaluations: string;
    reports: string;
    closing: string;
    [key: string]: string; // For flexible agenda items
}

// Event Types
export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    type: EventType;
    isPublic: boolean;
    maxAttendees?: number;
    currentAttendees: number;
    registrationRequired: boolean;
    registrationDeadline?: string;
    organizer: string;
    cost?: number;
    images: string[];
    agenda?: EventAgenda[];
    attendees: string[]; // Member IDs
    status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled';
    createdAt: string;
    updatedAt: string;
}

export type EventType =
    | 'Club Meeting'
    | 'Contest'
    | 'Training'
    | 'Social'
    | 'Open House'
    | 'Conference'
    | 'Workshop';

export interface EventAgenda {
    time: string;
    activity: string;
    speaker?: string;
    duration: number; // in minutes
}

// Pathways & Education Types
export interface PathwaysTrack {
    pathName: string;
    level: number;
    completedProjects: PathwaysProject[];
    currentProject?: PathwaysProject;
    startDate: string;
    estimatedCompletion?: string;
}

export interface PathwaysProject {
    id: string;
    title: string;
    level: number;
    objectives: string[];
    completedDate?: string;
    feedback?: string;
    evaluator?: string;
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    achievedDate: string;
    category: AchievementCategory;
    badgeImage?: string;
}

export type AchievementCategory =
    | 'Communication'
    | 'Leadership'
    | 'Attendance'
    | 'Contest'
    | 'Service'
    | 'Mentorship';

export interface Award {
    id: string;
    title: string;
    description: string;
    receivedDate: string;
    category: AwardCategory;
    level?: string;
    certificateUrl?: string;
}

export type AwardCategory =
    | 'Distinguished Toastmaster'
    | 'Competent Communicator'
    | 'Advanced Leader'
    | 'Contest Winner'
    | 'Club Excellence'
    | 'Special Recognition';

// Club Information Types
export interface ClubInfo {
    id: string;
    name: string;
    number: string;
    district: string;
    area: string;
    division: string;
    charterDate: string;
    meetingDay: string;
    meetingTime: string;
    location: ClubLocation;
    description: string;
    mission: string;
    vision: string;
    website?: string;
    email: string;
    phone?: string;
    socialMedia: SocialMediaLinks;
    membershipFees: MembershipFees;
    currentOfficers: CurrentOfficers;
    clubStats: ClubStats;
    updatedAt: string;
}

export interface ClubLocation {
    venue: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    directions?: string;
    parkingInfo?: string;
    accessibilityInfo?: string;
}

export interface SocialMediaLinks {
    facebook?: string;
    linkedin?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
}

export interface MembershipFees {
    newMember: number;
    renewalFee: number;
    guestFee?: number;
    currency: string;
}

export interface CurrentOfficers {
    president: Member;
    vpEducation: Member;
    vpMembership: Member;
    vpPublicRelations: Member;
    secretary: Member;
    treasurer: Member;
    sergeantAtArms: Member;
}

export interface ClubStats {
    totalMembers: number;
    averageAttendance: number;
    meetingsThisYear: number;
    distinguishedClubProgram: {
        currentYear: number;
        goals: DcpGoal[];
        pointsEarned: number;
        status: 'Select Distinguished' | 'Distinguished' | 'President\'s Distinguished' | 'In Progress';
    };
}

export interface DcpGoal {
    id: string;
    description: string;
    target: number;
    current: number;
    isCompleted: boolean;
    points: number;
}

// API Response Types
export interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
    timestamp: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

// Form Types for User Input
export interface CreateMeetingForm {
    date: string;
    theme: string;
    type: MeetingType;
    location: string;
    toastmaster: string;
    tableTopicsMaster: string;
    speakers: Omit<Speaker, 'name'> & { memberId: string }[];
    evaluators: string[];
}

export interface CreateEventForm {
    title: string;
    description: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    type: EventType;
    isPublic: boolean;
    maxAttendees?: number;
    registrationRequired: boolean;
    registrationDeadline?: string;
    cost?: number;
}

export interface CreateMemberForm {
    name: string;
    email: string;
    phone?: string;
    toastmastersId?: string;
    bio?: string;
}

// Filter and Search Types
export interface MeetingFilters {
    dateFrom?: string;
    dateTo?: string;
    type?: MeetingType;
    speaker?: string;
    theme?: string;
}

export interface EventFilters {
    dateFrom?: string;
    dateTo?: string;
    type?: EventType;
    isPublic?: boolean;
    status?: Event['status'];
}

export interface MemberFilters {
    role?: ClubRole;
    membershipStatus?: Member['membershipStatus'];
    pathwaysLevel?: number;
    joinedAfter?: string;
}

// Utility Types
export type SortOrder = 'asc' | 'desc';
export type SortableFields<T> = keyof T;

export interface SortConfig<T> {
    field: SortableFields<T>;
    order: SortOrder;
}

// Constants
export const PATHWAYS_LEVELS = [1, 2, 3, 4, 5] as const;
export const CLUB_ROLES: ClubRole[] = [
    'President',
    'VP Education',
    'VP Membership',
    'VP Public Relations',
    'Secretary',
    'Treasurer',
    'Sergeant at Arms',
    'Member'
];

export const MEETING_TYPES: MeetingType[] = [
    'Regular Meeting',
    'Contest Meeting',
    'Special Event',
    'Officer Training',
    'Demo Meeting'
];

export const EVENT_TYPES: EventType[] = [
    'Club Meeting',
    'Contest',
    'Training',
    'Social',
    'Open House',
    'Conference',
    'Workshop'
];

// Supabase Database Schema (for future reference)
export interface Database {
    public: {
        Tables: {
            members: {
                Row: Member;
                Insert: Omit<Member, 'id' | 'createdAt' | 'updatedAt'>;
                Update: Partial<Omit<Member, 'id'>>;
            };
            meetings: {
                Row: Meeting;
                Insert: Omit<Meeting, 'id' | 'createdAt' | 'updatedAt'>;
                Update: Partial<Omit<Meeting, 'id'>>;
            };
            events: {
                Row: Event;
                Insert: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>;
                Update: Partial<Omit<Event, 'id'>>;
            };
            club_info: {
                Row: ClubInfo;
                Insert: Omit<ClubInfo, 'id' | 'updatedAt'>;
                Update: Partial<Omit<ClubInfo, 'id'>>;
            };
        };
    };
}