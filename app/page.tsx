"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Header } from '@/components/Header'
import { Heart, Baby, Brain, Calendar, Users, Moon, ArrowRight, ArrowUp } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useEffect, useState } from 'react'

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#FFF8F0] to-white">
      <Header />
      
      <main className="flex-grow flex flex-col relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-[#75B5AE]/40 to-[#F1C0C9]/40 rounded-full opacity-40 animate-blob"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-[#75B5AE]/40 to-[#F1C0C9]/40 rounded-full opacity-40 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-full h-full bg-gradient-to-b from-[#75B5AE]/40 to-[#F1C0C9]/40 rounded-full opacity-40 animate-blob animation-delay-4000"></div>
        </div>

        {/* Hero Section */}
        <section className="relative z-10 pt-16 pb-20">
          <div className="container mx-auto px-4 text-center max-w-6xl">
            <div className="mb-4 flex justify-center mt-[-80px]" >
  <div className="relative w-[500px] h-[500px] mb-5">
    <Image
      src="/logo.png"
      alt="NestSense Logo"
      fill
      className="object-contain"
      priority
    />
  </div>
</div>

            <h2 className="text-3xl md:text-5xl font-bold tracking-tight fade-in-up [--animation-delay:200ms] text-[#2C3E50] mb-6 max-w-5xl mx-auto mt-[-80px]">
  Your Postpartum Mate,{' '}
  <span className="bg-gradient-to-r from-[#75B5AE] via-[#F1C0C9] to-[#75B5AE] text-transparent bg-clip-text bg-size-200 animate-gradient">
    For Every State
  </span>
</h2>
<p className="text-xl text-gray-600 fade-in-up [--animation-delay:400ms] max-w-3xl mx-auto mb-8 mt-[-10px]">
  Empowering new mothers with personalized care plans, expert guidance, 
  and a supportive community for a healthier postpartum journey.
</p>
<Button 
  size="lg" 
  className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-[#75B5AE] to-[#F1C0C9] text-white hover:opacity-90 group fade-in-up [--animation-delay:600ms]" 
  asChild
>
  <Link href="/auth" className="flex items-center gap-2">
    Start Your Journey
    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
  </Link>
</Button>

          </div>
        </section>

        {/* Features Section */}
        <section className="relative z-10 py-20 bg-white/10">
          <div className="container mx-auto px-4">
            <div className="space-y-24">
              {[
                {
                  icon: Heart,
                  title: "Personalized Care Plans",
                  description: "Get customized wellness routines tailored to your unique postpartum journey. Our AI-powered system adapts to your needs, providing daily recommendations and adjusting based on your progress.",
                  image: "/plans.jpg",
                  reverse: false
                },
                {
                  icon: Brain,
                  title: "Mental Health Support",
                  description: "Access comprehensive mental health resources and support for emotional well-being during your recovery. Connect with licensed professionals and get personalized coping strategies.",
                  image: "/bot.jpg",
                  reverse: true
                },
                {
                  icon: Baby,
                  title: "Expert Guidance",
                  description: "Learn from certified professionals about postpartum and baby care. Access a library of expert-curated content and get real-time answers to your questions.",
                  image: "/baby.jpg",
                  reverse: false
                },
                {
                  icon: Calendar,
                  title: "Progress Tracking",
                  description: "Monitor your recovery journey with intuitive tracking tools. Visualize your progress and celebrate milestones along the way.",
                  image: "/wellness.jpg",
                  reverse: true
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className={`flex flex-col ${feature.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 fade-in-up`}
                >
                  <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#75B5AE] to-[#F1C0C9] p-4 mb-6">
                      <feature.icon className="w-full h-full text-white" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4 text-[#2C3E50]">
                      {feature.title}
                    </h3>
                    <p className="text-xl text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                  <div className="flex-1 relative">
  <div className="aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-[#75B5AE]/20 to-[#F1C0C9]/20 shadow-lg">
    <Image
      src={feature.image}
      alt={feature.title}
      fill
      className="object-cover"
      priority
    />
  </div>
</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="relative z-10 py-20">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-4xl font-bold text-center mb-12 text-[#2C3E50]">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: "How does NestSense personalize care plans?",
                  answer: "NestSense uses advanced AI algorithms to analyze your unique needs, preferences, and recovery progress. We consider factors like your delivery type, physical condition, and emotional well-being to create a tailored plan that evolves with you."
                },
                {
                  question: "How does the progress tracking work?",
                  answer: "Our intuitive tracking system allows you to log your physical and emotional well-being daily. You'll get visual insights into your recovery journey, and our AI adjusts your care plan based on your progress."
                },
                {
                  question: "Is my data secure and private?",
                  answer: "Absolutely. We take your privacy seriously and employ industry-leading security measures to protect your personal information. All data is encrypted and stored securely following HIPAA guidelines."
                },
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white/80 rounded-2xl px-6 shadow-sm border border-[#75B5AE]/10">
                  <AccordionTrigger className="text-lg font-medium text-[#2C3E50] hover:text-[#75B5AE]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className={`fixed right-8 bottom-8 p-4 rounded-full bg-gradient-to-r from-[#75B5AE] to-[#F1C0C9] text-white shadow-lg hover:shadow-xl transition-all duration-300 z-50 ${
            showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      </main>

      <footer className="py-8 text-center text-sm text-gray-600 bg-gradient-to-t from-white to-transparent">
        <div className="container mx-auto px-4">
          <p>© 2025 NestSense. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}