"use client"

import { Button } from "@/components/ui/button"
import type React from "react"
import { Activity, Book, Users, ChevronRight, Menu, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

// Mobile Sidebar Component (inline)
function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white/90 backdrop-blur-sm border-[#765133]/20"
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile sidebar overlay */}
      {isOpen && <div className="md:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setIsOpen(false)} />}

      {/* Mobile sidebar */}
      <aside
        className={`md:hidden fixed left-0 top-0 z-40 w-64 h-full bg-white border-r border-[#765133]/20 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 pt-16">
          {/* Logo Section */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#765133] to-[#8b6f47] mb-3">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#765133] to-[#8b6f47] text-transparent bg-clip-text">
              NestSenseAI
            </h1>
            <p className="text-xs text-gray-500 mt-1">Smart Wellness Platform</p>
          </div>
          <nav className="space-y-2">
            <a
              href="/dashboard"
              className="block px-3 py-2 rounded-lg bg-gradient-to-r from-[#765133] to-[#8b6f47] text-white"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </a>
            <a
              href="/wellness-tracker"
              className="block px-3 py-2 rounded-lg text-gray-600 hover:bg-[#765133]/10 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Wellness Tracker
            </a>
            <a
              href="/nutrition-exercise"
              className="block px-3 py-2 rounded-lg text-gray-600 hover:bg-[#765133]/10 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Nutrition & Exercise
            </a>
            <a
              href="/resources"
              className="block px-3 py-2 rounded-lg text-gray-600 hover:bg-[#765133]/10 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Resources
            </a>
            <a
              href="/community"
              className="block px-3 py-2 rounded-lg text-gray-600 hover:bg-[#765133]/10 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Community
            </a>
            <a
              href="/profile"
              className="block px-3 py-2 rounded-lg text-gray-600 hover:bg-[#765133]/10 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Profile
            </a>
          </nav>
        </div>
      </aside>
    </>
  )
}

// Sidebar Layout Component (inline)
function SidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <MobileSidebar />
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white border-r border-[#765133]/20 hidden md:block">
        <div className="p-6">
          {/* Logo Section */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#765133] to-[#8b6f47] mb-3">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#765133] to-[#8b6f47] text-transparent bg-clip-text">
              NestSenseAI
            </h1>
            <p className="text-xs text-gray-500 mt-1">Smart Wellness Platform</p>
          </div>
          <nav className="space-y-2">
            <a
              href="/dashboard"
              className="block px-3 py-2 rounded-lg bg-gradient-to-r from-[#765133] to-[#8b6f47] text-white"
            >
              Dashboard
            </a>
            <a
              href="/wellness-tracker"
              className="block px-3 py-2 rounded-lg text-gray-600 hover:bg-[#765133]/10 transition-colors"
            >
              Wellness Tracker
            </a>
            <a
              href="/nutrition-exercise"
              className="block px-3 py-2 rounded-lg text-gray-600 hover:bg-[#765133]/10 transition-colors"
            >
              Nutrition & Exercise
            </a>
            <a
              href="/resources"
              className="block px-3 py-2 rounded-lg text-gray-600 hover:bg-[#765133]/10 transition-colors"
            >
              Resources
            </a>
            <a
              href="/community"
              className="block px-3 py-2 rounded-lg text-gray-600 hover:bg-[#765133]/10 transition-colors"
            >
              Community
            </a>
            <a
              href="/profile"
              className="block px-3 py-2 rounded-lg text-gray-600 hover:bg-[#765133]/10 transition-colors"
            >
              Profile
            </a>
          </nav>
        </div>
      </aside>
      {/* Main content */}
      <main className="flex-1">{children}</main>
    </div>
  )
}

// Main Dashboard Component
export default function Dashboard() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {/* Inline CSS Styles */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .bg-size-200 {
          background-size: 200% 200%;
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>

      <SidebarLayout>
        <div className="min-h-screen bg-gradient-to-b from-white to-amber-50 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-amber-100/40 to-orange-100/30 rounded-full opacity-50 animate-blob"></div>
            <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-orange-100/30 to-amber-100/40 rounded-full opacity-50 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 w-full h-full bg-gradient-to-b from-amber-100/30 to-orange-100/40 rounded-full opacity-40 animate-blob animation-delay-4000"></div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 p-4 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-[#765133]">
              Welcome Back,{" "}
              <span className="bg-gradient-to-r from-[#765133] via-[#8b6f47] to-[#765133] text-transparent bg-clip-text bg-size-200 animate-gradient">
                Mom!
              </span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[
                {
                  icon: Activity,
                  title: "Today's Wellness",
                  description: "Track your daily symptoms and mood to get personalized recommendations.",
                  link: "/wellness-tracker",
                  buttonText: "Start Tracking",
                },
                {
                  icon: Book,
                  title: "Resources for You",
                  description: "Expert articles and videos tailored to your recovery stage.",
                  link: "/resources",
                  buttonText: "View Resources",
                },
                {
                  icon: Users,
                  title: "Community Support",
                  description: "Connect with other moms and share your journey.",
                  link: "/community",
                  buttonText: "Join Community",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-[#765133]/10 hover:shadow-xl hover:bg-white transition-all duration-300 group"
                >
                  <div className="inline-flex items-center justify-center w-12 md:w-16 h-12 md:h-16 rounded-2xl bg-gradient-to-br from-[#765133] to-[#8b6f47] p-3 md:p-4 mb-4 md:mb-6 group-hover:scale-105 transition-transform duration-300">
                    <feature.icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-[#765133]">{feature.title}</h3>
                  <p className="text-sm md:text-base text-gray-600 mb-6">{feature.description}</p>
                  <Button
                    className="w-full bg-gradient-to-r from-[#765133] to-[#8b6f47] text-white rounded-xl md:rounded-full hover:from-[#8b6f47] hover:to-[#a0845c] transition-all duration-300 group/btn text-sm md:text-base shadow-md hover:shadow-lg"
                    asChild
                  >
                    <a href={feature.link}>
                      {feature.buttonText}
                      <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-8 md:mt-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-[#765133]">
                Your{" "}
                <span className="bg-gradient-to-r from-[#765133] via-[#8b6f47] to-[#765133] text-transparent bg-clip-text bg-size-200 animate-gradient">
                  Progress
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-[#765133]/10 hover:shadow-xl hover:bg-white transition-all duration-300">
                  <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-[#765133] to-[#8b6f47] text-transparent bg-clip-text">
                    Weekly Overview
                  </h3>
                  <div className="h-36 md:h-48 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl md:rounded-2xl flex items-center justify-center border border-[#765133]/20 shadow-inner">
                    <span className="text-gray-500 font-medium">Chart Placeholder</span>
                  </div>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-[#765133]/10 hover:shadow-xl hover:bg-white transition-all duration-300">
                  <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-[#765133] to-[#8b6f47] text-transparent bg-clip-text">
                    Upcoming Activities
                  </h3>
                  <div className="space-y-3 md:space-y-4">
                    {[1, 2, 3].map((activity, index) => (
                      <div
                        key={index}
                        className="p-3 md:p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl md:rounded-2xl border border-[#765133]/20 hover:shadow-sm hover:from-white hover:to-amber-50 transition-all duration-300 text-sm md:text-base"
                      >
                        <span className="text-gray-700 font-medium">Activity {activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarLayout>
    </>
  )
}
