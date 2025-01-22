'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SidebarLayout } from '@/components/SidebarLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { ChevronLeft } from 'lucide-react'
import { GradientText } from '@/components/GradientText'

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
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <Button variant="ghost" asChild>
                <Link href="/nutrition-exercise" className="flex items-center text-[#2C3E50] hover:text-[#75B5AE]">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Go Back to Plans
                </Link>
              </Button>
            </div>

            <div className="bg-white/80 rounded-3xl p-6 md:p-8 shadow-lg border border-[#75B5AE]/10">
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-[#2C3E50]">
                  Create Your <span className="bg-gradient-to-r from-[#75B5AE] via-[#F1C0C9] to-[#75B5AE] text-transparent bg-clip-text bg-size-200 animate-gradient">Custom Plan</span>
                </h1>
                <p className="text-gray-600 mt-2">Tell us about your goals and preferences for a tailored postpartum recovery plan.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-[#2C3E50]">Your Name</label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-white/50 border-[#75B5AE]/20 focus:border-[#75B5AE] focus:ring-[#75B5AE]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#2C3E50]">Plan Duration</label>
                  <Select onValueChange={(value) => setFormData({ ...formData, weeks: parseInt(value) })}>
                    <SelectTrigger className="bg-white/50 border-[#75B5AE]/20">
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
                  <label className="text-sm font-medium text-[#2C3E50]">Your Goals</label>
                  <div className="grid grid-cols-2 gap-2">
                    {goals.map(goal => (
                      <Button
                        key={goal}
                        type="button"
                        variant={formData.goals.includes(goal) ? "default" : "outline"}
                        onClick={() => handleGoalToggle(goal)}
                        className={`w-full ${
                          formData.goals.includes(goal)
                            ? 'bg-gradient-to-r from-[#75B5AE] to-[#F1C0C9] text-white hover:opacity-90'
                            : 'border-[#75B5AE]/20 hover:border-[#75B5AE] hover:text-[#75B5AE]'
                        }`}
                      >
                        {goal}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#2C3E50]">Physical Activity Level</label>
                  <Slider
                    min={1}
                    max={10}
                    step={1}
                    value={[formData.physicalActivity]}
                    onValueChange={handleSliderChange('physicalActivity')}
                    className="[&_.slider-thumb]:bg-[#75B5AE] [&_.slider-track]:bg-[#75B5AE]/50"
                  />
                  <div className="flex justify-between text-xs text-[#2C3E50]/60">
                    <span>Low</span>
                    <span>High</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#2C3E50]">Sleep Quality</label>
                  <Slider
                    min={1}
                    max={10}
                    step={1}
                    value={[formData.sleepQuality]}
                    onValueChange={handleSliderChange('sleepQuality')}
                    className="[&_.slider-thumb]:bg-[#75B5AE] [&_.slider-track]:bg-[#75B5AE]/50"
                  />
                  <div className="flex justify-between text-xs text-[#2C3E50]/60">
                    <span>Poor</span>
                    <span>Excellent</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#2C3E50]">Stress Level</label>
                  <Slider
                    min={1}
                    max={10}
                    step={1}
                    value={[formData.stressLevel]}
                    onValueChange={handleSliderChange('stressLevel')}
                    className="[&_.slider-thumb]:bg-[#75B5AE] [&_.slider-track]:bg-[#75B5AE]/50"
                  />
                  <div className="flex justify-between text-xs text-[#2C3E50]/60">
                    <span>Low</span>
                    <span>High</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="dietaryPreferences" className="text-sm font-medium text-[#2C3E50]">Dietary Preferences</label>
                  <Input
                    id="dietaryPreferences"
                    name="dietaryPreferences"
                    value={formData.dietaryPreferences}
                    onChange={handleChange}
                    placeholder="e.g., Vegetarian, Gluten-free, etc."
                    className="bg-white/50 border-[#75B5AE]/20 focus:border-[#75B5AE] focus:ring-[#75B5AE]"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="additionalInfo" className="text-sm font-medium text-[#2C3E50]">Additional Information</label>
                  <Textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    placeholder="Any other details you'd like us to consider for your plan"
                    rows={4}
                    className="bg-white/50 border-[#75B5AE]/20 focus:border-[#75B5AE] focus:ring-[#75B5AE]"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full py-6 text-lg rounded-xl bg-gradient-to-r from-[#75B5AE] to-[#F1C0C9] text-white hover:opacity-90 transition-all duration-300"
                >
                  Generate My Custom Plan
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  )
}