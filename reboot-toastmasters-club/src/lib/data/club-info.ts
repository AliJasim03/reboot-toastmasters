import type { ClubInfo } from '@/types'

export const clubInfo: ClubInfo = {
    id: 'excellence-speakers',
    name: 'Excellence Speakers',
    number: '123456',
    district: '42',
    area: 'A1',
    division: 'A',
    charterDate: '2019-01-15',
    meetingDay: 'Tuesday',
    meetingTime: '19:00',
    location: {
        venue: 'Community Learning Center',
        address: '123 Excellence Blvd',
        city: 'Your City',
        state: 'YS',
        zipCode: '12345',
        country: 'United States',
        directions: 'Enter through main entrance, take elevator to 2nd floor, Room 201',
        parkingInfo: 'Free parking available in main lot and street parking',
        accessibilityInfo: 'Wheelchair accessible with elevator access to all floors'
    },
    description: 'Excellence Speakers is a dynamic Toastmasters club dedicated to helping members develop confidence in communication and leadership through a supportive and encouraging environment.',
    mission: 'We provide a supportive and positive learning experience in which members are empowered to develop communication and leadership skills, resulting in greater self-confidence and personal growth.',
    vision: 'To be the premier club where leaders are made and communication excellence is achieved.',
    website: 'https://excellence-speakers.toastmasters.org',
    email: 'info@excellence-speakers.org',
    phone: '+1 (555) 123-4567',
    socialMedia: {
        facebook: 'https://facebook.com/excellencespeakers',
        linkedin: 'https://linkedin.com/company/excellence-speakers',
        instagram: 'https://instagram.com/excellencespeakers'
    },
    membershipFees: {
        newMember: 75,
        renewalFee: 45,
        guestFee: 5,
        currency: 'USD'
    },
    currentOfficers: {
        president: {
            id: 'john-doe',
            name: 'John Doe',
            email: 'president@excellence-speakers.org',
            phone: '+1 (555) 123-4501',
            joinDate: '2020-03-15',
            membershipStatus: 'Active',
            pathwaysLevel: 5,
            awards: [],
            roles: [{
                role: 'President',
                startDate: '2024-07-01',
                isActive: true
            }],
            achievements: [],
            bio: 'Experienced leader with 4 years in Toastmasters, passionate about helping others grow.'
        },
        vpEducation: {
            id: 'jane-smith',
            name: 'Jane Smith',
            email: 'vpe@excellence-speakers.org',
            phone: '+1 (555) 123-4502',
            joinDate: '2020-08-22',
            membershipStatus: 'Active',
            pathwaysLevel: 4,
            awards: [],
            roles: [{
                role: 'VP Education',
                startDate: '2024-07-01',
                isActive: true
            }],
            achievements: []
        },
        vpMembership: {
            id: 'mike-johnson',
            name: 'Mike Johnson',
            email: 'vpm@excellence-speakers.org',
            phone: '+1 (555) 123-4503',
            joinDate: '2021-01-10',
            membershipStatus: 'Active',
            pathwaysLevel: 3,
            awards: [],
            roles: [{
                role: 'VP Membership',
                startDate: '2024-07-01',
                isActive: true
            }],
            achievements: []
        },
        vpPublicRelations: {
            id: 'sarah-wilson',
            name: 'Sarah Wilson',
            email: 'vppr@excellence-speakers.org',
            phone: '+1 (555) 123-4504',
            joinDate: '2021-05-18',
            membershipStatus: 'Active',
            pathwaysLevel: 3,
            awards: [],
            roles: [{
                role: 'VP Public Relations',
                startDate: '2024-07-01',
                isActive: true
            }],
            achievements: []
        },
        secretary: {
            id: 'david-brown',
            name: 'David Brown',
            email: 'secretary@excellence-speakers.org',
            phone: '+1 (555) 123-4505',
            joinDate: '2022-02-14',
            membershipStatus: 'Active',
            pathwaysLevel: 2,
            awards: [],
            roles: [{
                role: 'Secretary',
                startDate: '2024-07-01',
                isActive: true
            }],
            achievements: []
        },
        treasurer: {
            id: 'lisa-davis',
            name: 'Lisa Davis',
            email: 'treasurer@excellence-speakers.org',
            phone: '+1 (555) 123-4506',
            joinDate: '2022-06-20',
            membershipStatus: 'Active',
            pathwaysLevel: 2,
            awards: [],
            roles: [{
                role: 'Treasurer',
                startDate: '2024-07-01',
                isActive: true
            }],
            achievements: []
        },
        sergeantAtArms: {
            id: 'tom-miller',
            name: 'Tom Miller',
            email: 'saa@excellence-speakers.org',
            phone: '+1 (555) 123-4507',
            joinDate: '2023-01-08',
            membershipStatus: 'Active',
            pathwaysLevel: 1,
            awards: [],
            roles: [{
                role: 'Sergeant at Arms',
                startDate: '2024-07-01',
                isActive: true
            }],
            achievements: []
        }
    },
    clubStats: {
        totalMembers: 52,
        averageAttendance: 32,
        meetingsThisYear: 48,
        distinguishedClubProgram: {
            currentYear: 2024,
            goals: [
                {
                    id: 'new-members',
                    description: 'Add 5 new members',
                    target: 5,
                    current: 3,
                    isCompleted: false,
                    points: 2
                },
                {
                    id: 'cc-awards',
                    description: 'Have 2 members achieve Competent Communicator',
                    target: 2,
                    current: 2,
                    isCompleted: true,
                    points: 2
                },
                {
                    id: 'advanced-awards',
                    description: 'Have 2 members achieve Advanced Leader Bronze',
                    target: 2,
                    current: 1,
                    isCompleted: false,
                    points: 2
                },
                {
                    id: 'officer-training',
                    description: 'Have 4 officers attend training',
                    target: 4,
                    current: 4,
                    isCompleted: true,
                    points: 2
                }
            ],
            pointsEarned: 8,
            status: 'Distinguished'
        }
    },
    updatedAt: '2024-12-31T12:00:00Z'
}