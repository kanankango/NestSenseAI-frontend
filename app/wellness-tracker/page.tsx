'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Card } from '@/components/ui/card'
import { ChevronLeft } from 'lucide-react'

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log({ moodLevel, energyLevel, symptoms })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header showNavItems={true} />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/dashboard" className="flex items-center text-muted-foreground hover:text-foreground">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-8 animate-fade-in">
          Daily Wellness Tracker
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
      </main>
    </div>
  )
}

