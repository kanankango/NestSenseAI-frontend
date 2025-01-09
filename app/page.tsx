import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Header } from '@/components/Header'
import { Heart, Baby, Brain, Calendar, Users, Moon } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex flex-col justify-center items-center gradient-bg relative overflow-hidden pt-32 md:pt-40">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-pink-200 rounded-full opacity-20 animate-blob"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-purple-200 rounded-full opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-full h-full bg-blue-200 rounded-full opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 py-24 md:py-32 text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-12 mb-24">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight fade-in-up [--animation-delay:200ms]">
              Your Compassionate Guide Through{' '}
              <span className="gradient-text">Postpartum Recovery</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground fade-in-up [--animation-delay:400ms]">
              Empowering new mothers with personalized care plans, expert guidance, 
              and a supportive community for a healthier postpartum journey.
            </p>
            <div className="fade-in-up [--animation-delay:600ms]">
              <Button size="lg" className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300" asChild>
                <Link href="/auth">
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
              <div key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 fade-in-up" style={{ '--animation-delay': `${800 + index * 100}ms` } as React.CSSProperties}>
                <feature.icon className="w-12 h-12 text-primary mb-4 mx-auto" />
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative image */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-5xl">
          <Image
            src="/mother-and-baby.png"
            alt="Mother and baby illustration"
            width={1000}
            height={300}
            className="w-full h-auto opacity-50"
          />
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-muted-foreground bg-background">
        © 2025 NestSenseAI. All rights reserved.
      </footer>
    </div>
  )
}

