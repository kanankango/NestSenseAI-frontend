import { cn } from "@/lib/utils"

interface GradientTextProps {
  children: React.ReactNode
  className?: string
}

export function GradientText({ children, className }: GradientTextProps) {
  return (
    <span className={cn(
      "bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500",
      className
    )}>
      {children}
    </span>
  )
}

