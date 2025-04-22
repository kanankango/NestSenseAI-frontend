"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart, Brain, Calendar, ArrowRight, ArrowUp, Sparkles, Users, BookOpen, Leaf } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"
import Link from "next/link"

const Header = () => {
  return (
    <header className="bg-white py-4 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-[#7b68ee]" />
          <span className="font-bold text-[#7b68ee] text-xl">NestSense</span>
        </div>
        <nav>
          <ul className="hidden md:flex space-x-8">
            <li>
              <a href="#home" className="text-gray-600 hover:text-[#7b68ee] transition-colors font-medium">
                Home
              </a>
            </li>
            <li>
              <a href="#features" className="text-gray-600 hover:text-[#7b68ee] transition-colors font-medium">
                Features
              </a>
            </li>
            <li>
              <a href="#mission" className="text-gray-600 hover:text-[#7b68ee] transition-colors font-medium">
                Our Mission
              </a>
            </li>
            <li>
              <a href="#benefits" className="text-gray-600 hover:text-[#7b68ee] transition-colors font-medium">
                Benefits
              </a>
            </li>
          </ul>
        </nav>
        <Button className="bg-[#7b68ee] hover:bg-[#6a5acd] text-white">Get Started</Button>
      </div>
    </header>
  )
}

interface StatCardProps {
  number: string
  text: string
}

const StatCard = ({ number, text }: StatCardProps) => (
  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 transform transition-all hover:shadow-lg hover:border-[#7b68ee]/50">
    <div className="text-3xl font-bold text-[#7b68ee]">{number}</div>
    <div className="text-gray-600">{text}</div>
  </div>
)

interface FloatingIconProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  top?: string
  left?: string
  right?: string
  delay?: number
}

const FloatingIcon = ({ icon: Icon, top, left, right, delay = 0 }: FloatingIconProps) => (
  <div
    className="absolute p-3 bg-white rounded-xl shadow-md z-20 border border-gray-100"
    style={{
      top,
      left,
      right,
      animation: `float 6s ease-in-out infinite ${delay}s`,
      boxShadow: "0 4px 12px rgba(123, 104, 238, 0.2)",
    }}
  >
    <Icon className="w-6 h-6 text-[#7b68ee]" />
  </div>
)

interface FeatureCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  title: string
  description: string
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg hover:border-[#7b68ee]/50 transition-all">
    <div className="w-12 h-12 bg-[#f5f3ff] rounded-full flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-[#7b68ee]" />
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
)

