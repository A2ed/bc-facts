import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import FactCard from "./FactCard";

interface Fact {
  id: string;
  title: string;
  description: string;
  category: "wildlife" | "geography" | "history" | "culture";
  imageUrl: string;
  detailedInfo: string;
}

interface FactCardGridProps {
  facts?: Fact[];
}

const FactCardGrid = ({ facts = [] }: FactCardGridProps) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Default facts if none are provided
  const defaultFacts: Fact[] = [
    {
      id: "1",
      title: "Spirit Bears",
      description:
        "BC is home to the rare Spirit Bear, a subspecies of black bear with white fur.",
      category: "wildlife",
      imageUrl:
        "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=800&q=80",
      detailedInfo:
        "The Spirit Bear, also known as the Kermode bear, is a rare subspecies of the American black bear that has white or cream-colored fur. They are found almost exclusively in the Great Bear Rainforest of British Columbia. Despite their appearance, they are not albinos but carry a recessive gene that gives them their unique coloration.",
      source: "BC Wildlife Federation",
    },
    {
      id: "2",
      title: "Tallest Mountain",
      description:
        "Mount Fairweather is the tallest mountain in BC at 4,671 meters.",
      category: "geography",
      imageUrl:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
      detailedInfo:
        "Mount Fairweather (officially gazetted as Fairweather Mountain in Canada but referred to as Mount Fairweather) is located on the border between Alaska and British Columbia. Despite its name, the mountain is notorious for its severe weather conditions. It was named by Captain James Cook in 1778 during a rare period of clear weather.",
    },
    {
      id: "3",
      title: "First Nations History",
      description:
        "BC has the most diverse Indigenous population in Canada with over 200 First Nations.",
      category: "history",
      imageUrl:
        "https://images.unsplash.com/photo-1531772337083-38e1d46a8e77?w=800&q=80",
      detailedInfo:
        "British Columbia is home to 198 distinct First Nations, each with their own unique traditions and languages. The province has the greatest diversity of Indigenous cultures in Canada, with 34 indigenous languages and approximately 60 dialects, representing 60% of all Indigenous languages in the country.",
    },
    {
      id: "4",
      title: "Film Industry",
      description:
        'Vancouver is known as "Hollywood North" due to its thriving film industry.',
      category: "culture",
      imageUrl:
        "https://images.unsplash.com/photo-1596445836561-991bcd39a86d?w=800&q=80",
      detailedInfo:
        "Vancouver is the third-largest film and television production center in North America, after Los Angeles and New York City. The city's film industry generates about $3 billion annually and provides jobs for approximately 40,000 people. Many popular TV shows and movies are filmed in Vancouver, including Supernatural, The Flash, and Deadpool.",
    },
    {
      id: "5",
      title: "Orca Population",
      description: "BC's coastal waters are home to over 300 resident orcas.",
      category: "wildlife",
      imageUrl:
        "https://images.unsplash.com/photo-1564543251651-3e886e4ecb54?w=800&q=80",
      detailedInfo:
        "British Columbia's waters are home to several pods of resident orcas (killer whales), primarily the Northern and Southern Resident populations. These intelligent marine mammals live in complex social structures and are known for their distinctive black and white coloration. They primarily feed on salmon and can live up to 80-100 years in the wild.",
    },
    {
      id: "6",
      title: "Gold Rush History",
      description:
        "The Fraser Canyon Gold Rush of 1858 helped shape BC's early development.",
      category: "history",
      imageUrl:
        "https://images.unsplash.com/photo-1589187151053-5ec8818e661b?w=800&q=80",
      detailedInfo:
        "The Fraser Canyon Gold Rush began in 1858 when gold was discovered along the Fraser River. This event brought an influx of approximately 30,000 gold miners, primarily Americans, into the region. The gold rush played a significant role in the establishment of the Colony of British Columbia and its eventual confederation with Canada.",
    },
  ];

  const displayFacts = facts.length > 0 ? facts : defaultFacts;

  const filteredFacts =
    activeCategory === "all"
      ? displayFacts
      : displayFacts.filter((fact) => fact.category === activeCategory);

  return (
    <Card className="w-full p-6 bg-white shadow-md rounded-xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Explore BC Facts
        </h2>
        <Tabs
          defaultValue="all"
          onValueChange={setActiveCategory}
          className="w-full"
        >
          <TabsList className="grid grid-cols-5 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="wildlife">Wildlife</TabsTrigger>
            <TabsTrigger value="geography">Geography</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="culture">Culture</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFacts.map((fact) => (
                <FactCard
                  key={fact.id}
                  title={fact.title}
                  description={fact.description}
                  category={fact.category}
                  imageUrl={fact.imageUrl}
                  detailedInfo={fact.detailedInfo}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="wildlife" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFacts.map((fact) => (
                <FactCard
                  key={fact.id}
                  title={fact.title}
                  description={fact.description}
                  category={fact.category}
                  imageUrl={fact.imageUrl}
                  detailedInfo={fact.detailedInfo}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="geography" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFacts.map((fact) => (
                <FactCard
                  key={fact.id}
                  title={fact.title}
                  description={fact.description}
                  category={fact.category}
                  imageUrl={fact.imageUrl}
                  detailedInfo={fact.detailedInfo}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFacts.map((fact) => (
                <FactCard
                  key={fact.id}
                  title={fact.title}
                  description={fact.description}
                  category={fact.category}
                  imageUrl={fact.imageUrl}
                  detailedInfo={fact.detailedInfo}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="culture" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFacts.map((fact) => (
                <FactCard
                  key={fact.id}
                  title={fact.title}
                  description={fact.description}
                  category={fact.category}
                  imageUrl={fact.imageUrl}
                  detailedInfo={fact.detailedInfo}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};

export default FactCardGrid;
