"use client"

import { Button } from "../components/ui/button"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"

export function ResultsSection() {
  // This would normally be populated from the analysis API
  const [skinType, setSkinType] = useState("combination")

  const skinTypes = {
    dry: {
      title: "Dry Skin",
      description:
        "Your skin appears to be dry, which is common for many mothers due to hormonal changes and reduced time for self-care.",
      recommendations: [
        { title: "Hydrating Cleanser", description: "Use a cream-based cleanser that doesn't strip natural oils" },
        { title: "Rich Moisturizer", description: "Apply a thicker moisturizer, especially at night" },
        { title: "Gentle Exfoliation", description: "Exfoliate once a week to remove dead skin cells" },
      ],
      image: "/dry-skin.jpg",
    },
    oily: {
      title: "Oily Skin",
      description:
        "Your skin shows signs of excess oil production, which can be influenced by hormonal fluctuations common during and after pregnancy.",
      recommendations: [
        { title: "Gentle Foaming Cleanser", description: "Use morning and night to control oil without over-drying" },
        { title: "Oil-Free Moisturizer", description: "Hydrate without adding extra oil" },
        { title: "Clay Mask", description: "Use weekly to absorb excess oil and purify pores" },
      ],
      image: "/oily-skin.jpg",
    },
    combination: {
      title: "Combination Skin",
      description:
        "Your skin shows a mix of oily and dry areas, which is very common for mothers dealing with changing hormones and stress levels.",
      recommendations: [
        { title: "Balancing Cleanser", description: "Use a gentle cleanser that won't strip or over-moisturize" },
        { title: "Zone Treatment", description: "Apply lighter products on oily areas, richer ones on dry patches" },
        { title: "Hydrating Serum", description: "Use a hyaluronic acid serum all over before moisturizing" },
      ],
      image: "/combination-skin.jpg",
    },
    sensitive: {
      title: "Sensitive Skin",
      description:
        "Your skin appears to be sensitive, which is common for many mothers due to hormonal changes and environmental factors.",
      recommendations: [
        { title: "Fragrance-Free Cleanser", description: "Avoid irritants that can trigger reactions" },
        { title: "Soothing Moisturizer", description: "Look for calming ingredients like aloe and chamomile" },
        { title: "Mineral Sunscreen", description: "Use SPF 30+ with zinc oxide or titanium dioxide" },
      ],
      image: "/sensitive-skin.jpg",
    },
  }

  const currentSkinType = skinTypes[skinType as keyof typeof skinTypes]

  return (
    <section id="results-section" className="py-16 scroll-mt-16">
      <div className="text-center mb-10">
        <h2 className="font-serif text-3xl md:text-4xl text-[#6d5146] mb-4">Your Skin Analysis</h2>
        <p className="text-[#9c8178] max-w-2xl mx-auto">
          Based on your photo, we've analyzed your skin type and created personalized recommendations.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <Card className="border-[#e9ddd8] bg-white shadow-md overflow-hidden">
          <div className="relative h-64 w-full">
            <Image
              src={currentSkinType.image || "/placeholder.svg"}
              alt={currentSkinType.title}
              fill
              className="object-cover"
            />
          </div>
          <CardHeader>
            <CardTitle className="font-serif text-2xl text-[#6d5146]">{currentSkinType.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#9c8178] mb-6">{currentSkinType.description}</p>

            <Tabs defaultValue="recommendations" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-[#f9f4f2]">
                <TabsTrigger
                  value="recommendations"
                  className="data-[state=active]:bg-[#c4a59b] data-[state=active]:text-white"
                >
                  Recommendations
                </TabsTrigger>
                <TabsTrigger
                  value="routine"
                  className="data-[state=active]:bg-[#c4a59b] data-[state=active]:text-white"
                >
                  Daily Routine
                </TabsTrigger>
              </TabsList>
              <TabsContent value="recommendations" className="pt-4">
                <ul className="space-y-4">
                  {currentSkinType.recommendations.map((rec, index) => (
                    <li key={index} className="border-b border-[#e9ddd8] pb-3">
                      <h4 className="font-medium text-[#6d5146]">{rec.title}</h4>
                      <p className="text-sm text-[#9c8178]">{rec.description}</p>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="routine" className="pt-4">
                <div className="space-y-4">
                  <div className="border-b border-[#e9ddd8] pb-3">
                    <h4 className="font-medium text-[#6d5146]">Morning</h4>
                    <ol className="text-sm text-[#9c8178] list-decimal pl-4 space-y-1">
                      <li>Gentle cleanser</li>
                      <li>Hydrating toner</li>
                      <li>Serum (based on your skin needs)</li>
                      <li>Moisturizer</li>
                      <li>Sunscreen</li>
                    </ol>
                  </div>
                  <div>
                    <h4 className="font-medium text-[#6d5146]">Evening</h4>
                    <ol className="text-sm text-[#9c8178] list-decimal pl-4 space-y-1">
                      <li>Double cleanse (if wearing makeup)</li>
                      <li>Treatment product</li>
                      <li>Rich moisturizer</li>
                      <li>Eye cream</li>
                    </ol>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-[#e9ddd8] bg-white shadow-md">
            <CardHeader>
              <CardTitle className="font-serif text-2xl text-[#6d5146]">Try Different Skin Types</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#9c8178] mb-4">
                Explore recommendations for other skin types that may apply to you during different seasons or life
                stages.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {Object.keys(skinTypes).map((type) => (
                  <Button
                    key={type}
                    variant={type === skinType ? "default" : "outline"}
                    className={
                      type === skinType
                        ? "bg-[#c4a59b] hover:bg-[#b3948a] text-white"
                        : "border-[#e9ddd8] text-[#6d5146] hover:bg-[#f9f4f2]"
                    }
                    onClick={() => setSkinType(type)}
                  >
                    {skinTypes[type as keyof typeof skinTypes].title}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#e9ddd8] bg-white shadow-md">
            <CardHeader>
              <CardTitle className="font-serif text-2xl text-[#6d5146]">Mother's Self-Care Tip</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#9c8178] italic">
                "Remember that skincare is self-care. Even a simple 5-minute routine can be a moment of peace in your
                busy day as a mother. Your well-being matters too."
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
