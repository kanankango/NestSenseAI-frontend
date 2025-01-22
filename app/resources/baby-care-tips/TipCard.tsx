import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TipCardProps {
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  link?: string;
}

export const TipCard = ({ title, description, category, imageUrl, link }: TipCardProps) => {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 hover:scale-105 rounded-3xl border-none shadow-md">
      <div className="relative h-48 overflow-hidden rounded-t-3xl">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <CardHeader className="space-y-2 bg-white rounded-b-3xl p-4">
        <div className="flex items-center justify-between">
          <Badge 
            variant="secondary" 
            className="bg-[#F8D7D9] text-[#1D4B4B] hover:bg-[#F8D7D9]/90 rounded-full px-3 text-xs animate-pulse"
          >
            {category}
          </Badge>
        </div>
        <CardTitle className="text-lg font-serif text-[#1D4B4B] line-clamp-2 group-hover:text-[#4A7A7A] transition-colors">{title}</CardTitle>
        <CardDescription className="line-clamp-2 text-sm text-[#4A7A7A]">{description}</CardDescription>
        <button className="text-[#1D4B4B] bg-[#F8D7D9] hover:bg-[#F8D7D9]/90 px-3 py-1.5 rounded-full text-xs transition-all hover:scale-105 mt-2">
          Read More
        </button>
      </CardHeader>
    </Card>
  );
};