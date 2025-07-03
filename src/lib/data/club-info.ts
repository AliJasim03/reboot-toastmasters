// Club Information - Static data for the Toastmasters club
export interface ClubInfo {
  id: string
  name: string
  number: string
  district: string
  area: string
  division: string
  charterDate: string
  meetingDay: string
  meetingTime: string
  location: ClubLocation
  description: string
  mission: string
  vision: string
  website: string
  email: string
  phone: string
  socialMedia: SocialMedia
  membershipFees: MembershipFees
}

export interface ClubLocation {
  venue: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  coordinates?: {
    lat: number
    lng: number
  }
  directions: string
  parkingInfo: string
  accessibilityInfo: string
  virtualInfo?: {
    platform: string
    meetingId: string
    password?: string
    link: string
  }
}

export interface SocialMedia {
  facebook?: string
  linkedin?: string
  instagram?: string
  twitter?: string
  youtube?: string
  tiktok?: string
}

export interface MembershipFees {
  newMember: number
  renewalFee: number
  guestFee: number
  currency: string
  paymentMethods: string[]
}

// Club Information Data
export const clubInfo: ClubInfo = {
  id: 'reboot-toastmasters',
  name: 'Reboot Toastmasters Club',
  number: '1234567', // Replace with actual club number
  district: '79', // Replace with actual district
  area: 'B1', // Replace with actual area
  division: 'B', // Replace with actual division
  charterDate: '2020-01-15', // Replace with actual charter date
  meetingDay: 'Tuesday',
  meetingTime: '19:00',
  location: {
    venue: 'Community Learning Center',
    address: '123 Excellence Boulevard',
    city: 'Manama',
    state: 'Capital',
    zipCode: '12345',
    country: 'Bahrain',
    coordinates: {
      lat: 26.2235,
      lng: 50.5876
    },
    directions: 'Enter through the main entrance, take the elevator to the 2nd floor, Room 201. Look for the Toastmasters signs.',
    parkingInfo: 'Free parking available in the main parking lot. Street parking is also available on surrounding streets.',
    accessibilityInfo: 'The venue is fully wheelchair accessible with elevator access to all floors. Accessible restrooms are available on each floor.',
    virtualInfo: {
      platform: 'Zoom',
      meetingId: '123-456-789',
      password: 'toastmasters2024',
      link: 'https://zoom.us/j/123456789'
    }
  },
  description: 'Reboot Toastmasters is a dynamic and supportive club dedicated to helping members develop exceptional communication and leadership skills. We provide a welcoming environment where members can practice public speaking, improve their presentation abilities, and build confidence through structured learning and mutual support.',
  mission: 'We provide a supportive and positive learning experience in which members are empowered to develop communication and leadership skills, resulting in greater self-confidence and personal growth.',
  vision: 'To be the premier club in Bahrain where leaders are made, communication excellence is achieved, and members inspire each other to reach their full potential.',
  website: 'https://reboot-toastmasters.com',
  email: 'info@reboot-toastmasters.com',
  phone: '+973 1234 5678',
  socialMedia: {
    facebook: 'https://facebook.com/reboottoastmasters',
    linkedin: 'https://linkedin.com/company/reboot-toastmasters',
    instagram: 'https://instagram.com/reboottoastmasters',
    twitter: 'https://twitter.com/reboottoastmasters',
    youtube: 'https://youtube.com/@reboottoastmasters'
  },
  membershipFees: {
    newMember: 75,
    renewalFee: 45,
    guestFee: 5,
    currency: 'USD',
    paymentMethods: ['Cash', 'Bank Transfer', 'Credit Card', 'PayPal']
  }
}

// Club Values
export const clubValues = [
  {
    title: 'Integrity',
    description: 'We act with honesty, transparency, and ethical behavior in all our interactions.',
    icon: '🛡️'
  },
  {
    title: 'Dedication',
    description: 'We are committed to our personal growth and the success of our fellow members.',
    icon: '💪'
  },
  {
    title: 'Service',
    description: 'We serve our members, our community, and the Toastmasters International organization.',
    icon: '🤝'
  },
  {
    title: 'Respect',
    description: 'We treat all members and guests with dignity, courtesy, and appreciation.',
    icon: '🙏'
  }
]

