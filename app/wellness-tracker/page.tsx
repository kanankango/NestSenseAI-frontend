'use client'

import { useState } from 'react'
import { SidebarLayout } from '@/components/SidebarLayout'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Card } from '@/components/ui/card'
import { GradientText } from '@/components/GradientText'
import { saveDailyEntry, WellnessEntry } from '@/utils/api'
import { useAuth } from '../../hooks/useAuth' // Assuming you have an auth hook

const commonSymptoms = [
  'Fatigue',
  'Anxiety',
  'Sleep Issues',
  'Physical Discomfort',
  'Mood Swings',
  'Appetite Changes'
]

export default function WellnessTracker() {
  const { user } = useAuth() // Get the authenticated user
  const [moodLevel, setMoodLevel] = useState<number>(5)
  const [energyLevel, setEnergyLevel] = useState<number>(5)
  const [symptoms, setSymptoms] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const handleSymptomToggle = (symptom: string) => {
    setSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user?.id) {
      alert('Please log in to save your entry')
      return
    }
    
    setLoading(true)
  
    const entry: WellnessEntry = {
      user_id: user.id,
      entry_date: new Date().toISOString().split('T')[0],
      feeling_level: moodLevel,
      energy_level: energyLevel,
      fatigue: symptoms.includes('Fatigue'),
      anxiety: symptoms.includes('Anxiety'),
      sleep_issues: symptoms.includes('Sleep Issues'),
      physical_discomfort: symptoms.includes('Physical Discomfort'),
      mood_swings: symptoms.includes('Mood Swings'),
      appetite_changes: symptoms.includes('Appetite Changes')
    }
  
    try {
      await saveDailyEntry(entry)
      alert('Entry saved successfully!')
      // Reset form
      setMoodLevel(5)
      setEnergyLevel(5)
      setSymptoms([])
    } catch (error) {
      console.error('Error saving entry:', error)
      alert('Failed to save entry. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <SidebarLayout>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 animate-fade-in">
        <GradientText>Daily Wellness Tracker</GradientText>
      </h1>

      <Card className="max-w-2xl mx-auto p-6 animate-fade-in">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Mood Level Slider */}
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

          {/* Energy Level Slider */}
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

          {/* Symptoms Checklist */}
          <div className="space-y-4">
            <label className="block text-lg font-semibold">
              Any symptoms today?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {commonSymptoms.map(symptom => (
                <Button
                  key={symptom}
                  type="button"
                  variant={symptoms.includes(symptom) ? 'default' : 'outline'}
                  onClick={() => handleSymptomToggle(symptom)}
                  className="w-full"
                >
                  {symptom}
                </Button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={loading || !user?.id}
          >
            {loading ? 'Saving...' : "Save Today's Entry"}
          </Button>
        </form>
      </Card>
    </SidebarLayout>
  )
}