'use client'

import Link from 'next/link'
import { Header } from '@/components/Header'
import { FeatureCard } from '@/components/ui/feature-card'
import { Button } from '@/components/ui/button'
import { Apple, Activity, Moon, Brain, Baby, Heart, ChevronLeft } from 'lucide-react'

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
    <div className="min-h-screen bg-background">
      <Header showNavItems={true} />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/dashboard" className="flex items-center text-muted-foreground hover:text-foreground">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold animate-fade-in mb-4 md:mb-0">
            Resource Hub
          </h1>
          <Button
            variant="outline"
            className="animate-fade-in"
            asChild
          >
            <Link href="/resources/custom-plan">Create Custom Plan</Link>
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
                  <Link href={resource.href}>
                    Learn More
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </Button>
              }
            />
          ))}
        </div>
      </main>
    </div>
  )
}

