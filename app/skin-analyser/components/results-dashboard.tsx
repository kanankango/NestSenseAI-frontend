"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Badge } from "../components/ui/badge"
import { motion } from "framer-motion"
import type { SkinAnalysisResult } from "../components/skin-scan-app"

interface ResultsDashboardProps {
  result: SkinAnalysisResult
  scanImage: string | null
}

export function ResultsDashboard({ result, scanImage }: ResultsDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const skinTypeLabels = {
    dry: "Dry",
    oily: "Oily",
    combination: "Combination",
    normal: "Normal",
    sensitive: "Sensitive",
  }

  const skinConcernLabels = {
    acne: "Acne",
    pigmentation: "Pigmentation",
    dryness: "Dryness",
    wrinkles: "Wrinkles",
    redness: "Redness",
    "dark-circles": "Dark Circles",
    sensitivity: "Sensitivity",
  }

  const getScoreLabel = (score: number) => {
    if (score >= 9) return "Excellent"
    if (score >= 7.5) return "Very Good"
    if (score >= 6) return "Good"
    if (score >= 4) return "Fair"
    return "Needs Attention"
  }

  const getScoreColor = (score: number) => {
    if (score >= 9) return "bg-green-500"
    if (score >= 7.5) return "bg-green-400"
    if (score >= 6) return "bg-yellow-400"
    if (score >= 4) return "bg-orange-400"
    return "bg-red-400"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto mt-8 relative"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[10%] right-[10%] w-[30%] h-[30%] rounded-full bg-gradient-to-br from-pink-100/20 to-cyan-100/20 dark:from-pink-900/5 dark:to-cyan-900/5 blur-3xl"></div>
        <div className="absolute bottom-[30%] left-[5%] w-[25%] h-[25%] rounded-full bg-gradient-to-tr from-cyan-100/20 to-pink-100/20 dark:from-cyan-900/5 dark:to-pink-900/5 blur-3xl"></div>
      </div>

      <div className="mb-8">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300"
        >
          Your Skin Analysis
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-600 dark:text-gray-400 mt-1"
        >
          Completed on {new Date().toLocaleDateString()}
        </motion.p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="md:col-span-2"
        >
          <Card className="bg-white dark:bg-gray-900 border-0 shadow-xl overflow-hidden rounded-2xl h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-gray-900 dark:text-white flex items-center">
                Your Skin Type:
                <span className="ml-2 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">
                  {skinTypeLabels[result.skinType]}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 bg-gray-50 dark:bg-gray-800/50 rounded-full p-1 h-auto">
                  <TabsTrigger
                    value="overview"
                    className="rounded-full py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-sm transition-all duration-200"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="concerns"
                    className="rounded-full py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-sm transition-all duration-200"
                  >
                    Concerns
                  </TabsTrigger>
                  <TabsTrigger
                    value="details"
                    className="rounded-full py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-sm transition-all duration-200"
                  >
                    Details
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="pt-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3 relative h-40 md:h-auto rounded-xl overflow-hidden shadow-lg">
                      {scanImage ? (
                        <Image
                          src={scanImage || "/placeholder.svg"}
                          alt="Your skin scan"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                          <span className="text-gray-500 dark:text-gray-400">No image</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    <div className="md:w-2/3 space-y-4">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {result.skinType === "combination" &&
                          "Your skin shows characteristics of combination skin with some dry areas and slightly oily T-zone. This is common and can be effectively managed with the right skincare routine."}
                        {result.skinType === "dry" &&
                          "Your skin appears to be dry, with potential for tightness and flakiness. With proper hydration and care, you can achieve a more balanced complexion."}
                        {result.skinType === "oily" &&
                          "Your skin shows signs of excess oil production, particularly in the T-zone. With the right products, you can balance oil production while maintaining hydration."}
                        {result.skinType === "normal" &&
                          "You have a well-balanced skin type with good hydration levels and minimal concerns. Your routine should focus on maintenance and protection."}
                        {result.skinType === "sensitive" &&
                          "Your skin appears to be sensitive and may react to certain ingredients or environmental factors. A gentle approach with soothing ingredients will help maintain your skin barrier."}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {result.skinConcerns.map((concern) => (
                          <Badge
                            key={concern}
                            variant="outline"
                            className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/80 text-gray-700 dark:text-gray-300 border-0 shadow-sm px-3 py-1 rounded-full"
                          >
                            {skinConcernLabels[concern]}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="concerns" className="pt-6">
                  <div className="space-y-6">
                    {result.skinConcerns.map((concern) => (
                      <motion.div
                        key={concern}
                        className="space-y-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-gray-900 dark:text-white">{skinConcernLabels[concern]}</h4>
                          <span className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                            {concern === "pigmentation"
                              ? "Moderate"
                              : concern === "dryness"
                                ? "Mild to Moderate"
                                : concern === "sensitivity"
                                  ? "Mild"
                                  : "Moderate"}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width: `${
                                concern === "pigmentation"
                                  ? 65
                                  : concern === "dryness"
                                    ? 55
                                    : concern === "sensitivity"
                                      ? 40
                                      : 70
                              }%`,
                            }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-pink-200 to-cyan-200 dark:from-pink-500/50 dark:to-cyan-500/50"
                          ></motion.div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {concern === "pigmentation" &&
                            "Areas of uneven skin tone detected, likely due to sun exposure or hormonal changes."}
                          {concern === "dryness" &&
                            "Some areas of your skin show signs of dehydration and lack of natural oils."}
                          {concern === "sensitivity" &&
                            "Your skin shows mild signs of sensitivity that may react to certain ingredients."}
                          {concern === "wrinkles" && "Fine lines detected, primarily around the eye area."}
                          {concern === "acne" && "Mild inflammatory acne detected, primarily in the T-zone."}
                          {concern === "redness" &&
                            "Areas of redness detected, possibly indicating sensitivity or irritation."}
                          {concern === "dark-circles" &&
                            "Moderate darkness under the eyes, which may be due to genetics, lack of sleep, or dehydration."}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="details" className="pt-6">
                  <div className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300">
                      Your skin analysis reveals important details about your skin's current condition:
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-800/80 p-4 rounded-xl shadow-sm"
                      >
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Hydration Level</h4>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "65%" }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-blue-400 dark:bg-blue-500"
                          ></motion.div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Moderate (65%)</p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-800/80 p-4 rounded-xl shadow-sm"
                      >
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Oil Production</h4>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "70%" }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-yellow-400 dark:bg-yellow-500"
                          ></motion.div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Moderate-High (70%)</p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-800/80 p-4 rounded-xl shadow-sm"
                      >
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Elasticity</h4>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "80%" }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-green-400 dark:bg-green-500"
                          ></motion.div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Good (80%)</p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                        className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-800/80 p-4 rounded-xl shadow-sm"
                      >
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Pore Size</h4>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "60%" }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-orange-400 dark:bg-orange-500"
                          ></motion.div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Moderate (60%)</p>
                      </motion.div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-white dark:bg-gray-900 border-0 shadow-xl overflow-hidden rounded-2xl h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-gray-900 dark:text-white">Skin Health Score</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center pt-4">
              <div className="relative w-40 h-40 flex items-center justify-center">
                {/* Circular progress indicator */}
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#F3F4F6"
                    strokeWidth="10"
                    className="dark:stroke-gray-800"
                  />
                  <motion.circle
                    initial={{ strokeDashoffset: 282.7 }}
                    animate={{ strokeDashoffset: 282.7 - (282.7 * result.skinScore) / 10 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="10"
                    strokeDasharray="282.7"
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
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300"
                  >
                    {result.skinScore}
                  </motion.span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">out of 10</span>
                </div>
              </div>

              <div className="text-center mt-6 space-y-2">
                <p className="font-medium text-gray-900 dark:text-white">{getScoreLabel(result.skinScore)}</p>
                <div className="flex items-center justify-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${getScoreColor(result.skinScore)}`}></div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Better than 72% of people your age</p>
                </div>
              </div>

              <div className="w-full mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3 text-center">Key Strengths</h4>
                <ul className="space-y-2">
                  <li>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-green-400 to-cyan-400"></div>
                      Good elasticity
                    </motion.div>
                  </li>
                  <li>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 }}
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-green-400 to-cyan-400"></div>
                      Even tone in most areas
                    </motion.div>
                  </li>
                  <li>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.7 }}
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-green-400 to-cyan-400"></div>
                      Healthy skin barrier
                    </motion.div>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
