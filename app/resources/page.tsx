'use client'

import { SidebarLayout } from '@/components/SidebarLayout'
import { FeatureCard } from '@/components/ui/feature-card'
import { Button } from '@/components/ui/button'
import { Apple, Activity, Brain, Baby, Heart } from 'lucide-react'
import { GradientText } from '@/components/GradientText'

const resources = [
  {
    icon: <Apple className="w-8 h-8 mr-2" />,
    secondIcon: <Activity className="w-8 h-8" />,
    title: 'Nutrition & Exercise',
    description: 'Essential nutrients and safe workouts for postpartum recovery.',
    href: '/resources/nutrition-exercise'
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: 'Mental Wellness',
    description: 'Coping strategies and resources for emotional well-being.',
    href: '#'
  },
  {
    icon: <Baby className="w-8 h-8" />,
    title: 'Baby Care',
    description: 'Expert advice on newborn care and development milestones.',
    href: '/resources/baby-care'
  }
]

export default function Resources() {
  return (
    <SidebarLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold animate-fade-in mb-4 md:mb-0">
          <GradientText>Resource Hub</GradientText>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <FeatureCard
            key={index}
            icon={
              <div className="flex items-center">
                {resource.icon}
                {resource.secondIcon}
              </div>
            }
            title={resource.title}
            description={resource.description}
            action={
              <Button
                variant="secondary"
                className="w-full group"
                asChild
              >
                <a href={resource.href}>
                  Get Started
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
