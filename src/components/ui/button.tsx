// src/components/ui/Button.tsx
import { ButtonHTMLAttributes, ReactNode } from 'react'
import Link from 'next/link'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  href?: string
  external?: boolean
}

export const Button = ({
                         variant = 'primary',
                         size = 'md',
                         children,
                         href,
                         external = false,
                         className = '',
                         disabled,
                         ...props
                       }: ButtonProps) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold font-heading transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const variantClasses = {
    primary: 'bg-loyal hover:bg-blissful-blue text-white focus:ring-loyal',
    secondary: 'bg-maroon hover:bg-rich-maroon text-white focus:ring-maroon',
    outline: 'border-2 border-loyal text-loyal hover:bg-loyal hover:text-white focus:ring-loyal',
    ghost: 'text-loyal hover:bg-loyal hover:text-white focus:ring-loyal'
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm rounded',
    md: 'px-4 py-2 text-sm rounded-md',
    lg: 'px-6 py-3 text-base rounded-md'
  }

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

  if (href) {
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  )
}
