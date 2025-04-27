import { Heart, Shield, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const BenefitsSection = () => {
  const benefitSections = [
    {
      title: "For New Mothers",
      description: "Support designed specifically for your postpartum journey",
      icon: <Heart className="h-8 w-8 text-[#765133]" />,
      benefits: [
        "Reduced feelings of isolation and anxiety",
        "Improved confidence in parenting abilities",
        "Better physical recovery through guided self-care",
        "Enhanced bonding with baby through mindfulness practices",
      ],
      color: "bg-[#f8f5f2]",
      borderColor: "border-[#e8d9cc]",
      iconBg: "bg-[#e8d9cc]",
    },
    {
      title: "For Healthcare Providers",
      description: "Tools to extend and enhance your patient care",
      icon: <Shield className="h-8 w-8 text-[#765133]" />,
      benefits: [
        "Extended care beyond hospital or clinic visits",
        "Better patient outcomes through continuous support",
        "Early identification of postpartum complications",
        "Comprehensive data to inform personalized care plans",
      ],
      color: "bg-[#f8f5f2]",
      borderColor: "border-[#e8d9cc]",
      iconBg: "bg-[#e8d9cc]",
    },
  ]

  return (
    <section id="benefits" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <div className="inline-block px-4 py-1.5 bg-[#f8f5f2] rounded-full text-[#765133] font-medium text-sm mb-6">
           
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Benefits of <span className="text-[#765133]">NestSense</span>
          </h2>
          <p className="text-lg text-gray-600">
            See how our platform has helped thousands of mothers navigate their postpartum journey with confidence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {benefitSections.map((section, index) => (
            <Card key={index} className={`overflow-hidden border-0 shadow-lg ${section.color}`}>
              <CardContent className="p-0">
                <div className="p-6">
                  <div className={`w-12 h-12 rounded-2xl ${section.iconBg} flex items-center justify-center mb-4`}>
                    {section.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">{section.title}</h3>
                  <p className="text-gray-600 mb-4">{section.description}</p>

                  <ul className="space-y-3 mb-6">
                    {section.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex gap-3 items-start">
                        <div
                          className={`w-6 h-6 rounded-full ${section.iconBg} flex items-center justify-center flex-shrink-0 mt-1`}
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#765133" />
                          </svg>
                        </div>
                        <p className="text-gray-600">{benefit}</p>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant="outline"
                    className={`group border ${section.borderColor} hover:bg-white hover:text-[#765133]`}
                  >
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>

                <div
                  className="h-2 w-full"
                  style={{
                    background: "linear-gradient(to right, #765133, #9b7b5a)",
                  }}
                />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button className="bg-[#765133] hover:bg-[#5d4128] text-white px-8 py-6 rounded-xl text-lg">
            Get Started Now
          </Button>
        </div>
      </div>
    </section>
  )
}

export default BenefitsSection
