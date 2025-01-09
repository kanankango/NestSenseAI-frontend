'use client'

import { SidebarLayout } from '@/components/SidebarLayout'
import { FeatureCard } from '@/components/ui/feature-card'
import { Button } from '@/components/ui/button'
import { Apple, Activity, Moon, Brain, Baby, Heart } from 'lucide-react'
import { GradientText } from '@/components/GradientText'

const resources = [
  {
    icon: <Apple className="w-8 h-8" />,
    title: 'Nutrition Guide',
    description: 'Essential nutrients for postpartum recovery and breastfeeding success.',
    href: '/resources/nutrition'
  },
  {
    icon: <Activity className="w-8 h-8" />,
    title: 'Exercise Routines',
    description: 'Safe and effective workouts designed for postpartum recovery.',
    href: '/resources/exercise'
  },
  {
    icon: <Moon className="w-8 h-8" />,
    title: 'Sleep Tips',
    description: 'Strategies for better sleep quality during the fourth trimester.',
    href: '/resources/sleep'
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: 'Mental Wellness',
    description: 'Coping strategies and resources for emotional well-being.',
    href: '/resources/mental-health'
  },
  {
    icon: <Baby className="w-8 h-8" />,
    title: 'Baby Care',
    description: 'Expert advice on newborn care and development milestones.',
    href: '/resources/baby-care'
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: 'Self-Care',
    description: 'Simple ways to prioritize your well-being while caring for your baby.',
    href: '/resources/self-care'
  }
]

export default function Resources() {
  return (
    <SidebarLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold animate-fade-in mb-4 md:mb-0">
          <GradientText>Resource Hub</GradientText>
        </h1>
        <Button
          variant="outline"
          className="animate-fade-in"
          asChild
        >
          <a href="/resources/custom-plan">Create Custom Plan</a>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <FeatureCard
            key={index}
            icon={resource.icon}
            title={resource.title}
            description={resource.description}
            action={
              <Button
                variant="secondary"
                className="w-full group"
                asChild
              >
                <a href={resource.href}>
                  Learn More
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </Button>
            }
          />
        ))}
      </div>
    </SidebarLayout>
  )
}

