'use client'

import { useState } from 'react'
import { SidebarLayout } from '@/components/SidebarLayout'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Card } from '@/components/ui/card'
import { GradientText } from '@/components/GradientText'

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
      <h1 className="text-3xl md:text-4xl font-bold mb-8 animate-fade-in">
        <GradientText>Daily Wellness Tracker</GradientText>
      </h1>

      <Card className="max-w-2xl mx-auto p-6 animate-fade-in">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <label className="block text-lg font-semibold">
              How are you feeling today?
            </label>
            <div className="px-2">
              <Slider
                value={[moodLevel]}
                onValueChange={([value]) => setMoodLevel(value)}
                max={10}
                step={1}
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>Not Great</span>
                <span>Amazing</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-lg font-semibold">
              Energy Level
            </label>
            <div className="px-2">
              <Slider
                value={[energyLevel]}
                onValueChange={([value]) => setEnergyLevel(value)}
                max={10}
                step={1}
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-lg font-semibold">
              Any symptoms today?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {commonSymptoms.map(symptom => (
                <Button
                  key={symptom}
                  type="button"
                  variant={symptoms.includes(symptom) ? "default" : "outline"}
                  onClick={() => handleSymptomToggle(symptom)}
                  className="w-full"
                >
                  {symptom}
                </Button>
              ))}
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full"
          >
            Save Today's Entry
          </Button>
        </form>
      </Card>
    </SidebarLayout>
  )
}

