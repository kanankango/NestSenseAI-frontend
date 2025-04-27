import { Brain, Heart, Calendar, Users, Leaf, BookOpen } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
      {/* Gradient background layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-[#f8f3ee] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Decorative corner elements */}
      <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[#a46c47] rotate-45 translate-x-12 -translate-y-12 group-hover:rotate-90 transition-transform duration-700"></div>
      </div>
      
      {/* Floating dots pattern */}
      <div className="absolute bottom-4 left-4 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
        <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-[#765133]"></div>
        <div className="absolute top-0 left-6 w-2 h-2 rounded-full bg-[#765133]"></div>
        <div className="absolute top-6 left-0 w-2 h-2 rounded-full bg-[#765133]"></div>
        <div className="absolute top-6 left-6 w-2 h-2 rounded-full bg-[#765133]"></div>
      </div>

      {/* Card content */}
      <div className="p-8 pb-16 relative z-10">
        {/* Animated icon container */}
        <div className="relative mb-6">
          <div className="absolute -left-2 -top-2 w-16 h-16 bg-[#a46c47]/20 rounded-lg group-hover:rotate-12 transition-transform duration-500"></div>
          <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-lg bg-[#a46c47] shadow-md group-hover:scale-110 transition-transform duration-300">
            <Icon className="h-8 w-8 text-white group-hover:rotate-6 transition-transform duration-500" strokeWidth={1.5} />
          </div>
        </div>

        <h3 className="text-xl font-bold text-[#765133] mb-3 group-hover:text-[#a46c47] transition-colors duration-300">{title}</h3>
        <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">{description}</p>

        {/* Animated bottom accent line */}
        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gray-100 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#a46c47] to-[#765133] w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
        </div>

        {/* Animated "Learn more" button */}
        <div className="absolute bottom-6 right-6">
          <button className="flex items-center px-4 py-2 rounded-full bg-[#765133]/5 text-[#765133] group-hover:bg-[#765133] group-hover:text-white transition-all duration-300">
            <span className="mr-2 text-sm font-medium">Learn more</span>
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              className="group-hover:translate-x-1 transition-transform duration-300"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-gradient-to-b from-white to-[#faf6f2]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-6 py-2 rounded-full text-sm font-medium bg-[#765133]/10 text-[#765133] border border-[#765133]/20 hover:bg-[#765133]/20 transition-colors duration-300">
              Our Features
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-[#765133] mb-6">
            Features and Benefits
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#a46c47] to-[#765133] mx-auto mt-4 rounded-full"></div>
          </h2>
          <p className="text-lg text-[#765133]/90 max-w-2xl mx-auto">
            Discover the tools and resources designed to support your mental and physical wellbeing during the
            postpartum period.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={Brain}
            title="Mental Health Support"
            description="Access resources for managing postpartum depression, anxiety, and other emotional challenges."
          />
          <FeatureCard
            icon={Heart}
            title="Self-Care Routines"
            description="Discover personalized self-care practices that fit into your busy schedule as a new mother."
          />
          <FeatureCard
            icon={Calendar}
            title="Daily Tracking"
            description="Mood, health, and wellness tracking tools to monitor your progress and identify patterns."
          />
          <FeatureCard
            icon={Users}
            title="Community Connection"
            description="Connect with other mothers who understand what you're going through."
          />
          <FeatureCard
            icon={Leaf}
            title="Personalized Diet & Workouts"
            description="Customized nutrition plans and gentle exercises designed for postpartum recovery."
          />
          <FeatureCard
            icon={BookOpen}
            title="Expert Resources"
            description="Access a library of articles, videos, and guides from healthcare professionals."
          />
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection