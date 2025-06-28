import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  text?: string
  fullScreen?: boolean
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8'
}

export function Loading({
                          size = 'md',
                          className,
                          text = 'Loading...',
                          fullScreen = false
                        }: LoadingProps) {
  const spinner = (
    <div className={cn('flex items-center justify-center', className)}>
      <div className="flex flex-col items-center space-y-3">
        <Loader2
          className={cn(
            'animate-spin text-loyal-blue',
            sizeClasses[size]
          )}
        />
        {text && (
          <p className="text-sm text-cool-gray-600 animate-pulse">
            {text}
          </p>
        )}
      </div>
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {spinner}
      </div>
    )
  }

  return spinner
}

// Skeleton loading components
export function SkeletonCard() {
  return (
    <div className="rounded-xl border border-cool-gray-200 bg-white p-6 shadow-sm">
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-cool-gray-200 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-3 bg-cool-gray-200 rounded w-full"></div>
          <div className="h-3 bg-cool-gray-200 rounded w-5/6"></div>
        </div>
        <div className="h-8 bg-cool-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  )
}

export function SkeletonMeetingCard() {
  return (
    <div className="rounded-xl border border-cool-gray-200 bg-white overflow-hidden shadow-sm">
      <div className="aspect-video bg-cool-gray-200 animate-pulse"></div>
      <div className="p-6 space-y-4">
        <div className="animate-pulse space-y-2">
          <div className="h-5 bg-cool-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-cool-gray-200 rounded w-1/2"></div>
        </div>
        <div className="animate-pulse space-y-2">
          <div className="h-3 bg-cool-gray-200 rounded w-full"></div>
          <div className="h-3 bg-cool-gray-200 rounded w-4/5"></div>
        </div>
        <div className="h-9 bg-cool-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  )
}

export function SkeletonMemberCard() {
  return (
    <div className="rounded-xl border border-cool-gray-200 bg-white p-6 shadow-sm">
      <div className="animate-pulse">
        <div className="flex items-center space-x-4 mb-4">
          <div className="h-12 w-12 bg-cool-gray-200 rounded-full"></div>
          <div className="space-y-2">
            <div className="h-4 bg-cool-gray-200 rounded w-24"></div>
            <div className="h-3 bg-cool-gray-200 rounded w-20"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-cool-gray-200 rounded w-full"></div>
          <div className="h-3 bg-cool-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    </div>
  )
}