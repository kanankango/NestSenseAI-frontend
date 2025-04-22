import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Droplet, Sun, Wind, Shield } from "lucide-react"

export function EducationalSection() {
  const skinTypeInfo = [
    {
      type: "Dry",
      icon: <Droplet className="w-10 h-10 text-[#c4a59b]" />,
      description: "Feels tight, may have flaky patches. Often lacks natural oils and moisture retention.",
      causes: "Hormonal changes post-pregnancy, dehydration, weather, harsh products",
    },
    {
      type: "Oily",
      icon: <Sun className="w-10 h-10 text-[#c4a59b]" />,
      description: "Appears shiny, especially in T-zone. Prone to enlarged pores and breakouts.",
      causes: "Hormonal fluctuations, stress, humidity, genetics",
    },
    {
      type: "Combination",
      icon: <Wind className="w-10 h-10 text-[#c4a59b]" />,
      description: "Oily in some areas (typically T-zone) and dry or normal in others (cheeks).",
      causes: "Hormonal changes, stress, seasonal changes, product use",
    },
    {
      type: "Sensitive",
      icon: <Shield className="w-10 h-10 text-[#c4a59b]" />,
      description: "Easily irritated, may appear red or feel itchy. Reacts to many products.",
      causes: "Hormonal shifts during/after pregnancy, environmental factors, genetics",
    },
  ]

  return (
    <section className="py-16">
      <div className="text-center mb-10">
        <h2 className="font-serif text-3xl md:text-4xl text-[#6d5146] mb-4">What Does Your Skin Type Mean?</h2>
        <p className="text-[#9c8178] max-w-2xl mx-auto">
          Understanding your skin type helps you choose the right products and build an effective skincare routine.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {skinTypeInfo.map((info, index) => (
          <Card key={index} className="border-[#e9ddd8] bg-white shadow-md">
            <CardHeader className="flex flex-col items-center text-center pb-2">
              <div className="w-16 h-16 rounded-full bg-[#f9f4f2] flex items-center justify-center mb-2">
                {info.icon}
              </div>
              <CardTitle className="font-serif text-xl text-[#6d5146]">{info.type} Skin</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-[#9c8178] mb-3">{info.description}</p>
              <div>
                <h4 className="font-medium text-[#6d5146] text-sm">Common Causes for Mothers:</h4>
                <p className="text-xs text-[#9c8178]">{info.causes}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-[#9c8178] italic max-w-2xl mx-auto">
          Remember that your skin type can change with seasons, stress levels, and different life stages of motherhood.
          Regular analysis helps you adapt your skincare routine accordingly.
        </p>
      </div>
    </section>
  )
}
