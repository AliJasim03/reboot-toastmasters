// src/components/ui/Section.tsx
import { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  background?: 'white' | 'gray' | 'loyal' | 'maroon'
  padding?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export const Section = ({
                          children,
                          background = 'white',
                          padding = 'lg',
                          className = ''
                        }: SectionProps) => {
  const backgroundClasses = {
    white: 'bg-white text-rich-black',
    gray: 'bg-fair-gray text-rich-black',
    loyal: 'bg-loyal text-white',
    maroon: 'bg-maroon text-white'
  }

  const paddingClasses = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-20'
  }

  return (
    <section className={`${backgroundClasses[background]} ${paddingClasses[padding]} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}