export default function Page() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const animationStyles = `
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    @keyframes fade-in-up {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes gradient-x {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    .animate-fade-in-up {
      animation: fade-in-up 0.6s ease-out forwards;
    }
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    .animate-gradient-x {
      animation: gradient-x 10s ease infinite;
      background-size: 200% 200%;
    }
  `

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <style>{animationStyles}</style>
      <Header />

      <main className="flex-grow flex flex-col">
        {/* Hero Section */}
        <section id="home" className="relative z-10 pt-16 pb-20 md:py-24 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col lg:flex-row items-center gap-12">
              {/* Content left side */}
              <div className="w-full lg:w-1/2 relative z-10">
                <div className="space-y-6 max-w-xl animate-fade-in-up">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
                    Navigating Motherhood with{" "}
                    <span className="bg-gradient-to-r from-[#7b68ee] to-[#a78bfa] text-transparent bg-clip-text animate-gradient-x">
                      Confidence & Care
                    </span>
                  </h1>
                  <p className="text-lg md:text-xl text-gray-600">
                    Your personalized postpartum companion offering tailored wellness plans, mental health support, and
                    expert guidance for new mothers.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      size="lg"
                      className="text-white bg-[#7b68ee] hover:bg-[#6a5acd] rounded-lg px-6 py-3 font-medium group"
                    >
                      <span className="flex items-center gap-2">
                        Begin Your Journey
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-[#7b68ee] text-[#7b68ee] hover:bg-[#7b68ee]/10 rounded-lg px-6 py-3 font-medium"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>

              {/* Image right side */}
              <div className="w-full lg:w-1/2 relative">
                {/* Main image */}
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl animate-fade-in-up">
                  <Image
                    src="/1.png"
                    width={600}
                    height={600}
                    alt="Happy mother with baby"
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Floating elements */}
                <FloatingIcon icon={Heart} top="-24px" right="-24px" />
                <FloatingIcon icon={Brain} top="50%" left="-16px" delay={1} />
                <FloatingIcon icon={Calendar} top="calc(100% - 24px)" right="48px" delay={2} />
              </div>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fade-in-up">
              <StatCard number="10,000+" text="New Mothers Supported" />
              <StatCard number="97%" text="Satisfaction Rate" />
              <StatCard number="24/7" text="Expert Support Available" />
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section id="intro" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Take Control of Your Postpartum Journey
              </h2>
              <p className="text-lg text-gray-600">
                New mothers often experience physical and mental health challenges, including mood swings, depression,
                insecurity, and difficulty in establishing routines. Our platform provides the tools and support you
                need during this transformative time.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Image
                  src="/placeholder.svg?height=500&width=500"
                  width={500}
                  height={500}
                  alt="Mother using NestSense"
                  className="rounded-xl shadow-lg"
                />
              </div>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-[#f5f3ff] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="font-bold text-[#7b68ee]">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Personalized Assessment</h3>
                    <p className="text-gray-600">
                      Complete a comprehensive assessment to help us understand your unique needs and challenges.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-[#f5f3ff] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="font-bold text-[#7b68ee]">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Tailored Care Plan</h3>
                    <p className="text-gray-600">
                      Receive a customized wellness plan designed specifically for your postpartum journey.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-[#f5f3ff] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="font-bold text-[#7b68ee]">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Ongoing Support</h3>
                    <p className="text-gray-600">
                      Access expert guidance, community support, and resources whenever you need them.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Features and Benefits</h2>
              <p className="text-lg text-gray-600">
                Discover the tools and resources designed to support your mental and physical wellbeing during the
                postpartum period.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={Brain}
                title="Mental Health Support"
                description="Access resources for managing postpartum depression, anxiety, and other emotional challenges."
              />
              <FeatureCard
                icon={Heart}
                title="Self-Care Routines"
                description="Discover personalized self-care practices that fit into your busy schedule as a new mother."
              />
              <FeatureCard
                icon={Calendar}
                title="Daily Tracking"
                description="Mood, health, and wellness tracking tools to monitor your progress and identify patterns."
              />
              <FeatureCard
                icon={Users}
                title="Community Connection"
                description="Connect with other mothers who understand what you're going through."
              />
              <FeatureCard
                icon={Leaf}
                title="Personalized Diet & Workouts"
                description="Customized nutrition plans and gentle exercises designed for postpartum recovery."
              />
              <FeatureCard
                icon={BookOpen}
                title="Expert Resources"
                description="Access a library of articles, videos, and guides from healthcare professionals."
              />
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section id="mission" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-600 mb-6">
                  We believe that every new mother deserves comprehensive support during the postpartum period. Our
                  mission is to provide accessible, personalized care that addresses both physical and mental wellbeing.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  By combining expert knowledge, innovative technology, and compassionate care, we aim to transform the
                  postpartum experience for mothers everywhere.
                </p>
                <div className="flex gap-4 mt-8">
                  <Button className="bg-[#7b68ee] hover:bg-[#6a5acd] text-white">Join Our Community</Button>
                  <Button variant="outline" className="border-[#7b68ee] text-[#7b68ee] hover:bg-[#7b68ee]/10">
                    Learn More
                  </Button>
                </div>
              </div>
              <div>
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  width={600}
                  height={500}
                  alt="Team of experts"
                  className="rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Benefits of NestSense</h2>
              <p className="text-lg text-gray-600">
                See how our platform has helped thousands of mothers navigate their postpartum journey with confidence.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">For New Mothers</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#f5f3ff] flex items-center justify-center flex-shrink-0 mt-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#7b68ee" />
                      </svg>
                    </div>
                    <p className="text-gray-600">Reduced feelings of isolation and anxiety</p>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#f5f3ff] flex items-center justify-center flex-shrink-0 mt-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#7b68ee" />
                      </svg>
                    </div>
                    <p className="text-gray-600">Improved confidence in parenting abilities</p>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#f5f3ff] flex items-center justify-center flex-shrink-0 mt-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#7b68ee" />
                      </svg>
                    </div>
                    <p className="text-gray-600">Better physical recovery through guided self-care</p>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#f5f3ff] flex items-center justify-center flex-shrink-0 mt-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#7b68ee" />
                      </svg>
                    </div>
                    <p className="text-gray-600">Enhanced bonding with baby through mindfulness practices</p>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">For Healthcare Providers</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#f5f3ff] flex items-center justify-center flex-shrink-0 mt-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#7b68ee" />
                      </svg>
                    </div>
                    <p className="text-gray-600">Extended care beyond hospital or clinic visits</p>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#f5f3ff] flex items-center justify-center flex-shrink-0 mt-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#7b68ee" />
                      </svg>
                    </div>
                    <p className="text-gray-600">Better patient outcomes through continuous support</p>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#f5f3ff] flex items-center justify-center flex-shrink-0 mt-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#7b68ee" />
                      </svg>
                    </div>
                    <p className="text-gray-600">Early identification of postpartum complications</p>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#f5f3ff] flex items-center justify-center flex-shrink-0 mt-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#7b68ee" />
                      </svg>
                    </div>
                    <p className="text-gray-600">Comprehensive data to inform personalized care plans</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: "How does NestSense personalize care plans?",
                  answer:
                    "NestSense uses advanced algorithms to analyze your unique needs, preferences, and recovery progress. We consider factors like your delivery type, physical condition, and emotional well-being to create a tailored plan that evolves with you.",
                },
                {
                  question: "Is NestSense suitable for all new mothers?",
                  answer:
                    "Yes! NestSense is designed to support mothers at all stages of the postpartum journey, whether you're a first-time mom or experienced parent. Our personalized approach ensures that you receive support that's relevant to your specific situation.",
                },
                {
                  question: "How does the progress tracking work?",
                  answer:
                    "Our intuitive tracking system allows you to log your physical and emotional well-being daily. You'll get visual insights into your recovery journey, and our system adjusts your care plan based on your progress.",
                },
                {
                  question: "Can I connect with healthcare providers through the website?",
                  answer:
                    "Yes, NestSense offers the option to connect with licensed healthcare providers for virtual consultations. You can also share your progress data with your existing healthcare team to ensure coordinated care.",
                },
                {
                  question: "Is my data secure and private?",
                  answer:
                    "Absolutely. We take your privacy seriously and employ industry-leading security measures to protect your personal information. All data is encrypted and stored securely following HIPAA guidelines.",
                },
              ].map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="bg-gray-50 rounded-xl px-6 shadow-sm border border-gray-200"
                >
                  <AccordionTrigger className="text-lg font-medium text-gray-800 hover:text-[#7b68ee]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-[#7b68ee] to-[#a78bfa]">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white rounded-2xl p-12 text-center shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Begin Your Postpartum Journey Today</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-600">
                Join thousands of mothers who have found support, guidance, and community during their postpartum
                journey. Get started today and experience the difference.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  size="lg"
                  className="text-white bg-[#7b68ee] hover:bg-[#6a5acd] rounded-lg px-8 py-3 font-medium"
                >
                  <span className="flex items-center gap-2">Get Started</span>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#7b68ee] text-[#7b68ee] hover:bg-[#7b68ee]/10 rounded-lg px-8 py-3 font-medium"
                >
                  <span className="flex items-center gap-2">Learn More</span>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className={`fixed right-8 bottom-8 p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 ${
            showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
          }`}
          style={{
            background: "linear-gradient(135deg, #7b68ee 0%, #6a5acd 100%)",
            color: "white",
            boxShadow: "0 10px 15px -3px rgba(123, 104, 238, 0.2), 0 4px 6px -2px rgba(123, 104, 238, 0.1)",
          }}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      </main>

      <footer className="py-12 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-6 w-6 text-[#7b68ee]" />
                <span className="font-bold text-[#7b68ee] text-xl">NestSense</span>
              </div>
              <p className="text-gray-600 mb-4">
                Your trusted companion for postpartum wellness and mental health support.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-[#7b68ee] hover:text-[#6a5acd]" aria-label="Follow us on Twitter">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M22.46 6C21.69 6.35 20.86 6.58 20 6.69C20.88 6.16 21.56 5.32 21.88 4.31C21.05 4.81 20.13 5.16 19.16 5.36C18.37 4.5 17.26 4 16 4C13.65 4 11.73 5.92 11.73 8.29C11.73 8.63 11.77 8.96 11.84 9.27C8.28 9.09 5.11 7.38 3 4.79C2.63 5.42 2.42 6.16 2.42 6.94C2.42 8.43 3.17 9.75 4.33 10.5C3.62 10.5 2.96 10.3 2.38 10V10.03C2.38 12.11 3.86 13.85 5.82 14.24C5.46 14.34 5.08 14.39 4.69 14.39C4.42 14.39 4.15 14.36 3.89 14.31C4.43 16 6 17.26 7.89 17.29C6.43 18.45 4.58 19.13 2.56 19.13C2.22 19.13 1.88 19.11 1.54 19.07C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79C20.33 8.6 20.33 8.42 20.32 8.23C21.16 7.63 21.88 6.87 22.46 6Z"
                      fill="currentColor"
                    />
                  </svg>
                </Link>
                <Link href="#" className="text-[#7b68ee] hover:text-[#6a5acd]" aria-label="Follow us on Instagram">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7.8 2H16.2C19.4 2 22 4.6 22 7.8V16.2C22 19.4 19.4 22 16.2 22H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2ZM7.6 4C5.61 4 4 5.61 4 7.6V16.4C4 18.39 5.61 20 7.6 20H16.4C18.39 20 20 18.39 20 16.4V7.6C20 5.61 18.39 4 16.4 4H7.6ZM17.25 5.5C17.94 5.5 18.5 6.06 18.5 6.75C18.5 7.44 17.94 8 17.25 8C16.56 8 16 7.44 16 6.75C16 6.06 16.56 5.5 17.25 5.5ZM12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z"
                      fill="currentColor"
                    />
                  </svg>
                </Link>
                <Link href="#" className="text-[#7b68ee] hover:text-[#6a5acd]" aria-label="Follow us on LinkedIn">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H6.5V10H9V17ZM7.7 8.7C6.8 8.7 6 7.9 6 7C6 6.1 6.8 5.3 7.7 5.3C8.6 5.3 9.4 6.1 9.4 7C9.4 7.9 8.6 8.7 7.7 8.7ZM18 17H15.5V13.5C15.5 12.7 14.8 12 14 12C13.2 12 12.5 12.7 12.5 13.5V17H10V10H12.5V11.3C12.9 10.5 13.8 10 14.9 10C16.6 10 18 11.4 18 13.1V17Z"
                      fill="currentColor"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#home" className="text-gray-600 hover:text-[#7b68ee]">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#features" className="text-gray-600 hover:text-[#7b68ee]">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#mission" className="text-gray-600 hover:text-[#7b68ee]">
                    Our Mission
                  </Link>
                </li>
                <li>
                  <Link href="#benefits" className="text-gray-600 hover:text-[#7b68ee]">
                    Benefits
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-[#7b68ee]">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-[#7b68ee]">
                    Support Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-[#7b68ee]">
                    Community
                  </Link>
                </li>
                </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="text-gray-300">hello@nestsense.com</li>
                <li className="text-gray-300">+1 (800) 123-4567</li>
                <li className="text-gray-300">123 Wellness Street, Suite 100</li>
                <li className="text-gray-300">San Francisco, CA 94103</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-[#2a2a4a] text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} NestSense. All rights reserved.</p>
            <div className="flex justify-center gap-6 mt-4">
              <Link href="#" className="hover:text-[#7b68ee]">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-[#7b68ee]">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-[#7b68ee]">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}