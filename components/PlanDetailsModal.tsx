import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Apple } from 'lucide-react';

interface PlanDetail {
  week_number: number;
  description: string;
  plan_activities: {
    activity_id: number;
    time_of_day: string;
    activities: {
      activity_name: string;
      duration_mins: number;
    };
  }[];
  plan_meals: {
    meal_id: number;
    time_of_day: string;
    meals: {
      meal_name: string;
      nutritional_value: string;
      purpose: string;
      modifications: string;
    };
  }[];
}

export const PlanDetailsModal = ({ planId, isOpen, onClose }: { planId: number | null, isOpen: boolean, onClose: () => void }) => {
  const [planDetails, setPlanDetails] = useState<PlanDetail[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlanDetails = async () => {
      if (!planId) return;
      setLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exercise/getPlanDetails/${planId}`);
        const data = await response.json();
        setPlanDetails(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error:', error);
        setPlanDetails([]);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen && planId) {
      fetchPlanDetails();
    }
  }, [planId, isOpen]);

  return (
    <Dialog  open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col bg-white/80 rounded-2xl shadow-xl border border-[#75B5AE]/10 relative z-[1000] top-[-400px]">

        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute  -left-1/2 w-full h-full bg-gradient-to-r from-[#75B5AE]/20 to-[#F1C0C9]/20 rounded-full opacity-40 animate-blob"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-[#75B5AE]/20 to-[#F1C0C9]/20 rounded-full opacity-40 animate-blob animation-delay-2000"></div>
        </div>

        <DialogHeader className="flex-shrink-0 relative z-10">
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-[#75B5AE] via-[#F1C0C9] to-[#75B5AE] text-transparent bg-clip-text bg-size-200 animate-gradient text-center">
            Your Wellness Journey
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#75B5AE]" />
          </div>
        ) : planDetails.length === 0 ? (
          <div className="text-center p-6 text-gray-600 italic">No plan details available</div>
        ) : (
          <div className="overflow-y-auto pr-2 flex-grow relative z-10">
            <Tabs defaultValue="1" className="w-full">
              <TabsList className="grid grid-cols-4 gap-2 bg-white/90 p-2 rounded-xl shadow-md border border-[#75B5AE]/20">
                {planDetails.map((week) => (
                  <TabsTrigger 
                    key={week.week_number} 
                    value={week.week_number.toString()}
                    className="px-4 py-2 rounded-lg bg-white hover:bg-gradient-to-r hover:from-[#75B5AE]/10 hover:to-[#F1C0C9]/10 transition-all duration-300 shadow-sm"
                  >
                    Week {week.week_number}
                  </TabsTrigger>
                ))}
              </TabsList>

              {planDetails.map((week) => (
                <TabsContent key={week.week_number} value={week.week_number.toString()} className="p-4 space-y-6">
                  <div className="bg-white/90 p-6 rounded-lg border border-[#75B5AE]/20 shadow-md transition-all duration-300 hover:shadow-lg">
                    <h3 className="text-lg font-semibold bg-gradient-to-r from-[#75B5AE] to-[#F1C0C9] text-transparent bg-clip-text">
                      Week Overview
                    </h3>
                    <p className="text-gray-700 mt-2">{week.description}</p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-[#75B5AE]">
                      <Calendar className="w-5 h-5" /> Activities
                    </h3>
                    {week.plan_activities.map((activity, index) => (
                      <div 
                        key={index} 
                        className="bg-white/90 p-4 rounded-lg border-l-4 border-[#75B5AE] shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-[#75B5AE]" />
                          <span className="font-medium text-[#75B5AE]">{activity.time_of_day}</span>
                        </div>
                        <p className="text-gray-800 font-medium">{activity.activities.activity_name}</p>
                        <p className="text-sm text-gray-600">Duration: {activity.activities.duration_mins} mins</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-[#F1C0C9]">
                      <Apple className="w-5 h-5" /> Nutrition
                    </h3>
                    {week.plan_meals.map((meal, index) => (
                      <div 
                        key={index} 
                        className="bg-white/90 p-4 rounded-lg border-l-4 border-[#F1C0C9] shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-[#F1C0C9]" />
                          <span className="font-medium text-[#F1C0C9]">{meal.time_of_day}</span>
                        </div>
                        <p className="font-medium text-gray-800">{meal.meals.meal_name}</p>
                        <p className="text-sm text-gray-700 mt-1">{meal.meals.nutritional_value}</p>
                        <p className="text-sm text-gray-600 mt-2">{meal.meals.purpose}</p>
                        {meal.meals.modifications && (
                          <p className="text-sm italic mt-2 text-gray-500">
                            Modifications: {meal.meals.modifications}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PlanDetailsModal;