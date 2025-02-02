'use client'

import { useState, useEffect } from 'react'
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

interface Activity {
  timeOfDay: 'Morning' | 'Mid-Day' | 'Afternoon' | 'Evening'
  name: string
  duration: number
}

interface Meal {
  timeOfDay: 'Breakfast' | 'Lunch' | 'Snack' | 'Dinner'
  name: string
  nutrition: string
  purpose: string
}

interface Week {
  description: string
  activities: Activity[]
  meals: Meal[]
}

interface PlanDetails {
  planName: string
  planGoal: string
  durationWeeks: number
  description: string
}

interface DatabaseActivity {
  id: string;
  name: string;
  activity_name: string;
  duration_mins?: number;
}

interface DatabaseMeal {
  meal_id: string;
  meal_name: string;
  nutritional_value: string;
  purpose: string;
}

export default function CustomPlan() {
  const [planDetails, setPlanDetails] = useState<PlanDetails>({
    planName: '',
    planGoal: 'Strength',
    durationWeeks: 1,
    description: ''
  })
  const [weeks, setWeeks] = useState<Week[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [availableActivities, setAvailableActivities] = useState<DatabaseActivity[]>([])
  const [availableMeals, setAvailableMeals] = useState<DatabaseMeal[]>([])

  // Fetch activities and meals when component mounts
  useEffect(() => {
    const fetchActivitiesAndMeals = async () => {
      try {

        const mealsRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exercise/getMeals`);
        console.log(mealsRes)
        if (mealsRes.ok) {
          const meals = await mealsRes.json();
          setAvailableMeals(meals);
        }

        // Update the fetch URL to match your backend endpoint
        const activitiesRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exercise/getActivities`);
        console.log(activitiesRes)
        
        if (activitiesRes.ok) {
          const activities = await activitiesRes.json();
          console.log('Fetched activities:', activities); // Debug log
          setAvailableActivities(activities);
        }
        
        // Comment out meals fetch for now since endpoint doesn't exist yet
        
      } catch (error) {
        console.error('Error fetching activities and meals:', error);
      }
    };

    fetchActivitiesAndMeals();
  }, []);

  // Add debug log to see if activities are in state
  useEffect(() => {
    console.log('Available activities in state:', availableActivities);
  }, [availableActivities]);

  useEffect(() => {
    console.log('Available meals in state:', availableMeals);
  }, [availableMeals]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exercise/createCustomPlan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planDetails, weeks }),
      })

      if (!response.ok) {
        throw new Error('Failed to save plan')
      }

      const data = await response.json()
      // Optionally redirect to the plan view page
      // router.push(/plans/${data.id})
    } catch (error) {
      console.error('Error saving plan:', error)
      // Optionally show error to user using a toast notification
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const addWeek = () => {
    setWeeks([...weeks, {
      description: '',
      activities: [],
      meals: []
    }])
  }

  const addActivity = (weekIndex: number) => {
    const newWeeks = [...weeks]
    newWeeks[weekIndex].activities.push({
      timeOfDay: 'Morning',
      name: '',
      duration: 0
    })
    setWeeks(newWeeks)
  }

  const addMeal = (weekIndex: number) => {
    const newWeeks = [...weeks]
    newWeeks[weekIndex].meals.push({
      timeOfDay: 'Breakfast',
      name: '',
      nutrition: '',
      purpose: ''
    })
    setWeeks(newWeeks)
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
                {/* Plan Details */}
                <div className="space-y-2">
                  <label htmlFor="planName" className="text-sm font-medium text-[#2C3E50]">Plan Name</label>
                  <Input
                    id="planName"
                    name="planName"
                    value={planDetails.planName}
                    onChange={(e) => setPlanDetails({...planDetails, planName: e.target.value})}
                    required
                    className="bg-white/50 border-[#75B5AE]/20 focus:border-[#75B5AE] focus:ring-[#75B5AE]"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="planGoal" className="text-sm font-medium text-[#2C3E50]">Plan Goal</label>
                  <Select
                    onValueChange={(value) => setPlanDetails({...planDetails, planGoal: value})}
                    value={planDetails.planGoal}
                  >
                    <SelectTrigger className="bg-white/50 border-[#75B5AE]/20 hover:border-[#75B5AE] focus:ring-[#75B5AE]">
                      <SelectValue placeholder="Select goal" />
                    </SelectTrigger>
                    <SelectContent 
                      side="bottom" 
                      className="bg-white/95 border-[#75B5AE]/20 shadow-md"
                    >
                      <SelectItem value="Strength" className="hover:bg-[#75B5AE]/10 focus:bg-[#75B5AE]/10">Strength</SelectItem>
                      <SelectItem value="Recovery" className="hover:bg-[#75B5AE]/10 focus:bg-[#75B5AE]/10">Recovery</SelectItem>
                      <SelectItem value="Weight Loss" className="hover:bg-[#75B5AE]/10 focus:bg-[#75B5AE]/10">Weight Loss</SelectItem>
                      <SelectItem value="Endurance" className="hover:bg-[#75B5AE]/10 focus:bg-[#75B5AE]/10">Endurance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="durationWeeks" className="text-sm font-medium text-[#2C3E50]">Duration (Weeks)</label>
                  <Input
                    id="durationWeeks"
                    name="durationWeeks"
                    type="number"
                    value={planDetails.durationWeeks}
                    onChange={(e) => setPlanDetails({...planDetails, durationWeeks: parseInt(e.target.value)})}
                    required
                    className="bg-white/50 border-[#75B5AE]/20 focus:border-[#75B5AE] focus:ring-[#75B5AE]"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium text-[#2C3E50]">Plan Description</label>
                  <Textarea
                    id="description"
                    name="description"
                    value={planDetails.description}
                    onChange={(e) => setPlanDetails({...planDetails, description: e.target.value})}
                    placeholder="Any other details you'd like us to consider for your plan"
                    rows={4}
                    className="bg-white/50 border-[#75B5AE]/20 focus:border-[#75B5AE] focus:ring-[#75B5AE]"
                  />
                </div>

                {/* Weeks & Activities */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#2C3E50]">Weeks & Activities</label>
                  <Button
                    type="button"
                    onClick={addWeek}
                    className="w-full py-6 text-lg rounded-xl bg-gradient-to-r from-[#75B5AE] to-[#F1C0C9] text-white hover:opacity-90 transition-all duration-300"
                  >
                    Add Week
                  </Button>
                </div>

                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="border rounded-md p-4 mb-4">
                    <h4 className="text-lg font-medium mb-3">Week {weekIndex + 1}</h4>
                    <textarea
                      placeholder="Week Description"
                      className="w-full rounded-md border border-gray-300 p-2 mb-4"
                      rows={2}
                      value={week.description}
                      onChange={(e) => {
                        const newWeeks = [...weeks]
                        newWeeks[weekIndex].description = e.target.value
                        setWeeks(newWeeks)
                      }}
                    />

                    <div className="mb-4">
                      <h5 className="font-medium mb-2">Activities</h5>
                      <Button
                        type="button"
                        onClick={() => addActivity(weekIndex)}
                        className="bg-gray-600 text-white px-3 py-1 rounded-md hover:bg-gray-700 mb-2"
                      >
                        Add Activity
                      </Button>
                      {week.activities.map((activity, activityIndex) => (
                        <div key={activityIndex} className="border rounded-md p-3 mb-2">
                          <select 
                            className="w-full rounded-md border border-gray-300 p-2 mb-2"
                            value={activity.timeOfDay}
                            onChange={(e) => {
                              const newWeeks = [...weeks]
                              newWeeks[weekIndex].activities[activityIndex].timeOfDay = e.target.value as Activity['timeOfDay']
                              setWeeks(newWeeks)
                            }}
                          >
                            <option value="Morning">Morning</option>
                            <option value="Mid-Day">Mid-Day</option>
                            <option value="Afternoon">Afternoon</option>
                            <option value="Evening">Evening</option>
                          </select>
                          <Select
                            value={activity.name}
                            onValueChange={(value) => {
                              const newWeeks = [...weeks];
                              const selectedActivity = availableActivities.find(a => a.activity_name === value);
                              if (selectedActivity) {
                                newWeeks[weekIndex].activities[activityIndex] = {
                                  ...newWeeks[weekIndex].activities[activityIndex],
                                  name: value,
                                  duration: selectedActivity.duration_mins || 0
                                };
                                setWeeks(newWeeks);
                              }
                            }}
                          >
                            <SelectTrigger className="w-full mb-2">
                              <SelectValue placeholder="Select an activity" />
                            </SelectTrigger>
                            <SelectContent side="bottom">
                              {availableActivities.map((dbActivity) => (
                                <SelectItem key={dbActivity.id} value={dbActivity.activity_name}>
                                  {dbActivity.activity_name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <input
                            type="number"
                            placeholder="Duration (mins)"
                            className="w-full rounded-md border border-gray-300 p-2"
                            value={activity.duration}
                            onChange={(e) => {
                              const newWeeks = [...weeks];
                              newWeeks[weekIndex].activities[activityIndex].duration = parseInt(e.target.value);
                              setWeeks(newWeeks);
                            }}
                          />
                        </div>
                      ))}
                    </div>

                    <div>
                      <h5 className="font-medium mb-2">Meals</h5>
                      <Button
                        type="button"
                        onClick={() => addMeal(weekIndex)}
                        className="bg-gray-600 text-white px-3 py-1 rounded-md hover:bg-gray-700 mb-2"
                      >
                        Add Meal
                      </Button>
                      {week.meals.map((meal, mealIndex) => (
                        <div key={mealIndex} className="border rounded-md p-3 mb-2">
                          <div className="space-y-3 ">
                            <Select
                              value={meal.name}
                              onValueChange={(value) => {
                                const newWeeks = [...weeks];
                                const selectedMeal = availableMeals.find(m => m.meal_name === value);
                                if (selectedMeal) {
                                  newWeeks[weekIndex].meals[mealIndex] = {
                                    ...newWeeks[weekIndex].meals[mealIndex],
                                    name: selectedMeal.meal_name,
                                    nutrition: selectedMeal.nutritional_value,
                                    purpose: selectedMeal.purpose
                                  };
                                  setWeeks(newWeeks);
                                }
                              }}
                            >
                              <SelectTrigger className="w-full border-[#75B5AE]/20 hover:border-[#75B5AE] focus:ring-[#75B5AE] text-black">
                                <SelectValue placeholder="Select a meal"  />
                              </SelectTrigger>
                              <SelectContent 
                                side="top" 
                              >
                                {availableMeals.map((dbMeal) => (
                                  <SelectItem 
                                    key={dbMeal.meal_id} 
                                    value={dbMeal.meal_name}
                                    className=""
                                  >
                                    {dbMeal.meal_name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>

                            <input
                              type="text"
                              placeholder="Nutritional Value"
                              className="w-full rounded-md border border-[#75B5AE]/20 p-2 bg-white/50"
                              value={meal.nutrition}
                              readOnly
                            />

                            <input
                              type="text"
                              placeholder="Purpose"
                              className="w-full rounded-md border border-[#75B5AE]/20 p-2 bg-white/50"
                              value={meal.purpose}
                              readOnly
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <Button 
                  type="submit" 
                  className="w-full py-6 text-lg rounded-xl bg-gradient-to-r from-[#75B5AE] to-[#F1C0C9] text-white hover:opacity-90 transition-all duration-300"
                >
                  Save Plan
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  )
}