// Meeting Schedule
export const meetingSchedule = {
  regularMeetings: {
    frequency: 'Weekly',
    day: 'Tuesday',
    time: '7:00 PM - 8:30 PM',
    duration: 90, // minutes
    format: 'Hybrid (In-person and Virtual)'
  },
  specialMeetings: {
    speechContests: 'Quarterly',
    officerTraining: 'Semi-annually',
    socialEvents: 'Monthly',
    openHouse: 'Bi-monthly'
  }
}

// Pathways Information
export const pathwaysInfo = {
  description: 'Toastmasters Pathways is our comprehensive learning experience that provides members with flexibility to choose from 11 specialized learning paths.',
  paths: [
    {
      name: 'Engaging Humor',
      description: 'Learn to use humor effectively in speeches and presentations.',
      duration: '6-8 months',
      projects: 14,
      color: 'bg-yellow-100 text-yellow-800'
    },
    {
      name: 'Innovative Planning',
      description: 'Build skills in planning and implementing innovative solutions.',
      duration: '6-8 months',
      projects: 14,
      color: 'bg-blue-100 text-blue-800'
    },
    {
      name: 'Leadership Development',
      description: 'Develop leadership skills through practical application.',
      duration: '6-8 months',
      projects: 14,
      color: 'bg-green-100 text-green-800'
    },
    {
      name: 'Persuasive Influence',
      description: 'Learn to influence others through effective communication.',
      duration: '6-8 months',
      projects: 14,
      color: 'bg-purple-100 text-purple-800'
    },
    {
      name: 'Presentation Mastery',
      description: 'Master the art of presentations and public speaking.',
      duration: '6-8 months',
      projects: 14,
      color: 'bg-red-100 text-red-800'
    },
    {
      name: 'Strategic Relationships',
      description: 'Build strategic relationships and networking skills.',
      duration: '6-8 months',
      projects: 14,
      color: 'bg-indigo-100 text-indigo-800'
    },
    {
      name: 'Team Collaboration',
      description: 'Develop teamwork and collaboration skills.',
      duration: '6-8 months',
      projects: 14,
      color: 'bg-pink-100 text-pink-800'
    },
    {
      name: 'Visionary Communication',
      description: 'Learn to communicate vision and inspire others.',
      duration: '6-8 months',
      projects: 14,
      color: 'bg-teal-100 text-teal-800'
    }
  ]
}

// Officer Roles
export const officerRoles = [
  {
    title: 'President',
    description: 'Leads the club and ensures smooth operations.',
    responsibilities: [
      'Preside over club meetings',
      'Ensure club objectives are met',
      'Serve as club spokesperson',
      'Coordinate with district leadership'
    ],
    term: '1 year',
    commitment: '2-3 hours per week'
  },
  {
    title: 'Vice President Education',
    description: 'Manages the educational program of the club.',
    responsibilities: [
      'Plan and organize educational programs',
      'Assign speech projects and evaluations',
      'Mentor members on their Pathways journey',
      'Organize contests and special events'
    ],
    term: '1 year',
    commitment: '2-3 hours per week'
  },
  {
    title: 'Vice President Membership',
    description: 'Focuses on member retention and recruitment.',
    responsibilities: [
      'Recruit new members',
      'Conduct orientation for new members',
      'Maintain membership records',
      'Organize member retention activities'
    ],
    term: '1 year',
    commitment: '1-2 hours per week'
  },
  {
    title: 'Vice President Public Relations',
    description: 'Manages club communications and publicity.',
    responsibilities: [
      'Promote club activities',
      'Manage social media presence',
      'Maintain club website',
      'Coordinate with media for events'
    ],
    term: '1 year',
    commitment: '1-2 hours per week'
  },
  {
    title: 'Secretary',
    description: 'Maintains club records and documentation.',
    responsibilities: [
      'Record meeting minutes',
      'Maintain membership database',
      'Handle club correspondence',
      'Manage club files and documents'
    ],
    term: '1 year',
    commitment: '1-2 hours per week'
  },
  {
    title: 'Treasurer',
    description: 'Manages club finances and financial reporting.',
    responsibilities: [
      'Collect membership dues',
      'Pay club expenses',
      'Maintain financial records',
      'Prepare financial reports'
    ],
    term: '1 year',
    commitment: '1-2 hours per week'
  },
  {
    title: 'Sergeant at Arms',
    description: 'Ensures smooth meeting operations and hospitality.',
    responsibilities: [
      'Set up meeting room',
      'Greet members and guests',
      'Maintain order during meetings',
      'Coordinate refreshments'
    ],
    term: '1 year',
    commitment: '1 hour per week'
  }
]

