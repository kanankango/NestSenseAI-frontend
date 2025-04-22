"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { motion } from "framer-motion"
import { ShoppingBag, MessageCircle } from "lucide-react"

interface RecommendationSectionProps {
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

export function RecommendationSection({ recommendations }: RecommendationSectionProps) {
  const [activeTab, setActiveTab] = useState("products")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="max-w-4xl mx-auto mt-16 relative"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[30%] right-[5%] w-[25%] h-[25%] rounded-full bg-gradient-to-br from-pink-100/20 to-cyan-100/20 dark:from-pink-900/5 dark:to-cyan-900/5 blur-3xl"></div>
        <div className="absolute bottom-[10%] left-[10%] w-[30%] h-[30%] rounded-full bg-gradient-to-tr from-cyan-100/20 to-pink-100/20 dark:from-cyan-900/5 dark:to-pink-900/5 blur-3xl"></div>
      </div>

      <div className="mb-8">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300"
        >
          Personalized Recommendations
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-600 dark:text-gray-400 mt-1"
        >
          Based on your skin analysis, we've curated these recommendations just for you.
        </motion.p>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 bg-gray-50 dark:bg-gray-800/50 rounded-full p-1 h-auto w-full max-w-md mx-auto mb-8">
          <TabsTrigger
            value="products"
            className="rounded-full py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-sm transition-all duration-200"
          >
            Products
          </TabsTrigger>
          <TabsTrigger
            value="routine"
            className="rounded-full py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-sm transition-all duration-200"
          >
            Routine
          </TabsTrigger>
          <TabsTrigger
            value="tips"
            className="rounded-full py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-sm transition-all duration-200"
          >
            Expert Tips
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="mt-0">
          <div className="grid md:grid-cols-3 gap-6">
            {recommendations.products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="bg-white dark:bg-gray-900 border-0 shadow-xl overflow-hidden rounded-2xl h-full">
                  <div className="h-48 bg-gradient-to-r from-pink-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                      className="w-32 h-32 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shadow-lg"
                    >
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={100}
                        height={100}
                        className="object-cover"
                      />
                    </motion.div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-gray-900 dark:text-white">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{product.purpose}</p>
                    <Badge className="bg-gradient-to-r from-pink-100 to-cyan-100 dark:from-pink-900/20 dark:to-cyan-900/20 text-gray-700 dark:text-gray-300 border-0 shadow-sm">
                      AI Recommended
                    </Badge>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                    >
                      Details
                    </Button>
                    <Button
                      size="sm"
                      className="rounded-full bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white dark:from-gray-200 dark:to-white dark:text-gray-900 dark:hover:from-gray-300 dark:hover:to-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Buy Now
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="routine" className="mt-0">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="bg-white dark:bg-gray-900 border-0 shadow-xl overflow-hidden rounded-2xl">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 mb-4">
                        Morning Routine
                      </h3>
                      <ol className="space-y-4">
                        {recommendations.routine.morning.map((step, index) => (
                          <motion.li
                            key={index}
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-100 to-pink-200 dark:from-pink-900/20 dark:to-pink-800/30 flex items-center justify-center flex-shrink-0 mt-0.5 text-gray-700 dark:text-gray-300 font-medium text-sm shadow-sm">
                              {index + 1}
                            </div>
                            <div>
                              <p className="text-gray-700 dark:text-gray-300">{step}</p>
                            </div>
                          </motion.li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 mb-4">
                        Evening Routine
                      </h3>
                      <ol className="space-y-4">
                        {recommendations.routine.night.map((step, index) => (
                          <motion.li
                            key={index}
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                          >
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-100 to-cyan-200 dark:from-cyan-900/20 dark:to-cyan-800/30 flex items-center justify-center flex-shrink-0 mt-0.5 text-gray-700 dark:text-gray-300 font-medium text-sm shadow-sm">
                              {index + 1}
                            </div>
                            <div>
                              <p className="text-gray-700 dark:text-gray-300">{step}</p>
                            </div>
                          </motion.li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                    <Button className="rounded-full bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white dark:from-gray-200 dark:to-white dark:text-gray-900 dark:hover:from-gray-300 dark:hover:to-gray-100 shadow-md hover:shadow-lg transition-all duration-300 px-6">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Book Consultation
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="tips" className="mt-0">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="bg-white dark:bg-gray-900 border-0 shadow-xl overflow-hidden rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">
                  Dermatologist Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recommendations.tips.map((tip, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-100 to-cyan-100 dark:from-pink-900/20 dark:to-cyan-900/20 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">{index + 1}</span>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl shadow-sm flex-1">
                        <p className="text-gray-700 dark:text-gray-300">{tip}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">Additional Resources</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <Button
                        variant="outline"
                        className="rounded-full justify-start w-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 shadow-sm hover:shadow-md"
                      >
                        Understanding Skin Types
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <Button
                        variant="outline"
                        className="rounded-full justify-start w-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 shadow-sm hover:shadow-md"
                      >
                        Ingredients Guide
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <Button
                        variant="outline"
                        className="rounded-full justify-start w-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 shadow-sm hover:shadow-md"
                      >
                        Seasonal Skincare
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <Button
                        variant="outline"
                        className="rounded-full justify-start w-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 shadow-sm hover:shadow-md"
                      >
                        Skin Concerns FAQ
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
