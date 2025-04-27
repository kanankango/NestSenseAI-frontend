import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-24 h-24">
        <div className="absolute top-0 right-0 w-full h-full bg-[#a46c47] rotate-45 translate-x-12 -translate-y-12"></div>
      </div>

      {/* Card content */}
      <div className="p-8 pb-16 relative z-10">
        {/* Icon container with offset shadow effect */}
        <div className="relative mb-6">
          <div className="absolute -left-2 -top-2 w-16 h-16 bg-[#a46c47]/20 rounded-lg"></div>
          <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-lg bg-[#a46c47] shadow-md">
            <Icon className="h-8 w-8 text-white" strokeWidth={1.5} />
          </div>
        </div>

        <h3 className="text-xl font-bold text-[#765133] mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>

        {/* Bottom accent line with animation */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100">
          <div className="h-full bg-[#a46c47] w-0 group-hover:w-full transition-all duration-500 ease-out"></div>
        </div>

        {/* Read more indicator */}
        <div className="absolute bottom-6 right-6 flex items-center text-sm font-medium text-[#a46c47] opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <span className="mr-2">Learn more</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5 12H19M19 12L12 5M19 12L12 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default FeatureCard
