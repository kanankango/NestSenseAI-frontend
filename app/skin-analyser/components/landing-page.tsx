"use client"

import { useState } from "react"
import { UploadInterface } from "../components/upload-interface"
import { LoadingScreen } from "../components/loading-screen"
import { ResultsPage } from "../components/results-page"
import { ProductRecommendations } from "../components/product-recommendations"
import { Button } from "../components/ui/button"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "../components/theme-provider"

export function LandingPage() {
  const [currentStep, setCurrentStep] = useState<"landing" | "upload" | "loading" | "results">("landing")
  const { theme, setTheme } = useTheme()

  const startScan = () => {
    setCurrentStep("upload")
  }

  const handleUploadComplete = () => {
    setCurrentStep("loading")
    // Simulate loading time
    setTimeout(() => {
      setCurrentStep("results")
    }, 3000)
  }

  return (
    <main className="min-h-screen bg-[#F3F4F6] dark:bg-[#1C1C1E] transition-colors duration-300">
      <div className="absolute top-4 right-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full bg-white/10 backdrop-blur-sm dark:bg-black/10"
        >
          {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>

      {currentStep === "landing" && (
        <div className="container max-w-6xl mx-auto px-4 py-12 md:py-20 flex flex-col items-center justify-center min-h-screen">
          <div className="w-full max-w-3xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#FFDEE9] to-[#B5FFFC] flex items-center justify-center">
                  <span className="font-bold text-black text-xl">S</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold ml-3 text-black dark:text-white">SkinScan</h1>
              </div>
              <p className="text-xl md:text-2xl font-light text-[#1C1C1E] dark:text-[#F3F4F6]">
                Your Skin's Smartest Ally
              </p>
            </div>

            <div className="relative w-full aspect-video max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FFDEE9]/30 to-[#B5FFFC]/30 animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-white/50 flex items-center justify-center">
                  <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border border-white/80 flex items-center justify-center">
                    <div className="text-white/90 font-light">Face Scan</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 pt-8">
              <Button
                onClick={startScan}
                className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 rounded-full px-8 py-6 text-lg font-medium h-auto"
              >
                Start My Free Scan
              </Button>
              <p className="text-[#1C1C1E]/70 dark:text-[#F3F4F6]/70 text-sm">Takes 30 seconds. No login needed.</p>
            </div>

            <div className="pt-12">
              <p className="text-[#1C1C1E]/60 dark:text-[#F3F4F6]/60 text-sm">Used by 12,000+ users</p>
            </div>
          </div>
        </div>
      )}

      {currentStep === "upload" && <UploadInterface onComplete={handleUploadComplete} />}
      {currentStep === "loading" && <LoadingScreen />}
      {currentStep === "results" && (
        <>
          <ResultsPage />
          <ProductRecommendations />
        </>
      )}
    </main>
  )
}
