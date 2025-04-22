"use client"

import { useEffect, useState } from "react"
import { Progress } from "../components/ui/progress"

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState("Initializing scan...")

  const steps = [
    "Initializing scan...",
    "Analyzing facial features...",
    "Detecting skin tone...",
    "Checking for dryness...",
    "Analyzing pores...",
    "Identifying potential concerns...",
    "Generating recommendations...",
    "Finalizing your report...",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 100 / (steps.length * 5)
      })
    }, 100)

    return () => clearInterval(interval)
  }, [steps.length])

  useEffect(() => {
    const stepIndex = Math.min(Math.floor(progress / (100 / steps.length)), steps.length - 1)
    setCurrentStep(steps[stepIndex])
  }, [progress, steps])

  return (
    <div className="container max-w-6xl mx-auto px-4 py-12 md:py-20 flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md mx-auto text-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white">Analyzing Your Skin</h2>
          <p className="text-[#1C1C1E]/70 dark:text-[#F3F4F6]/70">
            Our AI is working its magic. This will take just a moment.
          </p>
        </div>

        <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto">
          {/* Rotating face wireframe animation */}
          <div className="absolute inset-0 rounded-full border-2 border-[#E6D5C6]/30 animate-pulse"></div>
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#E6D5C6] animate-spin"></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 md:w-40 md:h-40">
              <svg viewBox="0 0 200 200" className="w-full h-full opacity-20 dark:opacity-30">
                <path
                  fill="none"
                  stroke="#E6D5C6"
                  strokeWidth="1"
                  d="M100,20 C60,20 20,60 20,100 C20,140 60,180 100,180 C140,180 180,140 180,100 C180,60 140,20 100,20 Z"
                />
                <path
                  fill="none"
                  stroke="#E6D5C6"
                  strokeWidth="1"
                  d="M70,80 C70,70 85,60 100,60 C115,60 130,70 130,80"
                />
                <circle cx="75" cy="75" r="5" fill="#E6D5C6" />
                <circle cx="125" cy="75" r="5" fill="#E6D5C6" />
                <path fill="none" stroke="#E6D5C6" strokeWidth="1" d="M70,130 C80,140 120,140 130,130" />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Progress value={progress} className="h-2 bg-[#F3F4F6] dark:bg-black/20" />
          <p className="text-[#1C1C1E]/70 dark:text-[#F3F4F6]/70 text-sm animate-pulse">{currentStep}</p>
        </div>
      </div>
    </div>
  )
}
