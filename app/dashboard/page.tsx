'use client'

import { SidebarLayout } from '@/components/SidebarLayout'
import { FeatureCard } from '@/components/ui/feature-card'
import { Button } from '@/components/ui/button'
import { Activity, Book, Users, Calendar, ChevronRight , Heart} from 'lucide-react'
import { GradientText } from '@/components/GradientText';
import {useRouter} from 'next/navigation';
import {useState , useEffect} from 'react';

export default function Dashboard() {

  //conditional rendering
  const router = useRouter();
  const [mounted, setMounted] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);  // Add this line

  // useEffect(() => {
  //   setMounted(true);
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     router.push('/auth');
  //   }
  //   // Add timeout to show loading state for 1 second
  //   setTimeout(() => {
  //     setIsAuthenticated(true);
  //     setIsLoading(false);
  //   }, 1000);
  // }, []); // Add dependency array

  // if (!isAuthenticated || isLoading) {
  //   return (
  //     <div className="flex flex-col items-center justify-center min-h-screen bg-background">
  //       <div className="relative p-12 space-y-8 bg-card/50 backdrop-blur-sm rounded-2xl shadow-lg border border-border/50">
  //         {/* Main container with improved centering */}
  //         <div className="relative flex items-center justify-center">
  //           {/* Heartbeat container with better dimensions */}
  //           <div className="relative w-40 h-40 flex items-center justify-center">
  //             {/* Gradient background for depth */}
  //             <div className="absolute inset-0 bg-gradient-to-br from-red-100/20 to-pink-100/20 rounded-full"></div>
              
  //             {/* Enhanced pulse rings */}
  //             <div className="absolute inset-0 rounded-full border-2 border-red-400/30 animate-ping"></div>
  //             <div className="absolute inset-4 rounded-full border-2 border-red-300/40 animate-ping" 
  //                  style={{ animationDelay: '0.2s' }}></div>
  //             <div className="absolute inset-8 rounded-full border-2 border-red-200/50 animate-ping"
  //                  style={{ animationDelay: '0.4s' }}></div>
              
  //             {/* Enhanced center heart */}
  //             <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
  //               {/* Heart shadow for depth */}
  //               <div className="absolute inset-0 blur-sm bg-red-500/30 rounded-full"></div>
                
  //               {/* Styled heart with gradient */}
  //               <div className="relative">
  //                 <Heart 
  //                   className="w-16 h-16 animate-bounce fill-red-500 text-red-600" 
  //                   style={{ 
  //                     animationDuration: '1.5s',
  //                     filter: 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.5))'
  //                   }} 
  //                 />
  //               </div>
  //             </div>
  //           </div>
  //         </div>

  //         {/* EKG Line - moved below heart */}
  //         <div className="w-48 h-6 relative overflow-hidden">
  //           <div className="absolute inset-0 flex items-center">
  //             <div className="w-full h-px bg-red-200 relative">
  //               <div className="absolute inset-0 animate-pulse">
  //                 <div className="absolute top-0 -translate-y-1 w-16 h-2 bg-gradient-to-r from-red-400 to-red-500 rounded-full transform -translate-x-full animate-ekg"></div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>

  //         {/* Loading text */}
  //         <div className="text-center space-y-2">
  //           <h3 className="text-xl font-semibold text-foreground">
  //             Loading
  //           </h3>
  //           <p className="text-sm text-muted-foreground">
  //             Please wait while we prepare your data
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <SidebarLayout>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 animate-fade-in">
        <GradientText>Welcome Back, Mom!</GradientText>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard
          icon={<Activity className="w-8 h-8 text-pink-500" />}
          title="Today's Wellness"
          description="Track your daily symptoms and mood to get personalized recommendations."
          action={
            <Button
              variant="secondary"
              className="w-full group"
              asChild
            >
              <a href="/wellness-tracker">
                Start Tracking
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          }
        />

        <FeatureCard
          icon={<Book className="w-8 h-8 text-purple-500" />}
          title="Resources for You"
          description="Expert articles and videos tailored to your recovery stage."
          action={
            <Button
              variant="secondary"
              className="w-full group"
              asChild
            >
              <a href="/resources">
                View Resources
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          }
        />

        <FeatureCard
          icon={<Users className="w-8 h-8 text-blue-500" />}
          title="Community Support"
          description="Connect with other moms and share your journey."
          action={
            <Button
              variant="secondary"
              className="w-full group"
              asChild
            >
              <a href="/community">
                Join Community
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          }
        />
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">
          <GradientText>Your Progress</GradientText>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card rounded-2xl p-6 border border-border animate-fade-in">
            <h3 className="text-lg font-semibold mb-4 text-blue-500">Weekly Overview</h3>
            <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
              Chart Placeholder
            </div>
          </div>
          <div className="bg-card rounded-2xl p-6 border border-border animate-fade-in">
            <h3 className="text-lg font-semibold mb-4 text-purple-500">Upcoming Activities</h3>
            <div className="space-y-4">
              <div className="p-3 bg-muted rounded-lg">Activity 1</div>
              <div className="p-3 bg-muted rounded-lg">Activity 2</div>
              <div className="p-3 bg-muted rounded-lg">Activity 3</div>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  )
}

