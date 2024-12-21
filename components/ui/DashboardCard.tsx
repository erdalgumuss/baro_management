import { ReactNode } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cva, type VariantProps } from 'class-variance-authority'

const cardVariants = cva(
  "transition-all duration-300 hover:shadow-lg",
  {
    variants: {
      variant: {
        default: "bg-card",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface DashboardCardProps extends VariantProps<typeof cardVariants> {
  title: string
  description: string
  value: string | number
  icon: ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
}

export function DashboardCard({
  title,
  description,
  value,
  icon,
  trend,
  variant,
}: DashboardCardProps) {
  return (
    <Card className={cardVariants({ variant })}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && (
          <div className={`text-xs mt-2 ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </div>
        )}
      </CardContent>
    </Card>
  )
}

