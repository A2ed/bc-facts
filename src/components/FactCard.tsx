import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface FactCardProps {
  title?: string;
  category?: string;
  previewImage?: string;
  description?: string;
  source?: string;
}

const FactCard = ({
  title = "Amazing BC Wildlife",
  category = "Wildlife",
  previewImage = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80",
  description = "British Columbia is home to more than 1,100 different wildlife species, including some of the most iconic animals in North America such as grizzly bears, killer whales, and bald eagles.",
  source = "BC Wildlife Federation",
}: FactCardProps) => {
  return (
    <Card className="w-full h-full overflow-hidden bg-card hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={previewImage}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
          {category}
        </div>
      </div>

      <CardHeader className="pb-2 pt-4">
        <h3 className="text-lg font-semibold">{title}</h3>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>

      {source && (
        <CardFooter className="pt-0">
          <p className="text-xs text-muted-foreground">Source: {source}</p>
        </CardFooter>
      )}
    </Card>
  );
};

export default FactCard;