// Meeting Roles
export const meetingRoles = [
  {
    role: 'Toastmaster',
    description: 'Leads the meeting and maintains the flow.',
    duration: '5 minutes',
    responsibilities: ['Introduce speakers', 'Maintain timing', 'Keep energy high']
  },
  {
    role: 'Table Topics Master',
    description: 'Conducts impromptu speaking session.',
    duration: '15 minutes',
    responsibilities: ['Prepare interesting topics', 'Manage time', 'Encourage participation']
  },
  {
    role: 'Evaluator',
    description: 'Provides constructive feedback to speakers.',
    duration: '3 minutes',
    responsibilities: ['Listen actively', 'Give balanced feedback', 'Suggest improvements']
  },
  {
    role: 'Timer',
    description: 'Tracks time for all speakers and activities.',
    duration: 'Throughout meeting',
    responsibilities: ['Monitor timing', 'Signal speakers', 'Report timing']
  },
  {
    role: 'Ah-Counter',
    description: 'Tracks filler words and verbal crutches.',
    duration: 'Throughout meeting',
    responsibilities: ['Listen for filler words', 'Track usage', 'Report findings']
  },
  {
    role: 'Grammarian',
    description: 'Focuses on language usage and introduces word of the day.',
    duration: '2 minutes',
    responsibilities: ['Introduce word of the day', 'Note language usage', 'Provide feedback']
  },
  {
    role: 'General Evaluator',
    description: 'Evaluates the overall meeting and calls on role players.',
    duration: '5 minutes',
    responsibilities: ['Assess meeting flow', 'Call on functionaries', 'Provide overall feedback']
  }
]

// Club Awards and Recognition
export const clubAwards = [
  {
    name: 'Distinguished Club Program',
    description: 'Annual recognition for clubs that meet performance standards.',
    levels: ['Base', 'Select', 'Distinguished', 'President\'s Distinguished'],
    criteria: 'Based on membership growth, education goals, and training participation.'
  },
  {
    name: 'Club Coach Program',
    description: 'Support program for clubs needing assistance.',
    duration: '6 months',
    benefits: ['Experienced mentor', 'Customized support', 'Goal achievement']
  },
  {
    name: 'Sponsor Recognition',
    description: 'Recognition for clubs that help charter new clubs.',
    benefits: ['District recognition', 'Points toward DCP', 'Leadership development']
  }
]

// Contact Information
export const contactInfo = {
  general: {
    email: 'info@reboot-toastmasters.com',
    phone: '+973 1234 5678',
    address: '123 Excellence Boulevard, Manama, Bahrain'
  },
  membership: {
    email: 'membership@reboot-toastmasters.com',
    phone: '+973 1234 5679'
  },
  media: {
    email: 'media@reboot-toastmasters.com',
    phone: '+973 1234 5680'
  }
}

