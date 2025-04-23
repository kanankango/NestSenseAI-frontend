"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Progress } from "../components/ui/progress"

export function LoadingAnimation() {
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-[80vh] relative"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-gradient-to-br from-pink-100/20 to-cyan-100/20 dark:from-pink-900/5 dark:to-cyan-900/5 blur-3xl"></div>
        <div className="absolute bottom-[20%] left-[10%] w-[30%] h-[30%] rounded-full bg-gradient-to-tr from-cyan-100/20 to-pink-100/20 dark:from-cyan-900/5 dark:to-pink-900/5 blur-3xl"></div>
      </div>

      <div className="w-full max-w-md mx-auto text-center space-y-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">
            Analyzing Your Skin
          </h2>
          <p className="text-gray-600 dark:text-gray-400">Our AI is working its magic. This will take just a moment.</p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-48 h-48 md:w-64 md:h-64 mx-auto"
        >
          {/* Rotating face wireframe animation */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-gray-200/30 dark:border-gray-700/30"
          ></motion.div>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute inset-2 rounded-full border-2 border-dashed border-gray-300/40 dark:border-gray-600/40"
          ></motion.div>

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-gray-400 dark:border-t-gray-500"
          ></motion.div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 md:w-40 md:h-40">
              <motion.svg
                viewBox="0 0 200 200"
                className="w-full h-full opacity-20 dark:opacity-30"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.2, 0.3, 0.2] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  d="M100,20 C60,20 20,60 20,100 C20,140 60,180 100,180 C140,180 180,140 180,100 C180,60 140,20 100,20 Z"
                  className="text-gray-400 dark:text-gray-500"
                />
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  d="M70,80 C70,70 85,60 100,60 C115,60 130,70 130,80"
                  className="text-gray-400 dark:text-gray-500"
                />
                <circle cx="75" cy="75" r="5" className="fill-gray-400 dark:fill-gray-500" />
                <circle cx="125" cy="75" r="5" className="fill-gray-400 dark:fill-gray-500" />
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  d="M70,130 C80,140 120,140 130,130"
                  className="text-gray-400 dark:text-gray-500"
                />
              </motion.svg>
            </div>
          </div>

          {/* Scanning effect */}
          <motion.div
            initial={{ top: 0 }}
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-70"
          ></motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <Progress value={progress} className="h-2 bg-gray-100 dark:bg-gray-800 overflow-hidden rounded-full" />
          <p className="text-gray-600 dark:text-gray-400 text-sm animate-pulse">{currentStep}</p>
        </motion.div>
      </div>
    </motion.div>
  )
}
