import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import FactCard from "./FactCard";

interface Fact {
  id: string;
  title: string;
  description: string;
  category: "wildlife" | "culture";
  imageUrl: string;
  detailedInfo: string;
  source?: string;
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
      title: "Black Bears",
      description:
        "BC is home to approximately 120,000-160,000 black bears, the largest population in North America.",
      category: "wildlife",
      imageUrl: "/images/black-bear.jpg",
      detailedInfo:
        "Black bears are the most common bear species in British Columbia. They can be found in almost every region of the province, from coastal rainforests to inner mountain ranges. Despite their name, they can range in color from jet black to cinnamon brown or even white (known as Kermode bears).",
      source: "BC Wildlife Federation",
    },
    {
      id: "2",
      title: "Rattlesnakes",
      description: "The Northern Pacific Rattlesnake is BC's only venomous snake species.",
      category: "wildlife",
      imageUrl: "/images/rattlesnake.jpg",
      detailedInfo:
        "The Northern Pacific Rattlesnake (Crotalus oreganus) is the only venomous snake found in British Columbia. They're primarily found in the dry interior valleys of the southern Okanagan and Similkameen. While venomous, they generally avoid human contact and rattlesnake bites are rare in BC.",
      source: "BC Ministry of Environment",
    },
    {
      id: "3",
      title: "California Roll Origin",
      description:
        "The California Roll was invented in Vancouver by Japanese chef Hidekazu Tojo in the 1970s.",
      category: "culture",
      imageUrl: "/images/california-roll.jpg",
      detailedInfo:
        "Chef Hidekazu Tojo created the now-famous California Roll in Vancouver in the 1970s. He inverted traditional sushi by hiding the seaweed on the inside and using avocado, crab, and cucumber to appeal to Western customers who were hesitant to eat raw fish and seaweed. This innovation helped popularize sushi across North America.",
      source: "Google",
    },
    {
      id: "4",
      title: "Greenpeace Founded",
      description:
        "The global environmental organization Greenpeace was founded in Vancouver in 1971.",
      category: "culture",
      imageUrl: "/images/greenpeace.jpg",
      detailedInfo:
        "Greenpeace was founded in Vancouver, British Columbia, in 1971 by a small group of activists protesting nuclear testing near Alaska. What began as a small grassroots movement has grown into one of the largest and most influential environmental organizations in the world, now operating in more than 55 countries.",
      source: "Google",
    },
    {
      id: "5",
      title: "Grizzly Sanctuary",
      description:
        "The Khutzeymateen Grizzly Bear Sanctuary was the first area in Canada protected specifically for grizzly bears.",
      category: "culture",
      imageUrl: "/images/grizzly-sanctuary.jpg",
      detailedInfo:
        "Established in 1994, the Khutzeymateen (K'tzim-a-deen) Grizzly Bear Sanctuary is Canada's first area to be protected specifically for grizzly bears and their habitat. Located near Prince Rupert in northern BC, this remote sanctuary spans 44,300 hectares and is home to approximately 50 grizzlies, offering visitors a rare opportunity to observe these magnificent animals in their natural habitat.",
      source: "Google",
    },
    {
      id: "6",
      title: "Bats",
      description:
        "BC is home to 16 bat species, including the rare Spotted Bat.",
      category: "wildlife",
      imageUrl: "/images/bats.jpg",
      detailedInfo:
        "British Columbia hosts 16 of Canada's 19 bat species. These include the Little Brown Myotis, Big Brown Bat, and the unique Spotted Bat with its distinctive black and white coloration. BC's bat populations play a crucial ecological role by consuming vast quantities of insects including many agricultural pests.",
      source: "BC Bat Action Team",
    },
    {
      id: "7",
      title: "Rats",
      description:
        "Norway and Black rats were introduced to BC through shipping in the late 1800s.",
      category: "wildlife",
      imageUrl: "/images/rats.jpg",
      detailedInfo:
        "Both Norway rats and Black rats are non-native species to British Columbia, arriving via ships during European colonization. They've become established in urban areas and some islands along the coast. These resourceful rodents have significant ecological impacts, particularly on seabird colonies where they prey on eggs and nestlings.",
      source: "BC Invasive Species Council",
    },
    {
      id: "8",
      title: "Cougars",
      description:
        "BC has the highest concentration of mountain lions (cougars) in North America.",
      category: "wildlife",
      imageUrl: "/images/cougar.jpg",
      detailedInfo:
        "British Columbia is home to approximately 4,000-6,000 cougars, the highest population density in North America. These elusive big cats, also known as mountain lions or pumas, can be found throughout the province but are most common on Vancouver Island, which has the highest concentration of cougars in the world.",
      source: "BC Conservation Foundation",
    },
    {
      id: "9",
      title: "World's Largest Hockey Stick",
      description:
        "Duncan, BC, is home to the world's largest hockey stick, measuring 205 feet long.",
      category: "culture",
      imageUrl: "/images/hockey-stick.jpg",
      detailedInfo:
        "Originally built for the 1986 Expo in Vancouver, the world's largest hockey stick now resides in Duncan, BC. Measuring 205 feet (62.4 meters) long and weighing 61,000 pounds (28,000 kg), this giant Douglas fir hockey stick and puck is recognized by the Guinness Book of World Records. It's displayed at the Cowichan Community Centre and has become a popular tourist attraction.",
      source: "Google",
    },
    {
      id: "10",
      title: "Mildest Climate in Canada",
      description:
        "Victoria, BC, enjoys the mildest climate in Canada with the lowest average annual snowfall.",
      category: "culture",
      imageUrl: "/images/victoria-climate.jpg",
      detailedInfo:
        "Victoria, British Columbia's capital city, boasts the mildest climate in Canada. With an average annual temperature of 11°C (52°F), Victoria experiences warm, dry summers and mild, wet winters. The city receives only about 26 cm (10 inches) of snow annually and over 2,000 hours of sunshine each year, making it a haven for gardeners and outdoor enthusiasts who enjoy a year-round growing season and outdoor activities.",
      source: "Google",
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
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="wildlife">Wildlife</TabsTrigger>
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
                  previewImage={fact.imageUrl}
                  source={fact.source}
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
                  previewImage={fact.imageUrl}
                  source={fact.source}
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
                  previewImage={fact.imageUrl}
                  source={fact.source}
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