// FAQ Data
export const faqData = [
  {
    question: 'What is Toastmasters?',
    answer: 'Toastmasters International is a non-profit educational organization that teaches public speaking and leadership skills through a worldwide network of clubs.'
  },
  {
    question: 'How much does it cost to join?',
    answer: `New member fee is $${clubInfo.membershipFees.newMember} USD, which includes international dues and club fees. Renewal fees are $${clubInfo.membershipFees.renewalFee} USD every 6 months.`
  },
  {
    question: 'Can I visit as a guest?',
    answer: `Yes! Guests are welcome to attend up to 3 meetings before joining. There's a small guest fee of $${clubInfo.membershipFees.guestFee} USD per meeting.`
  },
  {
    question: 'What happens at a meeting?',
    answer: 'Our meetings include prepared speeches, impromptu speaking (Table Topics), evaluations, and various meeting roles. Each meeting lasts about 1.5 hours.'
  },
  {
    question: 'Do I need public speaking experience?',
    answer: 'No experience is required! Toastmasters is designed for people of all skill levels, from complete beginners to experienced speakers.'
  },
  {
    question: 'How often are meetings held?',
    answer: `We meet every ${clubInfo.meetingDay} at ${clubInfo.meetingTime} for about 1.5 hours. Meetings are held both in-person and virtually.`
  }
]

// Official Toastmasters Pathways - Complete and Accurate Data
export const officialPathwaysInfo = {
  description: 'Toastmasters Pathways is our comprehensive learning experience that provides members with flexibility to choose from 11 specialized learning paths.',
  totalPaths: 11,
  paths: [
    {
      name: 'Dynamic Leadership',
      description: 'Build your leadership skills as you learn to manage time, develop leadership styles, and create innovative solutions.',
      duration: '6-8 months',
      projects: 14,
      levels: 5,
      color: 'bg-blue-100 text-blue-800',
      focus: 'Leadership',
      skills: ['Time Management', 'Leadership Styles', 'Innovation', 'Team Building']
    },
    {
      name: 'Effective Coaching',
      description: 'Learn to coach others, provide feedback, and develop mentoring skills to help others succeed.',
      duration: '6-8 months',
      projects: 14,
      levels: 5,
      color: 'bg-green-100 text-green-800',
      focus: 'Coaching & Mentoring',
      skills: ['Coaching Techniques', 'Feedback Delivery', 'Mentoring', 'Active Listening']
    },
    {
      name: 'Engaging Humor',
      description: 'Discover how to use humor effectively in speeches and presentations to engage your audience.',
      duration: '6-8 months',
      projects: 14,
      levels: 5,
      color: 'bg-yellow-100 text-yellow-800',
      focus: 'Humor & Entertainment',
      skills: ['Comedic Timing', 'Storytelling', 'Audience Engagement', 'Humor Techniques']
    },
    {
      name: 'Innovative Planning',
      description: 'Build skills in planning and implementing innovative solutions to complex problems.',
      duration: '6-8 months',
      projects: 14,
      levels: 5,
      color: 'bg-purple-100 text-purple-800',
      focus: 'Innovation & Planning',
      skills: ['Strategic Planning', 'Problem Solving', 'Innovation', 'Project Management']
    },
    {
      name: 'Leadership Development',
      description: 'Develop leadership skills through practical application and real-world scenarios.',
      duration: '6-8 months',
      projects: 14,
      levels: 5,
      color: 'bg-red-100 text-red-800',
      focus: 'Leadership Skills',
      skills: ['Leadership Theory', 'Team Management', 'Decision Making', 'Conflict Resolution']
    },
    {
      name: 'Motivational Strategies',
      description: 'Learn to inspire and motivate others through powerful communication and leadership techniques.',
      duration: '6-8 months',
      projects: 14,
      levels: 5,
      color: 'bg-orange-100 text-orange-800',
      focus: 'Motivation & Inspiration',
      skills: ['Motivational Speaking', 'Inspiring Others', 'Goal Setting', 'Emotional Intelligence']
    },
    {
      name: 'Persuasive Influence',
      description: 'Learn to influence others through effective communication and persuasion techniques.',
      duration: '6-8 months',
      projects: 14,
      levels: 5,
      color: 'bg-indigo-100 text-indigo-800',
      focus: 'Persuasion & Influence',
      skills: ['Persuasion Techniques', 'Negotiation', 'Influence', 'Communication']
    },
    {
      name: 'Presentation Mastery',
      description: 'Master the art of presentations and public speaking with advanced techniques.',
      duration: '6-8 months',
      projects: 14,
      levels: 5,
      color: 'bg-pink-100 text-pink-800',
      focus: 'Public Speaking',
      skills: ['Advanced Speaking', 'Presentation Design', 'Audience Analysis', 'Delivery Techniques']
    },
    {
      name: 'Strategic Relationships',
      description: 'Build strategic relationships and networking skills for professional success.',
      duration: '6-8 months',
      projects: 14,
      levels: 5,
      color: 'bg-teal-100 text-teal-800',
      focus: 'Networking & Relationships',
      skills: ['Networking', 'Relationship Building', 'Strategic Thinking', 'Professional Development']
    },
    {
      name: 'Team Collaboration',
      description: 'Develop teamwork and collaboration skills to work effectively with others.',
      duration: '6-8 months',
      projects: 14,
      levels: 5,
      color: 'bg-cyan-100 text-cyan-800',
      focus: 'Teamwork & Collaboration',
      skills: ['Team Building', 'Collaboration', 'Communication', 'Conflict Resolution']
    },
    {
      name: 'Visionary Communication',
      description: 'Learn to communicate vision and inspire others to achieve common goals.',
      duration: '6-8 months',
      projects: 14,
      levels: 5,
      color: 'bg-emerald-100 text-emerald-800',
      focus: 'Vision & Communication',
      skills: ['Vision Communication', 'Inspiring Others', 'Strategic Communication', 'Change Management']
    }
  ]
}

