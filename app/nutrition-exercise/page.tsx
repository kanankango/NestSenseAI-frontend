'use client'

import { useState, useEffect } from 'react'
import { SidebarLayout } from '@/components/SidebarLayout'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { GradientText } from '@/components/GradientText'
import { Eye, Check, Plus } from 'lucide-react'
import { Apple, Activity, ArrowRight, Battery, Zap, Heart, Scale, Baby } from 'lucide-react'
import PlanDetailsModal from '@/components/PlanDetailsModal'

// const plans = [
//   {
//     title: 'Gentle Recovery',
//     description: 'A nurturing plan for immediate postpartum recovery, focusing on healing and gradual movement.',
//     nutrition: 'Nutrient-dense, easy-to-digest meals with emphasis on iron and vitamin C',
//     exercise: 'Gentle stretching, pelvic floor exercises, and short walks',
//     icon: <Heart className="w-8 h-8 text-pink-500" />,
//   },
//   {
//     title: 'Breastfeeding Boost',
//     description: 'Tailored for breastfeeding mothers to support milk production and maintain energy levels.',
//     nutrition: 'Increased calorie intake with focus on galactagogues and hydration',
//     exercise: 'Low-impact cardio and upper body strength training',
//     icon: <Baby className="w-8 h-8 text-blue-500" />,
//   },
//   {
//     title: 'Core Restoration',
//     description: 'Designed to safely rebuild core strength and address diastasis recti.',
//     nutrition: 'Balanced diet rich in protein and anti-inflammatory foods',
//     exercise: 'Specialized core exercises, breathing techniques, and posture improvement',
//     icon: <Zap className="w-8 h-8 text-yellow-500" />,
//   },
//   {
//     title: 'Gradual Strength',
//     description: 'For mothers looking to progressively regain overall strength and fitness.',
//     nutrition: 'High-protein diet with complex carbohydrates for sustained energy',
//     exercise: 'Progressive strength training starting with bodyweight exercises',
//     icon: <Activity className="w-8 h-8 text-green-500" />,
//   },
//   {
//     title: 'Energy Boost',
//     description: 'Focused on combating fatigue and boosting energy levels for busy new moms.',
//     nutrition: 'Balanced meals with emphasis on B vitamins, iron, and healthy fats',
//     exercise: 'Short, high-intensity workouts and energizing yoga sessions',
//     icon: <Battery className="w-8 h-8 text-orange-500" />,
//   },
//   {
//     title: 'Weight Management',
//     description: 'A balanced approach to gradual and healthy postpartum weight loss.',
//     nutrition: 'Portion-controlled, nutrient-dense meals with focus on lean proteins and vegetables',
//     exercise: 'Combination of cardio and strength training with gradual intensity increase',
//     icon: <Scale className="w-8 h-8 text-purple-500" />,
//   },
// ]
interface Plan {
  plan_id: number
  plan_name: string
  description: string
}

export default function NutritionExercise() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPlanId, setCurrentPlanId] = useState<number | null>(null)

  const handleViewDetails = (planId: number) => {
    setCurrentPlanId(planId)
    setIsModalOpen(true)
  }

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exercise/getPlans`)
        if (!response.ok) {
          throw new Error('Failed to fetch plans')
        }
        const data = await response.json()
        console.log('Fetched plans data:', data)  // Debug log
        
        // Ensure data is in the correct format
        const formattedPlans = data;
        console.log(formattedPlans)
        setPlans(formattedPlans)
        console.log(plans)  // Log plans state
        setLoading(false)
      } catch (error) {
        console.error('Error fetching plans:', error)
        setLoading(false)
      }
    }

    fetchPlans()
  }, [])

  return (
    <SidebarLayout>
      <div className="space-y-6">
        <div className="flex flex-col items-start mb-8">
          <h1 className="text-3xl md:text-4xl font-bold animate-fade-in mb-4">
            <GradientText>Personalized Postpartum Plans</GradientText>
          </h1>
          <p className="text-muted-foreground mb-4">Choose a plan tailored to your specific postpartum needs or create a custom plan.</p>
          <Button variant="outline" className="animate-fade-in" asChild>
            <a href="/custom-plan">Create Custom Plan</a>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {loading ? (
            <p>Loading plans...</p>
          ) : (
            plans.map((plan) => (
              <Card key={plan.plan_id} className={`transition-all duration-300 w-full ${
                selectedPlan === plan.plan_name ? 'ring-2 ring-primary' : ''
              } hover:shadow-lg`}>
                <CardHeader>
                  <CardTitle>{plan.plan_name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                
                <CardFooter className="flex gap-3 p-6">
                  <Button 
                    variant="outline"
                    className="flex-1 bg-white hover:bg-primary/10 text-primary hover:text-primary border-primary hover:border-primary"
                    onClick={() => handleViewDetails(plan.plan_id)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button 
                    variant={selectedPlan === plan.plan_name ? "default" : "outline"}
                    className={`flex-1 transition-colors ${
                      selectedPlan === plan.plan_name
                        ? "bg-primary hover:bg-primary/90 text-white" 
                        : "bg-white hover:bg-primary/10 text-primary hover:text-primary border-primary hover:border-primary"
                    }`}
                    onClick={() => setSelectedPlan(plan.plan_name)}
                  >
                    {selectedPlan === plan.plan_name ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Selected
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        Select Plan
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>

      <PlanDetailsModal 
        planId={currentPlanId}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setCurrentPlanId(null)
        }}
      />

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

