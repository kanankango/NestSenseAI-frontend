"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  Activity,
  Battery,
  ThermometerSun,
  Menu,
  Home,
  Apple,
  BookOpen,
  Users,
  User,
  ChevronLeft,
  ChevronRight,
  X,
  Calendar,
  TrendingUp,
  Heart,
} from "lucide-react"

export default function WellnessTracker() {
  const [moodLevel, setMoodLevel] = useState(5)
  const [energyLevel, setEnergyLevel] = useState(5)
  const [symptoms, setSymptoms] = useState<string[]>([])
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const commonSymptoms = [
    "Fatigue",
    "Anxiety",
    "Sleep Issues",
    "Physical Discomfort",
    "Mood Swings",
    "Appetite Changes",
  ]

  const handleSymptomToggle = (symptom: string) => {
    setSymptoms((prev) => (prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const user_id = localStorage.getItem("user_id")
      const currentDate = new Date().toISOString()
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/wellness`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id,
          entry_date: currentDate,
          moodLevel,
          energyLevel,
          symptoms,
        }),
      })
    } catch (error) {
      console.error("Error submitting wellness data:", error)
    }
    console.log({ moodLevel, energyLevel, symptoms })
  }

  const navigationItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/wellness-tracker", label: "Wellness Tracker", icon: Activity, active: true },
    { href: "/nutrition-exercise", label: "Nutrition & Exercise", icon: Apple },
    { href: "/resources", label: "Resources", icon: BookOpen },
    { href: "/community", label: "Community", icon: Users },
    { href: "/profile", label: "Profile", icon: User },
  ]

  const getMoodEmoji = (level: number) => {
    if (level <= 2) return "😢"
    if (level <= 4) return "😕"
    if (level <= 6) return "😐"
    if (level <= 8) return "🙂"
    return "😊"
  }

  const getEnergyColor = (level: number) => {
    if (level <= 3) return "from-red-400 to-red-600"
    if (level <= 6) return "from-yellow-400 to-orange-500"
    return "from-green-400 to-green-600"
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Sidebar */}
      <aside
        className={`${isSidebarCollapsed ? "w-20" : "w-72"} transition-all duration-300 bg-white shadow-xl border-r border-[#765133]/10 flex flex-col relative hidden lg:flex`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-[#765133]/10">
          <div className="flex items-center justify-between">
            {!isSidebarCollapsed && (
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-[#765133] via-[#8b6f47] to-[#a0845c] text-transparent bg-clip-text">
                  Postpartum
                </h1>
                <p className="text-sm text-gray-600 mt-1">Wellness Platform</p>
              </div>
            )}
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-2 rounded-lg hover:bg-[#765133]/10 transition-colors text-[#765133]"
            >
              {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    item.active
                      ? "bg-gradient-to-r from-[#765133] to-[#8b6f47] text-white shadow-lg"
                      : "text-gray-600 hover:bg-[#765133]/10 hover:text-[#765133]"
                  }`}
                  title={isSidebarCollapsed ? item.label : undefined}
                >
                  <Icon
                    size={20}
                    className={`${item.active ? "text-white" : "text-gray-500 group-hover:text-[#765133]"} transition-colors`}
                  />
                  {!isSidebarCollapsed && <span className="font-medium">{item.label}</span>}
                  {item.active && !isSidebarCollapsed && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-white/80"></div>
                  )}
                </a>
              )
            })}
          </div>
        </nav>

        {/* Sidebar Footer */}
        {!isSidebarCollapsed && (
          <div className="p-4 border-t border-[#765133]/10">
            <div className="bg-gradient-to-r from-[#765133]/10 to-[#8b6f47]/10 rounded-xl p-4">
              <h3 className="font-semibold text-[#765133] text-sm mb-1">Track Progress</h3>
              <p className="text-xs text-gray-600 mb-3">View your wellness journey insights</p>
              <Button
                size="sm"
                className="w-full bg-gradient-to-r from-[#765133] to-[#8b6f47] hover:from-[#8b6f47] hover:to-[#a0845c] text-white"
              >
                View Analytics
              </Button>
            </div>
          </div>
        )}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileSidebarOpen(false)} />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-72 bg-white shadow-xl border-r border-[#765133]/10 transform transition-transform duration-300 z-50 lg:hidden ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Sidebar Header */}
        <div className="p-6 border-b border-[#765133]/10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-[#765133] via-[#8b6f47] to-[#a0845c] text-transparent bg-clip-text">
                Postpartum
              </h1>
              <p className="text-sm text-gray-600 mt-1">Wellness Platform</p>
            </div>
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-[#765133]/10 transition-colors text-[#765133]"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    item.active
                      ? "bg-gradient-to-r from-[#765133] to-[#8b6f47] text-white shadow-lg"
                      : "text-gray-600 hover:bg-[#765133]/10 hover:text-[#765133]"
                  }`}
                  onClick={() => setIsMobileSidebarOpen(false)}
                >
                  <Icon
                    size={20}
                    className={`${item.active ? "text-white" : "text-gray-500 group-hover:text-[#765133]"} transition-colors`}
                  />
                  <span className="font-medium">{item.label}</span>
                  {item.active && <div className="ml-auto w-2 h-2 rounded-full bg-white/80"></div>}
                </a>
              )
            })}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white shadow-sm border-b border-[#765133]/10 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-[#765133]/10 transition-colors text-[#765133]"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-lg font-bold bg-gradient-to-r from-[#765133] via-[#8b6f47] to-[#a0845c] text-transparent bg-clip-text">
              Wellness Tracker
            </h1>
            <div className="w-10"></div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Desktop Header */}
            <div className="mb-8 hidden lg:block">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-[#765133] to-[#8b6f47] shadow-lg">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-[#765133] via-[#8b6f47] to-[#a0845c] text-transparent bg-clip-text">
                    Daily Wellness Tracker
                  </h1>
                  <p className="text-gray-600 mt-1">Track your daily mood, energy, and symptoms</p>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-[#765133]/20 shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Heart className="w-6 h-6 text-[#765133]" />
                  <h3 className="font-semibold text-[#765133]">Current Mood</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getMoodEmoji(moodLevel)}</span>
                  <span className="text-2xl font-bold text-[#765133]">{moodLevel}/10</span>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-[#765133]/20 shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Battery className="w-6 h-6 text-[#765133]" />
                  <h3 className="font-semibold text-[#765133]">Energy Level</h3>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${getEnergyColor(energyLevel)}`}></div>
                  <span className="text-2xl font-bold text-[#765133]">{energyLevel}/10</span>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-[#765133]/20 shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-6 h-6 text-[#765133]" />
                  <h3 className="font-semibold text-[#765133]">Symptoms</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-[#765133]">{symptoms.length}</span>
                  <span className="text-gray-600">selected</span>
                </div>
              </div>
            </div>

            {/* Main Form */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-[#765133]/20 overflow-hidden">
              <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
                {/* Mood Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#765133] to-[#8b6f47] p-3 shadow-lg">
                      <ThermometerSun className="w-full h-full text-white" />
                    </div>
                    <div>
                      <label className="text-2xl font-bold text-[#765133] block">How are you feeling today?</label>
                      <p className="text-gray-600 text-sm">Rate your overall mood and emotional state</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-[#765133]/5 to-[#8b6f47]/5 rounded-2xl p-6 border-2 border-[#765133]/20">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl">{getMoodEmoji(moodLevel)}</span>
                      <span className="text-3xl font-bold text-[#765133]">{moodLevel}/10</span>
                    </div>
                    <Slider
                      value={[moodLevel]}
                      onValueChange={([value]) => setMoodLevel(value)}
                      max={10}
                      step={1}
                      className="mb-4"
                    />
                    <div className="flex justify-between text-sm text-[#765133]/70">
                      <span>Not Great</span>
                      <span>Amazing</span>
                    </div>
                  </div>
                </div>

                {/* Energy Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#765133] to-[#8b6f47] p-3 shadow-lg">
                      <Battery className="w-full h-full text-white" />
                    </div>
                    <div>
                      <label className="text-2xl font-bold text-[#765133] block">Energy Level</label>
                      <p className="text-gray-600 text-sm">How energetic do you feel right now?</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-[#765133]/5 to-[#8b6f47]/5 rounded-2xl p-6 border-2 border-[#765133]/20">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-10 h-10 rounded-full bg-gradient-to-r ${getEnergyColor(energyLevel)} shadow-lg`}
                      ></div>
                      <span className="text-3xl font-bold text-[#765133]">{energyLevel}/10</span>
                    </div>
                    <Slider
                      value={[energyLevel]}
                      onValueChange={([value]) => setEnergyLevel(value)}
                      max={10}
                      step={1}
                      className="mb-4"
                    />
                    <div className="flex justify-between text-sm text-[#765133]/70">
                      <span>Low</span>
                      <span>High</span>
                    </div>
                  </div>
                </div>

                {/* Symptoms Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#765133] to-[#8b6f47] p-3 shadow-lg">
                      <Activity className="w-full h-full text-white" />
                    </div>
                    <div>
                      <label className="text-2xl font-bold text-[#765133] block">Any symptoms today?</label>
                      <p className="text-gray-600 text-sm">Select all that apply to your current state</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-[#765133]/5 to-[#8b6f47]/5 rounded-2xl p-6 border-2 border-[#765133]/20">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {commonSymptoms.map((symptom) => (
                        <button
                          key={symptom}
                          type="button"
                          onClick={() => handleSymptomToggle(symptom)}
                          className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 border-2 ${
                            symptoms.includes(symptom)
                              ? "bg-gradient-to-r from-[#765133] to-[#8b6f47] text-white border-[#765133] shadow-lg transform scale-105"
                              : "bg-white/90 text-[#765133] border-2 border-[#765133]/40 hover:border-[#765133] hover:bg-[#765133]/5"
                          }`}
                        >
                          {symptom}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#765133] to-[#8b6f47] hover:from-[#8b6f47] hover:to-[#a0845c] text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    Save Today's Entry
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
