import { cn } from "@/lib/utils"

interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  title: string
  description: string
  action?: React.ReactNode
}

export function FeatureCard({
  icon,
  title,
  description,
  action,
  className,
  ...props
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-2xl p-6 border border-border card-hover animate-fade-in",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="mb-4 text-primary">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-text-secondary mb-4">{description}</p>
      {action && (
        <div className="mt-auto">
          {action}
        </div>
      )}
    </div>
  )
}

