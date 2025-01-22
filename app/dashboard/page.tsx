'use client'

import { SidebarLayout } from '@/components/SidebarLayout'
import { FeatureCard } from '@/components/ui/feature-card'
import { Button } from '@/components/ui/button'
import { Activity, Book, Users, Calendar, ChevronRight, Heart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Dashboard() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);  // Add this line

  return (
    <SidebarLayout>
      <div className="min-h-screen bg-gradient-to-b from-[#FFF8F0] to-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-[#75B5AE]/40 to-[#F1C0C9]/40 rounded-full opacity-40 animate-blob"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-[#75B5AE]/40 to-[#F1C0C9]/40 rounded-full opacity-40 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-full h-full bg-gradient-to-b from-[#75B5AE]/40 to-[#F1C0C9]/40 rounded-full opacity-40 animate-blob animation-delay-4000"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 p-4 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-[#2C3E50]">
            Welcome Back, <span className="bg-gradient-to-r from-[#75B5AE] via-[#F1C0C9] to-[#75B5AE] text-transparent bg-clip-text bg-size-200 animate-gradient">Mom!</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                icon: Activity,
                title: "Today's Wellness",
                description: "Track your daily symptoms and mood to get personalized recommendations.",
                link: "/wellness-tracker",
                buttonText: "Start Tracking"
              },
              {
                icon: Book,
                title: "Resources for You",
                description: "Expert articles and videos tailored to your recovery stage.",
                link: "/resources",
                buttonText: "View Resources"
              },
              {
                icon: Users,
                title: "Community Support",
                description: "Connect with other moms and share your journey.",
                link: "/community",
                buttonText: "Join Community"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white/80 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-[#75B5AE]/10 hover:shadow-xl transition-all duration-300">
                <div className="inline-flex items-center justify-center w-12 md:w-16 h-12 md:h-16 rounded-2xl bg-gradient-to-br from-[#75B5AE] to-[#F1C0C9] p-3 md:p-4 mb-4 md:mb-6">
                  <feature.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-[#2C3E50]">{feature.title}</h3>
                <p className="text-sm md:text-base text-gray-600 mb-6">{feature.description}</p>
                <Button 
                  className="w-full bg-gradient-to-r from-[#75B5AE] to-[#F1C0C9] text-white rounded-xl md:rounded-full hover:opacity-90 transition-all duration-300 group text-sm md:text-base"
                  asChild
                >
                  <a href={feature.link}>
                    {feature.buttonText}
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-8 md:mt-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-[#2C3E50]">
              Your <span className="bg-gradient-to-r from-[#75B5AE] via-[#F1C0C9] to-[#75B5AE] text-transparent bg-clip-text bg-size-200 animate-gradient">Progress</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-white/80 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-[#75B5AE]/10 hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-[#75B5AE] to-[#F1C0C9] text-transparent bg-clip-text">Weekly Overview</h3>
                <div className="h-36 md:h-48 bg-gray-50 rounded-xl md:rounded-2xl flex items-center justify-center border border-[#75B5AE]/10">
                  Chart Placeholder
                </div>
              </div>
              <div className="bg-white/80 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-[#75B5AE]/10 hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-[#75B5AE] to-[#F1C0C9] text-transparent bg-clip-text">Upcoming Activities</h3>
                <div className="space-y-3 md:space-y-4">
                  {[1, 2, 3].map((activity, index) => (
                    <div key={index} className="p-3 md:p-4 bg-gray-50 rounded-xl md:rounded-2xl border border-[#75B5AE]/10 hover:shadow-sm transition-all duration-300 text-sm md:text-base">
                      Activity {activity}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  )
}