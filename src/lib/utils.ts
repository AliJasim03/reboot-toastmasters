import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, formatDistanceToNow, isToday, isTomorrow, isYesterday, parseISO } from "date-fns"

/**
 * Merge class names with tailwind-merge for optimal CSS class handling
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format date utilities for Toastmasters website
 */
export const formatDate = {
  /**
   * Format date for meeting displays (e.g., "Tuesday, January 15, 2025")
   */
  meeting: (date: Date | string) => {
    const d = typeof date === 'string' ? parseISO(date) : date
    return format(d, 'EEEE, MMMM d, yyyy')
  },

  /**
   * Format date for short display (e.g., "Jan 15, 2025")
   */
  short: (date: Date | string) => {
    const d = typeof date === 'string' ? parseISO(date) : date
    return format(d, 'MMM d, yyyy')
  },

  /**
   * Format date for calendar display (e.g., "15")
   */
  calendar: (date: Date | string) => {
    const d = typeof date === 'string' ? parseISO(date) : date
    return format(d, 'd')
  },

  /**
   * Format time for meeting displays (e.g., "7:00 PM")
   */
  time: (date: Date | string) => {
    const d = typeof date === 'string' ? parseISO(date) : date
    return format(d, 'h:mm a')
  },

  /**
   * Format date and time together (e.g., "Jan 15, 2025 at 7:00 PM")
   */
  dateTime: (date: Date | string) => {
    const d = typeof date === 'string' ? parseISO(date) : date
    return format(d, 'MMM d, yyyy \'at\' h:mm a')
  },

  /**
   * Format relative time (e.g., "2 days ago", "in 3 hours")
   */
  relative: (date: Date | string) => {
    const d = typeof date === 'string' ? parseISO(date) : date
    return formatDistanceToNow(d, { addSuffix: true })
  },

  /**
   * Format date with smart relative formatting
   */
  smart: (date: Date | string) => {
    const d = typeof date === 'string' ? parseISO(date) : date

    if (isToday(d)) return 'Today'
    if (isTomorrow(d)) return 'Tomorrow'
    if (isYesterday(d)) return 'Yesterday'

    return formatDate.short(d)
  },

  /**
   * Format for ISO string (for API calls)
   */
  iso: (date: Date | string) => {
    const d = typeof date === 'string' ? parseISO(date) : date
    return d.toISOString()
  }
}

/**
 * Text formatting utilities
 */
export const formatText = {
  /**
   * Truncate text to specified length
   */
  truncate: (text: string, length: number = 100) => {
    if (text.length <= length) return text
    return text.slice(0, length).trim() + '...'
  },

  /**
   * Convert text to title case
   */
  titleCase: (text: string) => {
    return text.replace(/\w\S*/g, (txt) =>
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    )
  },

  /**
   * Convert text to slug (for URLs)
   */
  slug: (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  },

  /**
   * Extract initials from name
   */
  initials: (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  },

  /**
   * Format phone number
   */
  phone: (phone: string) => {
    const cleaned = phone.replace(/\D/g, '')
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`
    }
    return phone
  },

  /**
   * Format email for display
   */
  email: (email: string) => {
    return email.toLowerCase().trim()
  }
}

/**
 * Number formatting utilities
 */
export const formatNumber = {
  /**
   * Format currency (USD)
   */
  currency: (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  },

  /**
   * Format percentage
   */
  percentage: (value: number, decimals: number = 1) => {
    return `${value.toFixed(decimals)}%`
  },

  /**
   * Format ordinal numbers (1st, 2nd, 3rd, etc.)
   */
  ordinal: (num: number) => {
    const suffixes = ['th', 'st', 'nd', 'rd']
    const v = num % 100
    return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0])
  },

  /**
   * Format numbers with commas
   */
  comma: (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }
}

/**
 * Toastmasters-specific utilities
 */
export const toastmastersUtils = {
  /**
   * Get Pathways level color
   */
  getPathwaysColor: (level: number) => {
    const colors = {
      1: 'bg-blue-100 text-blue-800',
      2: 'bg-green-100 text-green-800',
      3: 'bg-yellow-100 text-yellow-800',
      4: 'bg-orange-100 text-orange-800',
      5: 'bg-purple-100 text-purple-800'
    }
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  },

  /**
   * Format meeting theme
   */
  formatMeetingTheme: (theme: string) => {
    return formatText.titleCase(theme)
  },

  /**
   * Get meeting status color
   */
  getMeetingStatusColor: (status: string) => {
    const colors = {
      'Upcoming': 'bg-blue-100 text-blue-800',
      'Completed': 'bg-green-100 text-green-800',
      'Cancelled': 'bg-red-100 text-red-800',
      'Scheduled': 'bg-yellow-100 text-yellow-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  },

  /**
   * Get member role color
   */
  getMemberRoleColor: (role: string) => {
    const colors = {
      'President': 'bg-toastmasters-blue/10 text-toastmasters-blue',
      'VP Education': 'bg-toastmasters-maroon/10 text-toastmasters-maroon',
      'VP Membership': 'bg-green-100 text-green-800',
      'VP Public Relations': 'bg-purple-100 text-purple-800',
      'Secretary': 'bg-yellow-100 text-yellow-800',
      'Treasurer': 'bg-orange-100 text-orange-800',
      'Sergeant at Arms': 'bg-red-100 text-red-800'
    }
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  },

  /**
   * Generate meeting agenda time slots
   */
  generateTimeSlots: (startTime: string, duration: number = 90) => {
    const slots = []
    const start = parseISO(`2000-01-01T${startTime}:00`)
    const intervalMinutes = 15
    const totalSlots = Math.ceil(duration / intervalMinutes)

    for (let i = 0; i < totalSlots; i++) {
      const time = new Date(start.getTime() + i * intervalMinutes * 60000)
      slots.push(format(time, 'h:mm a'))
    }

    return slots
  }
}

/**
 * Validation utilities
 */
export const validate = {
  /**
   * Validate email format
   */
  email: (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  /**
   * Validate phone number
   */
  phone: (phone: string) => {
    const cleaned = phone.replace(/\D/g, '')
    return cleaned.length === 10 || cleaned.length === 11
  },

  /**
   * Validate URL format
   */
  url: (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  },

  /**
   * Validate required field
   */
  required: (value: string | null | undefined) => {
    return value !== null && value !== undefined && value.trim().length > 0
  }
}

/**
 * Array utilities
 */
export const arrayUtils = {
  /**
   * Group array by key
   */
  groupBy: <T>(array: T[], key: keyof T) => {
    return array.reduce((groups, item) => {
      const group = item[key] as string
      if (!groups[group]) {
        groups[group] = []
      }
      groups[group].push(item)
      return groups
    }, {} as Record<string, T[]>)
  },

  /**
   * Remove duplicates from array
   */
  unique: <T>(array: T[]) => {
    return [...new Set(array)]
  },

  /**
   * Sort array by key
   */
  sortBy: <T>(array: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc') => {
    return array.sort((a, b) => {
      const aVal = a[key]
      const bVal = b[key]

      if (direction === 'desc') {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0
      }
      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0
    })
  },

  /**
   * Shuffle array
   */
  shuffle: <T>(array: T[]) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }
}

/**
 * Local storage utilities (with error handling)
 */
export const storage = {
  /**
   * Get item from localStorage
   */
  get: (key: string) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch {
      return null
    }
  },

  /**
   * Set item in localStorage
   */
  set: (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch {
      return false
    }
  },

  /**
   * Remove item from localStorage
   */
  remove: (key: string) => {
    try {
      localStorage.removeItem(key)
      return true
    } catch {
      return false
    }
  },

  /**
   * Clear all localStorage
   */
  clear: () => {
    try {
      localStorage.clear()
      return true
    } catch {
      return false
    }
  }
}

/**
 * Error handling utilities
 */
export const errorHandler = {
  /**
   * Get error message from unknown error
   */
  getErrorMessage: (error: unknown) => {
    if (error instanceof Error) return error.message
    return String(error)
  },

  /**
   * Log error with context
   */
  logError: (error: unknown, context?: string) => {
    const message = errorHandler.getErrorMessage(error)
    console.error(`${context ? `[${context}] ` : ''}${message}`)
  }
}

/**
 * Debounce utility
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Sleep utility (for development/testing)
 */
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))