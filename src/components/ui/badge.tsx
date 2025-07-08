// src/components/ui/Badge.tsx
import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md'
  className?: string
}

export const Badge = ({
                        children,
                        variant = 'primary',
                        size = 'sm',
                        className = ''
                      }: BadgeProps) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full'

  const variantClasses = {
    primary: 'bg-loyal text-white',
    secondary: 'bg-maroon text-white',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow text-rich-black',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800'
  }

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm'
  }

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
      {children}
    </span>
  )
}
