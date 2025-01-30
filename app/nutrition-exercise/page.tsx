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
      <div className="min-h-screen bg-gradient-to-b from-[#FFF8F0] to-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-[#75B5AE]/40 to-[#F1C0C9]/40 rounded-full opacity-40 animate-blob"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-[#75B5AE]/40 to-[#F1C0C9]/40 rounded-full opacity-40 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-full h-full bg-gradient-to-b from-[#75B5AE]/40 to-[#F1C0C9]/40 rounded-full opacity-40 animate-blob animation-delay-4000"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#75B5AE] via-[#F1C0C9] to-[#75B5AE] text-transparent bg-clip-text bg-size-200 animate-gradient">
              <span className="bg-gradient-to-r from-[#75B5AE] via-[#F1C0C9] to-[#75B5AE] text-transparent bg-clip-text bg-size-200 animate-gradient">Personalized Postpartum Plans</span>
              </h2>
              <div className="flex items-center justify-end mt-4">
                <Button 
                  variant="default" 
                  className="bg-gradient-to-r from-[#75B5AE] to-[#F1C0C9] text-white hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl" 
                  asChild
                >
                  <a href="/custom-plan">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Custom Plan
                  </a>
                </Button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {loading ? (
                <p>Loading plans...</p>
              ) : (
                plans.map((plan) => (
                  <Card 
                    key={plan.plan_id} 
                    className={`transition-all duration-300 ${
                      selectedPlan === plan.plan_name ? 'ring-2 ring-[#75B5AE]' : ''
                    } bg-white/80 shadow-lg border border-[#75B5AE]/10 hover:shadow-xl`}
                  >
                    <CardHeader>
                      <CardTitle className="text-[#2C3E50]">{plan.plan_name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    
                    <CardFooter className="flex gap-3 p-6">
                      <Button 
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-white hover:bg-[#75B5AE]/10 text-[#75B5AE] hover:text-[#75B5AE] border-[#75B5AE] hover:border-[#75B5AE]"
                        onClick={() => handleViewDetails(plan.plan_id)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button 
                        variant={selectedPlan === plan.plan_name ? "default" : "outline"}
                        size="sm"
                        className={`flex-1 transition-colors ${
                          selectedPlan === plan.plan_name
                            ? "bg-gradient-to-r from-[#75B5AE] to-[#F1C0C9] text-white hover:opacity-90" 
                            : "bg-white hover:bg-[#75B5AE]/10 text-[#75B5AE] hover:text-[#75B5AE] border-[#75B5AE] hover:border-[#75B5AE]"
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

            {selectedPlan && (
              <div className="mt-8">
                <Button 
                  className="bg-gradient-to-r from-[#75B5AE] to-[#F1C0C9] text-white hover:opacity-90 transition-all duration-300 group" 
                  asChild
                >
                  <a href={`/resources/plan-details/${selectedPlan.toLowerCase().replace(' ', '-')}`}>
                    Get Started with {selectedPlan}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            )}
          </div>
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
    </SidebarLayout>
  )
}