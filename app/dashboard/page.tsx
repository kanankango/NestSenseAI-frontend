'use client'

import { SidebarLayout } from '@/components/SidebarLayout'
import { FeatureCard } from '@/components/ui/feature-card'
import { Button } from '@/components/ui/button'
import { Activity, Book, Users, Calendar, ChevronRight } from 'lucide-react'
import { GradientText } from '@/components/GradientText'

export default function Dashboard() {
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

