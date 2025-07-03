import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-loyal-blue text-white',
        secondary: 'border-transparent bg-ui-gray-100 text-ui-gray-900',
        accent: 'border-transparent bg-happy-yellow text-loyal-blue',
        maroon: 'border-transparent bg-true-maroon text-white',
        destructive: 'border-transparent bg-red-500 text-white',
        outline: 'text-loyal-blue border border-loyal-blue',
        success: 'border-transparent bg-green-500 text-white',
        warning: 'border-transparent bg-orange-500 text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }