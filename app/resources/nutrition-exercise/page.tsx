'use client'

import { useState } from 'react'
import { SidebarLayout } from '@/components/SidebarLayout'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { GradientText } from '@/components/GradientText'
import { Apple, Activity, ArrowRight, Battery, Zap, Heart, Scale, Baby } from 'lucide-react'

const plans = [
  {
    title: 'Gentle Recovery',
    description: 'A nurturing plan for immediate postpartum recovery, focusing on healing and gradual movement.',
    nutrition: 'Nutrient-dense, easy-to-digest meals with emphasis on iron and vitamin C',
    exercise: 'Gentle stretching, pelvic floor exercises, and short walks',
    icon: <Heart className="w-8 h-8 text-pink-500" />,
  },
  {
    title: 'Breastfeeding Boost',
    description: 'Tailored for breastfeeding mothers to support milk production and maintain energy levels.',
    nutrition: 'Increased calorie intake with focus on galactagogues and hydration',
    exercise: 'Low-impact cardio and upper body strength training',
    icon: <Baby className="w-8 h-8 text-blue-500" />,
  },
  {
    title: 'Core Restoration',
    description: 'Designed to safely rebuild core strength and address diastasis recti.',
    nutrition: 'Balanced diet rich in protein and anti-inflammatory foods',
    exercise: 'Specialized core exercises, breathing techniques, and posture improvement',
    icon: <Zap className="w-8 h-8 text-yellow-500" />,
  },
  {
    title: 'Gradual Strength',
    description: 'For mothers looking to progressively regain overall strength and fitness.',
    nutrition: 'High-protein diet with complex carbohydrates for sustained energy',
    exercise: 'Progressive strength training starting with bodyweight exercises',
    icon: <Activity className="w-8 h-8 text-green-500" />,
  },
  {
    title: 'Energy Boost',
    description: 'Focused on combating fatigue and boosting energy levels for busy new moms.',
    nutrition: 'Balanced meals with emphasis on B vitamins, iron, and healthy fats',
    exercise: 'Short, high-intensity workouts and energizing yoga sessions',
    icon: <Battery className="w-8 h-8 text-orange-500" />,
  },
  {
    title: 'Weight Management',
    description: 'A balanced approach to gradual and healthy postpartum weight loss.',
    nutrition: 'Portion-controlled, nutrient-dense meals with focus on lean proteins and vegetables',
    exercise: 'Combination of cardio and strength training with gradual intensity increase',
    icon: <Scale className="w-8 h-8 text-purple-500" />,
  },
]

export default function NutritionExercise() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  return (
    <SidebarLayout>
      <div className="flex flex-col items-start mb-8">
        <h1 className="text-3xl md:text-4xl font-bold animate-fade-in mb-4">
          <GradientText>Personalized Postpartum Plans</GradientText>
        </h1>
        <p className="text-muted-foreground mb-4">Choose a plan tailored to your specific postpartum needs or create a custom plan.</p>
        <Button variant="outline" className="animate-fade-in" asChild>
          <a href="/resources/custom-plan">Create Custom Plan</a>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <Card key={index} className={`transition-all duration-300 ${selectedPlan === plan.title ? 'ring-2 ring-primary' : ''}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{plan.title}</CardTitle>
                {plan.icon}
              </div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start mb-2">
                <Apple className="w-5 h-5 mr-2 mt-1 flex-shrink-0" />
                <p className="text-sm">{plan.nutrition}</p>
              </div>
              <div className="flex items-start">
                <Activity className="w-5 h-5 mr-2 mt-1 flex-shrink-0" />
                <p className="text-sm">{plan.exercise}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant={selectedPlan === plan.title ? "default" : "outline"} 
                className="w-full"
                onClick={() => setSelectedPlan(plan.title)}
              >
                {selectedPlan === plan.title ? 'Selected' : 'Select Plan'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedPlan && (
        <div className="mt-8 animate-fade-in">
          <Button className="group" asChild>
            <a href={`/resources/plan-details/${selectedPlan.toLowerCase().replace(' ', '-')}`}>
              Get Started with {selectedPlan}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      )}
    </SidebarLayout>
  )
}