// Pathways Levels Structure
export const pathwaysLevels = [
  {
    level: 1,
    title: 'Mastering Fundamentals',
    description: 'Build a foundation of basic communication and leadership skills.',
    projects: 2,
    duration: '1-2 months'
  },
  {
    level: 2,
    title: 'Learning Your Style',
    description: 'Discover your unique communication and leadership style.',
    projects: 2,
    duration: '1-2 months'
  },
  {
    level: 3,
    title: 'Increasing Knowledge',
    description: 'Expand your knowledge and apply new skills.',
    projects: 2,
    duration: '1-2 months'
  },
  {
    level: 4,
    title: 'Building Skills',
    description: 'Practice and refine your communication and leadership abilities.',
    projects: 3,
    duration: '1-2 months'
  },
  {
    level: 5,
    title: 'Demonstrating Expertise',
    description: 'Apply your skills in real-world scenarios and mentor others.',
    projects: 5,
    duration: '2-3 months'
  }
]

// Awards and Recognition in Pathways
export const pathwaysAwards = [
  {
    name: 'Level Completion Award',
    description: 'Earned when completing all projects in a level.',
    levels: [1, 2, 3, 4, 5],
    recognition: 'Digital badge and certificate'
  },
  {
    name: 'Path Completion Award',
    description: 'Earned when completing all 5 levels of a path.',
    recognition: 'Physical certificate and digital badge'
  },
  {
    name: 'Distinguished Toastmaster (DTM)',
    description: 'The highest recognition in Toastmasters, requiring completion of two paths plus additional requirements.',
    requirements: [
      'Complete 2 Pathways paths',
      'Serve in district leadership role',
      'Mentor another member',
      'Conduct a training session'
    ],
    recognition: 'Physical certificate, pin, and lifetime recognition'
  }
]

// Common Pathways Projects (examples)
export const commonPathwaysProjects = [
  {
    title: 'Ice Breaker',
    level: 1,
    duration: '4-6 minutes',
    objectives: [
      'Introduce yourself to the club',
      'Share your background and interests',
      'Build confidence in speaking'
    ],
    availableInPaths: 'All paths'
  },
  {
    title: 'Evaluation and Feedback',
    level: 2,
    duration: '5-7 minutes',
    objectives: [
      'Provide constructive feedback',
      'Use evaluation criteria',
      'Deliver feedback effectively'
    ],
    availableInPaths: 'Most paths'
  },
  {
    title: 'Researching and Presenting',
    level: 3,
    duration: '5-7 minutes',
    objectives: [
      'Research a topic thoroughly',
      'Organize information effectively',
      'Present findings clearly'
    ],
    availableInPaths: 'Most paths'
  }
]
// Export all data
export {
  clubInfo as default,
}