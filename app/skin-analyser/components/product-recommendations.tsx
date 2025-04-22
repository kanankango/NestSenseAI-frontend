import { Button } from "../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { StarIcon } from "lucide-react"

export function ProductRecommendations() {
  const products = [
    {
      name: "Hydra-Boost Moisturizer",
      description: "Lightweight gel-cream with hyaluronic acid for all-day hydration",
      price: "$38",
      rating: 4.8,
      reviews: 256,
      image: "/product-1.jpg",
      tags: ["Hydrating", "Combination Skin"],
    },
    {
      name: "Gentle Enzyme Cleanser",
      description: "Removes impurities without stripping natural oils",
      price: "$32",
      rating: 4.7,
      reviews: 189,
      image: "/product-2.jpg",
      tags: ["Cleansing", "Sensitive"],
    },
    {
      name: "Balancing Facial Oil",
      description: "Lightweight oil that balances and nourishes combination skin",
      price: "$45",
      rating: 4.9,
      reviews: 124,
      image: "/product-3.jpg",
      tags: ["Balancing", "Nourishing"],
    },
  ]

  return (
    <div className="container max-w-6xl mx-auto px-4 py-12">
      <div className="w-full max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-2">
            Personalized Recommendations
          </h2>
          <p className="text-[#1C1C1E]/70 dark:text-[#F3F4F6]/70 max-w-2xl mx-auto">
            Based on your skin analysis, our AI has selected these products specifically for your combination skin
            needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <Card key={index} className="bg-white dark:bg-[#1C1C1E]/90 shadow-md overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-[#FFDEE9]/10 to-[#B5FFFC]/10 flex items-center justify-center">
                <div className="w-32 h-32 bg-[#F3F4F6] dark:bg-black/20 rounded-lg flex items-center justify-center">
                  <span className="text-[#1C1C1E]/30 dark:text-white/30 text-xs">Product Image</span>
                </div>
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg text-black dark:text-white">{product.name}</CardTitle>
                  <Badge variant="outline" className="bg-gradient-to-r from-[#FFDEE9]/20 to-[#B5FFFC]/20 border-none">
                    AI Match
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-[#1C1C1E]/70 dark:text-[#F3F4F6]/70">{product.description}</p>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-[#E6D5C6] text-[#E6D5C6]"
                            : "fill-[#F3F4F6] text-[#F3F4F6] dark:fill-[#1C1C1E]/30 dark:text-[#1C1C1E]/30"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-[#1C1C1E]/60 dark:text-[#F3F4F6]/60 ml-2">({product.reviews})</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs px-2 py-1 bg-[#F3F4F6] dark:bg-black/20 rounded-full text-[#1C1C1E]/70 dark:text-[#F3F4F6]/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <span className="font-bold text-black dark:text-white">{product.price}</span>
                <Button className="rounded-full bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="outline" className="rounded-full border-[#E6D5C6] text-[#1C1C1E] dark:text-white px-8">
            View All Recommendations
          </Button>
        </div>
      </div>
    </div>
  )
}
