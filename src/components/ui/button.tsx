import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { ButtonHTMLAttributes, forwardRef } from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // Solid brand colors
        primary: 'bg-loyal-blue text-white hover:bg-loyal-blue-700 focus-visible:ring-loyal-blue',
        secondary: 'bg-white text-loyal-blue border-2 border-loyal-blue hover:bg-loyal-blue hover:text-white',
        accent: 'bg-happy-yellow text-loyal-blue hover:bg-happy-yellow-400',
        maroon: 'bg-true-maroon text-white hover:bg-true-maroon-700 focus-visible:ring-true-maroon',
        outline: 'border border-loyal-blue text-loyal-blue bg-white hover:bg-loyal-blue hover:text-white',
        ghost: 'hover:bg-ui-gray-100 text-ui-gray-700',
        destructive: 'bg-red-500 text-white hover:bg-red-600',

        // Official brand gradients
        'primary-gradient': 'bg-loyal-blue-gradient text-white hover:bg-loyal-blue-gradient-light focus-visible:ring-loyal-blue shadow-md hover:shadow-lg',
        'maroon-gradient': 'bg-true-maroon-gradient text-white hover:bg-true-maroon-gradient-light focus-visible:ring-true-maroon shadow-md hover:shadow-lg',
        'accent-gradient': 'bg-happy-yellow-gradient text-loyal-blue hover:bg-happy-yellow-gradient-light shadow-md hover:shadow-lg',
        'brand-primary': 'bg-toastmasters-primary text-white hover:opacity-90 focus-visible:ring-loyal-blue shadow-lg hover:shadow-xl',
        'brand-accent': 'bg-toastmasters-accent text-white hover:opacity-90 focus-visible:ring-loyal-blue shadow-lg hover:shadow-xl',
        'hero-gradient': 'bg-toastmasters-hero text-white hover:opacity-90 focus-visible:ring-loyal-blue shadow-lg hover:shadow-xl',
      },
      size: {
        sm: 'h-9 px-3 text-xs',
        default: 'h-10 px-4 py-2',
        lg: 'h-12 px-6 py-3',
        xl: 'h-14 px-8 py-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }