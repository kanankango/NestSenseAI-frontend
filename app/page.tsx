import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Header } from '@/components/Header'
import { Heart, Baby, Brain, Calendar, Users, Moon } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex flex-col justify-center items-center gradient-bg">
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="max-w-3xl mx-auto space-y-8 mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight fade-in-up [--animation-delay:200ms]">
              Your Compassionate Guide Through{' '}
              <span className="gradient-text">Postpartum Recovery</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground fade-in-up [--animation-delay:400ms]">
              Empowering new mothers with personalized care plans, expert guidance, 
              and a supportive community for a healthier postpartum journey.
            </p>
            <div className="fade-in-up [--animation-delay:600ms]">
              <Button size="lg" className="text-lg" asChild>
                <Link href="/create-account">
                  Start Your Journey
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Heart, title: "Personalized Care Plans", description: "Get customized wellness routines tailored to your unique postpartum journey." },
              { icon: Brain, title: "Mental Health Support", description: "Access resources and support for emotional well-being during your recovery." },
              { icon: Baby, title: "Expert Guidance", description: "Learn from certified professionals about postpartum and baby care." },
              { icon: Calendar, title: "Progress Tracking", description: "Monitor your recovery journey with intuitive tracking tools." },
              { icon: Users, title: "Community Support", description: "Connect with other mothers and share experiences in a safe space." },
              { icon: Moon, title: "Sleep Improvement", description: "Get personalized tips to enhance your sleep quality during this crucial time." },
            ].map((feature, index) => (
              <div key={index} className="bg-card/50 backdrop-blur-sm rounded-lg p-6 fade-in-up" style={{ '--animation-delay': `${800 + index * 100}ms` } as React.CSSProperties}>
                <feature.icon className="w-10 h-10 text-primary mb-4 mx-auto" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-muted-foreground">
        © 2025 NestSenseAI. All rights reserved.
      </footer>
    </div>
  )
}

