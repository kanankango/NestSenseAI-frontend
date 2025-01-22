'use client'

import { useState } from 'react'
import { SidebarLayout } from '@/components/SidebarLayout'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Card } from '@/components/ui/card'
import { Activity, Battery, ThermometerSun } from 'lucide-react'

export default function WellnessTracker() {
  const [moodLevel, setMoodLevel] = useState(5)
  const [energyLevel, setEnergyLevel] = useState(5)
  const [symptoms, setSymptoms] = useState<string[]>([])

  const commonSymptoms = [
    'Fatigue',
    'Anxiety',
    'Sleep Issues',
    'Physical Discomfort',
    'Mood Swings',
    'Appetite Changes'
  ]

  const handleSymptomToggle = (symptom: string) => {
    setSymptoms(prev => 
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const user_id = localStorage.getItem('user_id');
      const currentDate = new Date().toISOString();
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/wellness`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          user_id, 
          entry_date: currentDate,
          moodLevel, 
          energyLevel, 
          symptoms, 
        })
      })
    } catch (error) {
      console.error('Error submitting wellness data:', error)
    }
    console.log({ moodLevel, energyLevel, symptoms })
  }

  return (
    <SidebarLayout>
      <div className="min-h-screen bg-gradient-to-b from-[#FFF8F0] to-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-[#75B5AE]/40 to-[#F1C0C9]/40 rounded-full opacity-40 animate-blob"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-[#75B5AE]/40 to-[#F1C0C9]/40 rounded-full opacity-40 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-full h-full bg-gradient-to-b from-[#75B5AE]/40 to-[#F1C0C9]/40 rounded-full opacity-40 animate-blob animation-delay-4000"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-4 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-[#2C3E50]">
            Daily <span className="bg-gradient-to-r from-[#75B5AE] via-[#F1C0C9] to-[#75B5AE] text-transparent bg-clip-text bg-size-200 animate-gradient">Wellness Tracker</span>
          </h1>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white/80 rounded-3xl p-6 md:p-8 shadow-lg border border-[#75B5AE]/10 hover:shadow-xl transition-all duration-300">
              <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                {/* Mood Section */}
                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-[#75B5AE] to-[#F1C0C9] p-2 md:p-3">
                      <ThermometerSun className="w-full h-full text-white" />
                    </div>
                    <label className="text-xl md:text-2xl font-bold text-[#2C3E50]">
                      How are you feeling today?
                    </label>
                  </div>
                  <div className="px-4 py-4 md:px-4 md:py-6 bg-white/50 rounded-2xl border border-[#75B5AE]/10">
                    <Slider
                      value={[moodLevel]}
                      onValueChange={([value]) => setMoodLevel(value)}
                      max={10}
                      step={1}
                      className="mb-4"
                    />
                    <div className="flex justify-between text-sm text-[#2C3E50]">
                      <span>Not Great</span>
                      <span>Amazing</span>
                    </div>
                  </div>
                </div>

                {/* Energy Section */}
                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-[#75B5AE] to-[#F1C0C9] p-2 md:p-3">
                      <Battery className="w-full h-full text-white" />
                    </div>
                    <label className="text-xl md:text-2xl font-bold text-[#2C3E50]">
                      Energy Level
                    </label>
                  </div>
                  <div className="px-4 py-4 md:px-4 md:py-6 bg-white/50 rounded-2xl border border-[#75B5AE]/10">
                    <Slider
                      value={[energyLevel]}
                      onValueChange={([value]) => setEnergyLevel(value)}
                      max={10}
                      step={1}
                      className="mb-4"
                    />
                    <div className="flex justify-between text-sm text-[#2C3E50]">
                      <span>Low</span>
                      <span>High</span>
                    </div>
                  </div>
                </div>

                {/* Symptoms Section */}
                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-[#75B5AE] to-[#F1C0C9] p-2 md:p-3">
                      <Activity className="w-full h-full text-white" />
                    </div>
                    <label className="text-xl md:text-2xl font-bold text-[#2C3E50]">
                      Any symptoms today?
                    </label>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                    {commonSymptoms.map(symptom => (
                      <Button
                        key={symptom}
                        type="button"
                        className={`w-full rounded-xl transition-all duration-300 ${
                          symptoms.includes(symptom)
                            ? 'bg-gradient-to-r from-[#75B5AE] to-[#F1C0C9] text-white shadow-md hover:opacity-90'
                            : 'bg-white/50 border border-[#75B5AE]/10 hover:bg-gradient-to-r hover:from-[#75B5AE]/10 hover:to-[#F1C0C9]/10 text-[#2C3E50]'
                        }`}
                        onClick={() => handleSymptomToggle(symptom)}
                      >
                        {symptom}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full py-4 md:py-6 text-lg rounded-xl bg-gradient-to-r from-[#75B5AE] to-[#F1C0C9] text-white hover:opacity-90 transition-all duration-300"
                >
                  Save Today's Entry
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  )
}