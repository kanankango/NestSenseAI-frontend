"use client"

import { ArrowRight, Camera, Info } from "lucide-react"
import { motion } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "../components/ui/button"

interface HeroSectionProps {
  onStartScan: () => void
  onTryDemo: () => void
}

export function HeroSection({ onStartScan, onTryDemo }: HeroSectionProps) {
  const steps = [
    "Upload or scan your face",
    "Get instant analysis of skin type & issues",
    "Receive personalized skincare tips",
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] text-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-pink-100/30 to-cyan-100/30 dark:from-pink-900/10 dark:to-cyan-900/10 blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-cyan-100/30 to-pink-100/30 dark:from-cyan-900/10 dark:to-pink-900/10 blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8 max-w-3xl relative z-10"
      >
        <div className="space-y-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center mb-6"
          >
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-r from-pink-200 to-cyan-200 flex items-center justify-center shadow-lg">
              <span className="font-bold text-gray-800 text-2xl">S</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold ml-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">
              SkinScan
            </h1>
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-medium text-gray-700 dark:text-gray-300">
            Your Skin's Smartest Ally
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4 text-lg"
          >
            Scan your face to receive AI-powered skin analysis and tailored skincare suggestions.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <Button
            onClick={onStartScan}
            size="lg"
            className="rounded-full px-8 py-6 h-auto text-lg bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 dark:from-gray-200 dark:to-white dark:text-gray-900 dark:hover:from-gray-300 dark:hover:to-gray-100 shadow-md hover:shadow-lg transition-all duration-300"
          >
            Start Skin Analysis <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <Button
            onClick={onTryDemo}
            variant="outline"
            size="lg"
            className="rounded-full px-8 py-6 h-auto text-lg border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
          >
            Try with Demo Image <Camera className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12"
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="gap-2 rounded-full px-6 py-2 bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 backdrop-blur-sm"
                >
                  <Info className="h-5 w-5" />
                  How it Works
                </Button>
              </TooltipTrigger>
              <TooltipContent className="w-80 p-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-0 shadow-xl">
                <div className="space-y-4">
                  <h3 className="font-medium text-sm">SkinScan in 3 Simple Steps</h3>
                  <ul className="space-y-3">
                    {steps.map((step, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm">
                        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-100 to-cyan-100 dark:from-pink-900/30 dark:to-cyan-900/30 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                          <span className="text-xs font-medium">{index + 1}</span>
                        </div>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-16 w-full max-w-2xl mx-auto relative z-10"
      >
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-200/30 to-cyan-200/30 animate-pulse"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-white/50 flex items-center justify-center"
            >
              <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border border-white/80 flex items-center justify-center">
                <div className="text-gray-500 dark:text-gray-400 font-light">Face Scan</div>
              </div>
            </motion.div>
          </div>

          {/* Animated scanning line */}
          <motion.div
            animate={{
              top: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-70"
          ></motion.div>
        </div>
      </motion.div>
    </div>
  )
}
