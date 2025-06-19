"use client"

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image" // Import the Next.js Image component
import NestsenseImage from "@/public/images/10.png" // Adjust the path as necessary

const MissionSection = () => {
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section
      id="mission"
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-white to-[#765133]/5 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-[#765133] mb-6"
            >
              Our Mission
            </motion.h2>
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-start gap-3"
              >
                <div className="mt-1 flex-shrink-0 rounded-full bg-[#765133]/10 p-1">
                  <Check className="h-4 w-4 text-[#765133]" />
                </div>
                <p className="text-lg text-gray-700">
                  We believe that every new mother deserves comprehensive support during the postpartum period. Our
                  mission is to provide accessible, personalized care that addresses both physical and mental wellbeing.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-start gap-3"
              >
                <div className="mt-1 flex-shrink-0 rounded-full bg-[#765133]/10 p-1">
                  <Check className="h-4 w-4 text-[#765133]" />
                </div>
                <p className="text-lg text-gray-700">
                  By combining expert knowledge, innovative technology, and compassionate care, we aim to transform the
                  postpartum experience for mothers everywhere.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex gap-4 mt-10"
            >
              <Button className="bg-[#765133] hover:bg-[#765133]/90 text-white rounded-full px-6">
                Join Our Community
              </Button>
              <Button
                variant="outline"
                className="border-[#765133] text-[#765133] hover:bg-[#765133]/10 rounded-full px-6"
              >
                Learn More
              </Button>
            </motion.div>
          </div>

          <div className="order-1 md:order-2 relative">
            {/* Animated decorative elements */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 0.8 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
              className="absolute -top-10 -left-10 w-32 h-32 bg-[#765133]/10 rounded-full -z-10"
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 0.6 } : {}}
              transition={{ duration: 1, delay: 0.4 }}
              className="absolute top-1/4 -right-6 w-16 h-16 bg-[#765133]/15 rounded-full -z-10"
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 0.7 } : {}}
              transition={{ duration: 1, delay: 0.6 }}
              className="absolute -bottom-8 -right-8 w-24 h-24 bg-[#765133]/10 rounded-full -z-10"
            />

            {/* Enhanced floating dots pattern */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-[#765133]/30"
                  style={{
                    top: `${20 + Math.random() * 60}%`,
                    left: `${10 + Math.random() * 80}%`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={
                    isInView
                      ? {
                          opacity: 0.6 + Math.random() * 0.4,
                          scale: 0.8 + Math.random() * 0.5,
                          y: [0, -10, 0],
                          x: [0, Math.random() > 0.5 ? 5 : -5, 0],
                        }
                      : {}
                  }
                  transition={{
                    delay: 0.2 + i * 0.1,
                    duration: 2,
                    y: {
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 2 + Math.random() * 2,
                      ease: "easeInOut",
                    },
                    x: {
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 3 + Math.random() * 2,
                      ease: "easeInOut",
                    },
                  }}
                />
              ))}
            </div>

            {/* Enhanced image animation */}
            <AnimatePresence>
              {isInView && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ duration: 0.8 }}
                  className="relative p-3 bg-white rounded-2xl shadow-xl"
                >
                  <div className="relative overflow-hidden rounded-xl">
                    {/* Animated shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent z-20"
                      initial={{ x: "-100%" }}
                      animate={{ x: "200%" }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                        duration: 2.5,
                        ease: "easeInOut",
                        delay: 1,
                      }}
                    />

                    {/* Gradient overlay with enhanced animation */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-tr from-[#765133]/20 to-transparent z-10"
                      initial={{ opacity: 0, rotate: -5 }}
                      animate={{
                        opacity: [0, 0.7, 0.5],
                        rotate: [0, 0, 0],
                        scale: [0.95, 1, 1],
                      }}
                      transition={{
                        duration: 2,
                        times: [0, 0.7, 1],
                        ease: "easeOut",
                      }}
                    />

                    {/* Use Next.js Image component instead of img */}
                    <motion.div
                      initial={{ scale: 1.2, filter: "blur(8px)" }}
                      animate={{
                        scale: 1,
                        filter: "blur(0px)",
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        ease: "easeOut",
                        y: {
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                          duration: 6,
                          ease: "easeInOut",
                        },
                      }}
                    >
                      <Image
                        src={NestsenseImage || "/placeholder.svg"}
                        width={400}
                        height={600}
                        alt="how do you feel"
                        className="rounded-lg object-cover w-full h-auto"
                      />
                    </motion.div>

                    {/* Animated border with pulse effect */}
                    <motion.div
                      className="absolute inset-0 border-2 border-[#765133]/40 rounded-xl z-20"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        boxShadow: [
                          "0 0 0px rgba(118, 81, 51, 0)",
                          "0 0 20px rgba(118, 81, 51, 0.3)",
                          "0 0 10px rgba(118, 81, 51, 0.2)",
                        ],
                      }}
                      transition={{
                        duration: 1.2,
                        delay: 0.7,
                        boxShadow: {
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                          duration: 2,
                          ease: "easeInOut",
                        },
                      }}
                    />
                  </div>

                  {/* Corner accents with staggered animation */}
                  {[
                    "top-0 left-0 origin-top-left",
                    "top-0 right-0 origin-top-right",
                    "bottom-0 left-0 origin-bottom-left",
                    "bottom-0 right-0 origin-bottom-right",
                  ].map((position, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-8 h-8 ${position}`}
                      initial={{ opacity: 0, scale: 0, rotate: i % 2 === 0 ? -90 : 90 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.8 + i * 0.15,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      <div className="absolute w-full h-[2px] bg-[#765133]"></div>
                      <div
                        className="
                      absolute w-[2px] h-full bg-[#765133]"
                      ></div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

// Main Page component
export default function Page() {
  return (
    <main>
      <MissionSection />
    </main>
  )
}
