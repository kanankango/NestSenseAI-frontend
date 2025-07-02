"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, Sparkles, Leaf, Heart, Cloud, BirdIcon, ArrowRight, Moon, Sun } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

// Feature Card Component
const FeatureCard = ({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: React.ElementType
  title: string
  description: string
  index: number
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.1 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#765133]/20 to-[#a57a59]/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative bg-white/90 dark:bg-[#2a1c12]/90 backdrop-blur-sm rounded-xl p-5 border border-[#765133]/10 dark:border-[#765133]/20 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-lg bg-gradient-to-br from-[#f0e6df] to-[#e8d5c8] dark:from-[#765133]/30 dark:to-[#a57a59]/30">
            <Icon className="w-5 h-5 text-[#765133] dark:text-[#d4b8a4]" />
          </div>
          <div>
            <h3 className="font-medium text-[#4a3321] dark:text-white mb-1">{title}</h3>
            <p className="text-sm text-[#765133]/80 dark:text-[#d4b8a4]/90">{description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Floating Elements Component
const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: Math.random() * 100 - 50 + "%",
            y: Math.random() * 100 + "%",
            opacity: 0.3 + Math.random() * 0.4,
            scale: 0.5 + Math.random() * 0.5,
          }}
          animate={{
            y: [null, "-20%"],
            rotate: [0, Math.random() * 360],
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        >
          {i % 4 === 0 && <Leaf className="w-6 h-6 text-[#765133]/30 dark:text-[#a57a59]/20" />}
          {i % 4 === 1 && <Heart className="w-5 h-5 text-[#a57a59]/30 dark:text-[#c49a7c]/20" />}
          {i % 4 === 2 && <Cloud className="w-7 h-7 text-[#8b6141]/30 dark:text-[#8b6141]/20" />}
          {i % 4 === 3 && <BirdIcon className="w-5 h-5 text-[#5d3f28]/30 dark:text-[#d4b8a4]/20" />}
        </motion.div>
      ))}
    </div>
  )
}

// Theme Toggle Component
const ThemeToggle = ({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) => {
  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-[#2a1c12]/80 backdrop-blur-sm shadow-md z-50"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="w-5 h-5 text-[#d4b8a4]" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="w-5 h-5 text-[#765133]" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}

export default function Page() {
  const [email, setEmail] = useState("")
  const [isDark, setIsDark] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Check system preference for dark mode
  useEffect(() => {
    if (typeof window !== "undefined") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setIsDark(prefersDark)

      // Add dark class to body if needed
      if (prefersDark) {
        document.documentElement.classList.add("dark")
      }
    }
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Email submitted:", email)
    setIsSubmitted(true)
    // In a real app, you would handle the form submission here
  }

  // Features data
  const features = [
    {
      icon: Heart,
      title: "Personalized Care",
      description: "Custom healing plans tailored to your unique postpartum journey and needs.",
    },
    {
      icon: Sparkles,
      title: "Expert Guidance",
      description: "Access to certified postpartum doulas, lactation consultants, and therapists.",
    },
    {
      icon: Leaf,
      title: "Natural Healing",
      description: "Traditional wisdom combined with modern evidence-based approaches to recovery.",
    },
    {
      icon: Cloud,
      title: "Community Support",
      description: "Connect with other mothers in a safe, nurturing virtual environment.",
    },
  ]

  return (
    <div
      className={`min-h-screen w-full bg-gradient-to-br from-white to-[#f5efe9] dark:from-[#2a1c12] dark:to-[#3d291a] transition-colors duration-300`}
    >
      <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
      <FloatingElements />

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#765133] to-[#a57a59] rounded-full blur-xl opacity-20"></div>
                <motion.div
                  className="relative bg-gradient-to-r from-[#f0e6df] to-[#e8d5c8] dark:from-[#765133]/40 dark:to-[#a57a59]/40 p-3 rounded-full"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  <BirdIcon className="w-8 h-8 text-[#765133] dark:text-[#d4b8a4]" />
                </motion.div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#765133] to-[#a57a59] dark:from-[#d4b8a4] dark:to-[#e8d5c8] text-transparent bg-clip-text mb-4">
              Your Postpartum Sanctuary
            </h1>

            <p className="text-[#765133]/80 dark:text-[#d4b8a4] max-w-2xl mx-auto text-lg">
              Embrace this sacred time with guidance, support, and wisdom from mothers who've walked this path before
              you.
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Features */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="grid gap-4">
                {features.map((feature, index) => (
                  <FeatureCard
                    key={index}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>

            {/* Right Side - Signup Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#765133]/30 to-[#a57a59]/30 rounded-2xl blur-xl"></div>
                <div className="relative bg-white/80 dark:bg-[#2a1c12]/80 backdrop-blur-md rounded-2xl p-8 border border-[#765133]/10 dark:border-[#765133]/20 shadow-lg">
                  <AnimatePresence mode="wait">
                    {!isSubmitted ? (
                      <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <h2 className="text-2xl font-bold text-[#4a3321] dark:text-white mb-2">Join Our Community</h2>
                        <p className="text-[#765133]/80 dark:text-[#d4b8a4] mb-6">
                          Begin your supported postpartum journey today
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                          <div>
                            <Input
                              type="email"
                              placeholder="Your email address"
                              className="bg-white/70 dark:bg-[#3d291a]/70 border-[#765133]/20 dark:border-[#765133]/30 focus:border-[#765133] dark:focus:border-[#a57a59]"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </div>

                          <Link href="/create-account" className="block">
                            <Button
                              type="button"
                              className="w-full bg-gradient-to-r from-[#765133] to-[#a57a59] hover:from-[#5d3f28] hover:to-[#8b6141] text-white rounded-lg py-6 text-base shadow-md hover:shadow-lg transition-all duration-300"
                            >
                              <span className="flex items-center justify-center gap-2">
                                Begin Your Journey
                                <motion.div
                                  animate={{ x: [0, 5, 0] }}
                                  transition={{
                                    duration: 1.5,
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatType: "reverse",
                                  }}
                                >
                                  <ArrowRight className="w-4 h-4" />
                                </motion.div>
                              </span>
                            </Button>
                          </Link>

                          <p className="text-xs text-center text-[#765133]/70 dark:text-[#d4b8a4]/70">
                            By signing up, you agree to our{" "}
                            <a href="#" className="text-[#765133] dark:text-[#d4b8a4] hover:underline">
                              Terms
                            </a>{" "}
                            and{" "}
                            <a href="#" className="text-[#765133] dark:text-[#d4b8a4] hover:underline">
                              Privacy Policy
                            </a>
                          </p>
                        </form>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-8"
                      >
                        <div className="inline-block p-3 bg-[#f0e6df] dark:bg-[#765133]/40 rounded-full mb-4">
                          <Check className="w-8 h-8 text-[#765133] dark:text-[#d4b8a4]" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#4a3321] dark:text-white mb-2">
                          Welcome to the Journey
                        </h3>
                        <p className="text-[#765133]/80 dark:text-[#d4b8a4] mb-6">
                          Thank you for joining our community. Check your email for next steps.
                        </p>
                        <Button
                          onClick={() => setIsSubmitted(false)}
                          className="bg-gradient-to-r from-[#765133] to-[#a57a59] hover:from-[#5d3f28] hover:to-[#8b6141] text-white"
                        >
                          Return to Form
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
