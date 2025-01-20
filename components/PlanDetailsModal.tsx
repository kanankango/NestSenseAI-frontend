import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Apple } from 'lucide-react'

interface PlanDetail {
  week_number: number
  description: string
  plan_activities: {
    activity_id: number
    time_of_day: string
    activities: {
      activity_name: string
      duration_mins: number
    }
  }[]
  plan_meals: {
    meal_id: number
    time_of_day: string
    meals: {
      meal_name: string
      nutritional_value: string
      purpose: string
      modifications: string
    }
  }[]
}

export const PlanDetailsModal = ({ planId, isOpen, onClose }: { planId: number | null, isOpen: boolean, onClose: () => void }) => {
  const [planDetails, setPlanDetails] = useState<PlanDetail[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchPlanDetails = async () => {
      if (!planId) return
      setLoading(true)
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exercise/getPlanDetails/${planId}`)
        const data = await response.json()
        console.log('Fetched data:', data) // Debug log
        setPlanDetails(Array.isArray(data) ? data : [])  // Ensure we always set an array
      } catch (error) {
        console.error('Error:', error)
        setPlanDetails([])  // Set empty array on error
      } finally {
        setLoading(false)
      }
    }

    if (isOpen && planId) {
      fetchPlanDetails()
    }
  }, [planId, isOpen])

  if (loading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Plan Details</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (!planDetails || planDetails.length === 0) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>No plan details available</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-2xl font-bold">Plan Details</DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto pr-2 flex-grow">
          <Tabs defaultValue="1" className="w-full">
            <TabsList className="grid grid-cols-4 gap-4 mb-4 sticky top-0 bg-background z-10">
              {planDetails.map((week) => (
                <TabsTrigger key={week.week_number} value={week.week_number.toString()}>
                  Week {week.week_number}
                </TabsTrigger>
                
              ))}
            </TabsList>
            {planDetails.map((week) => (
              <TabsContent key={week.week_number} value={week.week_number.toString()}>
                <div className="space-y-6">
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Week Overview</h3>
                    <p className="text-muted-foreground">{week.description}</p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Activities
                    </h3>
                    {week.plan_activities.map((activity, index) => (
                      <div key={index} className="bg-muted p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4" />
                          <span className="font-medium">{activity.time_of_day}</span>
                        </div>
                        <p>{activity.activities.activity_name}</p>
                        <p className="text-sm text-muted-foreground">
                          Duration: {activity.activities.duration_mins} mins
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Apple className="w-5 h-5" />
                      Meals
                    </h3>
                    {week.plan_meals.map((meal, index) => (
                      <div key={index} className="bg-muted p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4" />
                          <span className="font-medium">{meal.time_of_day}</span>
                        </div>
                        <p className="font-medium">{meal.meals.meal_name}</p>
                        <p className="text-sm mt-1">{meal.meals.nutritional_value}</p>
                        <p className="text-sm text-muted-foreground mt-2">{meal.meals.purpose}</p>
                        {meal.meals.modifications && (
                          <p className="text-sm italic mt-2">
                            Modifications: {meal.meals.modifications}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PlanDetailsModal;