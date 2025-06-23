import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { ButtonHTMLAttributes, forwardRef } from 'react'

const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                primary: 'bg-loyal-blue text-white hover:bg-loyal-blue-700 focus-visible:ring-loyal-blue',
                secondary: 'bg-white text-loyal-blue border-2 border-loyal-blue hover:bg-loyal-blue hover:text-white',
                accent: 'bg-happy-yellow text-loyal-blue hover:bg-happy-yellow-400',
                ghost: 'hover:bg-cool-gray-100 text-cool-gray-700',
                destructive: 'bg-red-500 text-white hover:bg-red-600',
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