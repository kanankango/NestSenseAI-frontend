'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { ChevronLeft } from 'lucide-react'

export default function CustomPlan() {
  const [formData, setFormData] = useState({
    name: '',
    weeks: 4,
    goals: [] as string[],
    physicalActivity: 5,
    sleepQuality: 5,
    stressLevel: 5,
    dietaryPreferences: '',
    additionalInfo: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSliderChange = (name: string) => (value: number[]) => {
    setFormData({ ...formData, [name]: value[0] })
  }

  const handleGoalToggle = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend or AI service
    console.log(formData)
    alert('Custom plan request submitted! We\'ll generate your plan shortly.')
  }

  const goals = [
    "Weight Loss",
    "Improve Sleep",
    "Reduce Stress",
    "Increase Energy",
    "Strengthen Core",
    "Enhance Nutrition"
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header showNavItems={true} />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/resources" className="flex items-center text-muted-foreground hover:text-foreground">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Resources
            </Link>
          </Button>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Create Your Custom Plan</CardTitle>
            <CardDescription>Tell us about your goals and preferences for a tailored postpartum recovery plan.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Your Name</label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Plan Duration</label>
                <Select onValueChange={(value) => setFormData({ ...formData, weeks: parseInt(value) })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4">4 weeks</SelectItem>
                    <SelectItem value="8">8 weeks</SelectItem>
                    <SelectItem value="12">12 weeks</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Your Goals</label>
                <div className="grid grid-cols-2 gap-2">
                  {goals.map(goal => (
                    <Button
                      key={goal}
                      type="button"
                      variant={formData.goals.includes(goal) ? "default" : "outline"}
                      onClick={() => handleGoalToggle(goal)}
                      className="w-full"
                    >
                      {goal}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Physical Activity Level</label>
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  value={[formData.physicalActivity]}
                  onValueChange={handleSliderChange('physicalActivity')}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Sleep Quality</label>
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  value={[formData.sleepQuality]}
                  onValueChange={handleSliderChange('sleepQuality')}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Poor</span>
                  <span>Excellent</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Stress Level</label>
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  value={[formData.stressLevel]}
                  onValueChange={handleSliderChange('stressLevel')}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="dietaryPreferences" className="text-sm font-medium">Dietary Preferences</label>
                <Input
                  id="dietaryPreferences"
                  name="dietaryPreferences"
                  value={formData.dietaryPreferences}
                  onChange={handleChange}
                  placeholder="e.g., Vegetarian, Gluten-free, etc."
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="additionalInfo" className="text-sm font-medium">Additional Information</label>
                <Textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  placeholder="Any other details you'd like us to consider for your plan"
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full">
                Generate My Custom Plan
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

