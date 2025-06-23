import type { Meeting } from '@/types'

export const meetings: Meeting[] = [
    {
        id: 'meeting-2025-01-07',
        date: '2025-01-07',
        theme: 'New Year, New Goals',
        type: 'Regular Meeting',
        location: 'Community Learning Center, Room 201',
        attendance: 28,
        speakers: [
            {
                name: 'John Doe',
                project: 'Level 1: Mastering Fundamentals',
                time: '7:15 PM',
                pathwaysPath: 'Visionary Communication',
                level: 1,
                speechTitle: 'My Journey to Excellence',
                objectives: ['Organize your speech logically', 'Use appropriate hand gestures']
            },
            {
                name: 'Sarah Wilson',
                project: 'Level 2: Learning Your Style',
                time: '7:30 PM',
                pathwaysPath: 'Strategic Relationships',
                level: 2,
                speechTitle: 'Building Bridges Through Communication',
                objectives: ['Connect with your audience', 'Use vocal variety effectively']
            },
            {
                name: 'Mike Johnson',
                project: 'Level 3: Increasing Knowledge',
                time: '7:45 PM',
                pathwaysPath: 'Team Collaboration',
                level: 3,
                speechTitle: 'The Power of Teamwork',
                objectives: ['Research your topic thoroughly', 'Organize supporting material']
            }
        ],
        tableTopicsMaster: 'Lisa Davis',
        toastmaster: 'Jane Smith',
        evaluators: ['David Brown', 'Tom Miller', 'Emma Garcia'],
        awards: {
            bestSpeaker: 'Sarah Wilson',
            bestEvaluator: 'David Brown',
            bestTableTopics: 'Alex Chen',
            mostImproved: 'Mike Johnson'
        },
        highlights: [
            'Outstanding speech delivery by Sarah Wilson',
            'Excellent table topics session with creative questions',
            'Strong attendance despite holiday season'
        ],
        photos: [
            '/images/meetings/2025-01-07/photo1.jpg',
            '/images/meetings/2025-01-07/photo2.jpg'
        ],
        agenda: {
            openingCeremony: '7:00 PM - Welcome & Invocation',
            education: '7:15 PM - Prepared Speeches',
            tableTopics: '8:00 PM - Impromptu Speaking',
            evaluations: '8:15 PM - Speech Evaluations',
            reports: '8:25 PM - Officer Reports',
            closing: '8:30 PM - Adjournment'
        },
        status: 'Completed',
        meetingMinutes: 'Meeting opened with 28 members present. Three excellent speeches delivered...',
        createdAt: '2025-01-01T10:00:00Z',
        updatedAt: '2025-01-08T09:00:00Z'
    },
    {
        id: 'meeting-2025-01-14',
        date: '2025-01-14',
        theme: 'Leadership in Action',
        type: 'Regular Meeting',
        location: 'Community Learning Center, Room 201',
        attendance: 0,
        speakers: [
            {
                name: 'Emma Garcia',
                project: 'Level 1: Mastering Fundamentals',
                time: '7:15 PM',
                pathwaysPath: 'Effective Coaching',
                level: 1,
                speechTitle: 'Coaching for Success',
                objectives: ['Practice active listening', 'Provide constructive feedback']
            },
            {
                name: 'Alex Chen',
                project: 'Level 2: Learning Your Style',
                time: '7:30 PM',
                pathwaysPath: 'Dynamic Leadership',
                level: 2,
                speechTitle: 'Leading by Example',
                objectives: ['Demonstrate leadership presence', 'Inspire and motivate others']
            }
        ],
        tableTopicsMaster: 'Tom Miller',
        toastmaster: 'Mike Johnson',
        evaluators: ['John Doe', 'Sarah Wilson'],
        awards: {},
        highlights: [],
        photos: [],
        agenda: {
            openingCeremony: '7:00 PM - Welcome & Invocation',
            education: '7:15 PM - Prepared Speeches',
            tableTopics: '8:00 PM - Impromptu Speaking',
            evaluations: '8:15 PM - Speech Evaluations',
            reports: '8:25 PM - Officer Reports',
            closing: '8:30 PM - Adjournment'
        },
        status: 'Scheduled',
        createdAt: '2025-01-08T10:00:00Z',
        updatedAt: '2025-01-08T10:00:00Z'
    },
    {
        id: 'meeting-2025-01-21',
        date: '2025-01-21',
        theme: 'Innovation and Creativity',
        type: 'Regular Meeting',
        location: 'Community Learning Center, Room 201',
        attendance: 0,
        speakers: [
            {
                name: 'David Brown',
                project: 'Level 2: Learning Your Style',
                time: '7:15 PM',
                pathwaysPath: 'Innovative Planning',
                level: 2,
                speechTitle: 'Thinking Outside the Box',
                objectives: ['Present innovative ideas', 'Use creative storytelling techniques']
            },
            {
                name: 'Lisa Davis',
                project: 'Level 3: Increasing Knowledge',
                time: '7:30 PM',
                pathwaysPath: 'Persuasive Influence',
                level: 3,
                speechTitle: 'The Art of Persuasion',
                objectives: ['Structure persuasive arguments', 'Address audience concerns']
            },
            {
                name: 'Tom Miller',
                project: 'Level 1: Mastering Fundamentals',
                time: '7:45 PM',
                pathwaysPath: 'Presentation Mastery',
                level: 1,
                speechTitle: 'First Impressions Matter',
                objectives: ['Create engaging openings', 'Maintain audience attention']
            }
        ],
        tableTopicsMaster: 'Emma Garcia',
        toastmaster: 'Sarah Wilson',
        evaluators: ['Jane Smith', 'Alex Chen', 'John Doe'],
        awards: {},
        highlights: [],
        photos: [],
        agenda: {
            openingCeremony: '7:00 PM - Welcome & Invocation',
            education: '7:15 PM - Prepared Speeches',
            tableTopics: '8:00 PM - Impromptu Speaking',
            evaluations: '8:15 PM - Speech Evaluations',
            reports: '8:25 PM - Officer Reports',
            closing: '8:30 PM - Adjournment'
        },
        status: 'Scheduled',
        createdAt: '2025-01-15T10:00:00Z',
        updatedAt: '2025-01-15T10:00:00Z'
    },
    {
        id: 'meeting-2024-12-31',
        date: '2024-12-31',
        theme: 'Year-End Celebration',
        type: 'Special Event',
        location: 'Community Learning Center, Main Hall',
        attendance: 35,
        speakers: [
            {
                name: 'Jane Smith',
                project: 'Special Presentation',
                time: '7:15 PM',
                speechTitle: 'Reflecting on Our Journey',
                objectives: ['Celebrate achievements', 'Inspire future growth']
            }
        ],
        tableTopicsMaster: 'John Doe',
        toastmaster: 'Mike Johnson',
        evaluators: [],
        awards: {
            bestSpeaker: 'Jane Smith',
            bestTableTopics: 'Sarah Wilson'
        },
        highlights: [
            'Annual awards ceremony',
            'Record attendance for year-end celebration',
            'Inspirational keynote by VP Education'
        ],
        photos: [
            '/images/meetings/2024-12-31/celebration1.jpg',
            '/images/meetings/2024-12-31/awards.jpg'
        ],
        agenda: {
            openingCeremony: '7:00 PM - Welcome & Year in Review',
            education: '7:15 PM - Special Presentations',
            tableTopics: '7:45 PM - Reflection Topics',
            evaluations: '8:00 PM - Awards Ceremony',
            reports: '8:15 PM - Officer Thanks',
            closing: '8:30 PM - Toast to New Year'
        },
        status: 'Completed',
        createdAt: '2024-12-24T10:00:00Z',
        updatedAt: '2025-01-01T12:00:00Z'
    }
]

export const upcomingMeetings = meetings.filter(meeting => meeting.status === 'Scheduled')
export const completedMeetings = meetings.filter(meeting => meeting.status === 'Completed')