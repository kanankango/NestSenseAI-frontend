"use client"

import { useState } from "react"
import { HeroSection } from "../components/hero-section"
import { ScanComponent } from "../components/scan-component"
import { LoadingAnimation } from "../components/loading-animation"
import { ResultsDashboard } from "../components/results-dashboard"
import { RecommendationSection } from "../components/recommendation-section"
import { ResultActions } from "../components/result-actions"
import { PrivacyDisclaimer } from "../components/privacy-disclaimer"
import { ThemeToggle } from "../components/theme-toggle"

export type ScanStep = "landing" | "scan" | "loading" | "results"
export type SkinType = "dry" | "oily" | "combination" | "normal" | "sensitive"
export type SkinConcern = "acne" | "pigmentation" | "dryness" | "wrinkles" | "redness" | "dark-circles" | "sensitivity"

export interface SkinAnalysisResult {
  skinType: SkinType
  skinConcerns: SkinConcern[]
  skinScore: number
  recommendations: {
    products: {
      name: string
      purpose: string
      image: string
    }[]
    routine: {
      morning: string[]
      night: string[]
    }
    tips: string[]
  }
}

// Demo result for the "Try with Demo" feature
const demoResult: SkinAnalysisResult = {
  skinType: "combination",
  skinConcerns: ["pigmentation", "dryness", "sensitivity"],
  skinScore: 7.5,
  recommendations: {
    products: [
      {
        name: "Hydrating Serum",
        purpose: "Deep hydration for dry areas",
        image: "/product-1.jpg",
      },
      {
        name: "Gentle Cleanser",
        purpose: "Daily cleansing for sensitive skin",
        image: "/product-2.jpg",
      },
      {
        name: "Vitamin C Treatment",
        purpose: "Targets pigmentation and brightens skin",
        image: "/product-3.jpg",
      },
    ],
    routine: {
      morning: ["Cleanse with gentle cleanser", "Apply hydrating serum to dry areas", "Use SPF 30+ sunscreen"],
      night: [
        "Double cleanse to remove makeup and impurities",
        "Apply Vitamin C treatment to pigmented areas",
        "Finish with a rich moisturizer",
      ],
    },
    tips: [
      "Avoid hot water when washing your face",
      "Use a humidifier in dry environments",
      "Reapply sunscreen every 2 hours when outdoors",
    ],
  },
}

export function SkinScanApp() {
  const [currentStep, setCurrentStep] = useState<ScanStep>("landing")
  const [scanImage, setScanImage] = useState<string | null>(null)
  const [analysisResult, setAnalysisResult] = useState<SkinAnalysisResult | null>(null)
  const [privacyConsent, setPrivacyConsent] = useState(false)

  const handleStartScan = () => {
    setCurrentStep("scan")
  }

  const handleImageCapture = (imageData: string) => {
    setScanImage(imageData)
  }

  const handleAnalyze = () => {
    if (!privacyConsent) {
      alert("Please accept the privacy policy to continue")
      return
    }

    setCurrentStep("loading")

    // Simulate API call with a timeout
    setTimeout(() => {
      setAnalysisResult(demoResult)
      setCurrentStep("results")
    }, 3000)
  }

  const handleTryDemo = () => {
    setScanImage("/demo-face.jpg")
    setPrivacyConsent(true)
    handleAnalyze()
  }

  const handleRescan = () => {
    setScanImage(null)
    setAnalysisResult(null)
    setCurrentStep("scan")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {currentStep === "landing" && <HeroSection onStartScan={handleStartScan} onTryDemo={handleTryDemo} />}

        {currentStep === "scan" && (
          <>
            <ScanComponent
              onImageCapture={handleImageCapture}
              onAnalyze={handleAnalyze}
              scanImage={scanImage}
              privacyConsent={privacyConsent}
              onPrivacyConsentChange={setPrivacyConsent}
              onTryDemo={handleTryDemo}
            />
            <PrivacyDisclaimer checked={privacyConsent} onCheckedChange={setPrivacyConsent} />
          </>
        )}

        {currentStep === "loading" && <LoadingAnimation />}

        {currentStep === "results" && analysisResult && (
          <>
            <ResultsDashboard result={analysisResult} scanImage={scanImage} />
            <RecommendationSection recommendations={analysisResult.recommendations} />
            <ResultActions onRescan={handleRescan} />
          </>
        )}
      </div>
    </div>
  )
}
