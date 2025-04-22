"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Download, Share2 } from "lucide-react"

export function ResultsPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const skinScore = 78

  const skinIssues = [
    { name: "Dryness", level: "Moderate", score: 65 },
    { name: "Sensitivity", level: "Mild", score: 82 },
    { name: "Pigmentation", level: "Minimal", score: 90 },
    { name: "Texture", level: "Moderate", score: 75 },
  ]

  const recommendations = [
    {
      title: "Morning Routine",
      steps: [
        "Gentle cleanser with ceramides",
        "Hydrating toner (alcohol-free)",
        "Vitamin C serum",
        "Moisturizer with hyaluronic acid",
        "SPF 30+ (daily, even indoors)",
      ],
    },
    {
      title: "Evening Routine",
      steps: [
        "Oil-based cleanser (if wearing makeup)",
        "Gentle foaming cleanser",
        "Exfoliate 2-3x weekly (lactic acid)",
        "Hydrating serum",
        "Rich night cream with peptides",
      ],
    },
    {
      title: "Weekly Treatments",
      steps: ["Hydrating mask (1-2x weekly)", "Gentle chemical exfoliation", "Avoid physical scrubs"],
    },
  ]

  return (
    <div className="container max-w-6xl mx-auto px-4 py-12 pt-20">
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-black dark:text-white">Your Skin Analysis</h1>
            <p className="text-[#1C1C1E]/70 dark:text-[#F3F4F6]/70 mt-1">
              Completed on {new Date().toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-full border-[#E6D5C6]">
              <Share2 className="w-4 h-4 mr-2" /> Share
            </Button>
            <Button className="rounded-full bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90">
              <Download className="w-4 h-4 mr-2" /> Save Report
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white dark:bg-[#1C1C1E]/90 shadow-md md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-black dark:text-white">Your Skin Type: Combination</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#1C1C1E]/70 dark:text-[#F3F4F6]/70 mb-6">
                Your skin shows characteristics of combination skin with some dry areas on the cheeks and slightly oily
                T-zone. This is common and can be effectively managed with the right skincare routine.
              </p>

              <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 bg-[#F3F4F6] dark:bg-black/20 rounded-full p-1 h-auto">
                  <TabsTrigger
                    value="overview"
                    className="rounded-full py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-[#1C1C1E] data-[state=active]:text-black dark:data-[state=active]:text-white"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="concerns"
                    className="rounded-full py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-[#1C1C1E] data-[state=active]:text-black dark:data-[state=active]:text-white"
                  >
                    Concerns
                  </TabsTrigger>
                  <TabsTrigger
                    value="routine"
                    className="rounded-full py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-[#1C1C1E] data-[state=active]:text-black dark:data-[state=active]:text-white"
                  >
                    Routine
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="pt-6">
                  <div className="space-y-4">
                    <p className="text-[#1C1C1E]/80 dark:text-[#F3F4F6]/80">
                      Your skin is generally healthy with good elasticity. The combination nature means you'll benefit
                      from targeted treatments for different facial zones. Your skin barrier appears intact with minimal
                      sensitivity.
                    </p>
                    <div className="bg-[#F3F4F6] dark:bg-black/20 p-4 rounded-xl">
                      <h4 className="font-medium text-black dark:text-white mb-2">Key Strengths</h4>
                      <ul className="grid grid-cols-2 gap-2 text-sm text-[#1C1C1E]/70 dark:text-[#F3F4F6]/70">
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#E6D5C6] mr-2"></div>
                          Good elasticity
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#E6D5C6] mr-2"></div>
                          Minimal fine lines
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#E6D5C6] mr-2"></div>
                          Even tone in most areas
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#E6D5C6] mr-2"></div>
                          Healthy skin barrier
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="concerns" className="pt-6">
                  <div className="space-y-6">
                    {skinIssues.map((issue, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-black dark:text-white">{issue.name}</h4>
                          <span className="text-sm text-[#1C1C1E]/70 dark:text-[#F3F4F6]/70">{issue.level}</span>
                        </div>
                        <div className="h-2 bg-[#F3F4F6] dark:bg-black/20 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#FFDEE9] to-[#B5FFFC]"
                            style={{ width: `${issue.score}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="routine" className="pt-6">
                  <div className="space-y-6">
                    {recommendations.map((rec, index) => (
                      <div key={index} className="space-y-3">
                        <h4 className="font-medium text-black dark:text-white">{rec.title}</h4>
                        <ol className="space-y-2 text-sm text-[#1C1C1E]/70 dark:text-[#F3F4F6]/70">
                          {rec.steps.map((step, stepIndex) => (
                            <li key={stepIndex} className="flex items-start">
                              <span className="w-5 h-5 rounded-full bg-[#E6D5C6]/20 flex items-center justify-center text-xs text-[#1C1C1E] dark:text-white mr-2 mt-0.5">
                                {stepIndex + 1}
                              </span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#1C1C1E]/90 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-black dark:text-white">Skin Health Score</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center pt-4">
              <div className="relative w-48 h-48 flex items-center justify-center">
                {/* Circular progress indicator */}
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#F3F4F6"
                    strokeWidth="10"
                    className="dark:stroke-[#1C1C1E]/50"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="10"
                    strokeDasharray="282.7"
                    strokeDashoffset={282.7 - (282.7 * skinScore) / 100}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FFDEE9" />
                      <stop offset="100%" stopColor="#B5FFFC" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-4xl font-bold text-black dark:text-white">{skinScore}</span>
                  <span className="text-sm text-[#1C1C1E]/70 dark:text-[#F3F4F6]/70">out of 100</span>
                </div>
              </div>

              <div className="text-center mt-4 space-y-2">
                <p className="font-medium text-black dark:text-white">Very Good</p>
                <p className="text-sm text-[#1C1C1E]/70 dark:text-[#F3F4F6]/70">
                  Your skin is healthier than 72% of people your age
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
