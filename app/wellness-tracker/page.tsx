"use client"

import type React from "react"
import { useState } from "react"
import { SidebarLayout } from "@/components/SidebarLayout"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Activity, Battery, ThermometerSun } from "lucide-react"

export default function WellnessTracker() {
  const [moodLevel, setMoodLevel] = useState(5)
  const [energyLevel, setEnergyLevel] = useState(5)
  const [symptoms, setSymptoms] = useState<string[]>([])

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

  return (
    <SidebarLayout>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 relative overflow-hidden">
        {/* Content */}
        <div className="relative z-10 p-4 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-[#765133]">
            Daily{" "}
            <span className="bg-gradient-to-r from-[#765133] via-[#8b6f47] to-[#a0845c] text-transparent bg-clip-text bg-size-200 animate-gradient">
              Wellness Tracker
            </span>
          </h1>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-[#765133]/20 p-6 md:p-8 transition-all duration-300">
              <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                {/* Mood Section */}
                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-[#765133] to-[#8b6f47] p-2 md:p-3 shadow-lg">
                      <ThermometerSun className="w-full h-full text-white" />
                    </div>
                    <label className="text-xl md:text-2xl font-bold text-[#765133]">How are you feeling today?</label>
                  </div>
                  <div className="px-4 py-4 md:px-4 md:py-6 bg-white/90 rounded-2xl border-2 border-[#765133]/30 shadow-lg hover:shadow-xl transition-all duration-300">
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
                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-[#765133] to-[#8b6f47] p-2 md:p-3 shadow-lg">
                      <Battery className="w-full h-full text-white" />
                    </div>
                    <label className="text-xl md:text-2xl font-bold text-[#765133]">Energy Level</label>
                  </div>
                  <div className="px-4 py-4 md:px-4 md:py-6 bg-white/90 rounded-2xl border-2 border-[#765133]/30 shadow-lg hover:shadow-xl transition-all duration-300">
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
                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-[#765133] to-[#8b6f47] p-2 md:p-3 shadow-lg">
                      <Activity className="w-full h-full text-white" />
                    </div>
                    <label className="text-xl md:text-2xl font-bold text-[#765133]">Any symptoms today?</label>
                  </div>
                  <div className="px-4 py-4 md:px-4 md:py-6 bg-white/90 rounded-2xl border-2 border-[#765133]/30 shadow-lg hover:shadow-xl transition-all duration-300">
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
                <div className="pt-4">
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
      </div>
    </SidebarLayout>
  )
}
