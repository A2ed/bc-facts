import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Region {
  id: string;
  name: string;
  path: string;
  facts: string[];
  images: string[];
}

interface InteractiveMapProps {
  regions?: Region[];
  onRegionClick?: (region: Region) => void;
}

const InteractiveMap = ({
  regions = defaultRegions,
  onRegionClick = () => {},
}: InteractiveMapProps) => {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const handleRegionClick = (region: Region) => {
    setSelectedRegion(region);
    onRegionClick(region);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full h-full bg-background">
      <div className="relative w-full md:w-2/3 h-[500px] md:h-[700px] border rounded-lg overflow-hidden bg-slate-100">
        <svg
          viewBox="0 0 800 450"
          className="w-full h-full bg-white/30 backdrop-blur-sm"
          preserveAspectRatio="xMidYMid meet"
        >
          <g>
            {regions.map((region) => (
              <TooltipProvider key={region.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <path
                      d={region.path}
                      fill={
                        selectedRegion?.id === region.id
                          ? "#3b82f6"
                          : hoveredRegion === region.id
                            ? "#93c5fd"
                            : "#e2e8f0"
                      }
                      stroke="#1e293b"
                      strokeWidth="2"
                      onClick={() => handleRegionClick(region)}
                      onMouseEnter={() => setHoveredRegion(region.id)}
                      onMouseLeave={() => setHoveredRegion(null)}
                      className="cursor-pointer transition-colors duration-200"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{region.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </g>
        </svg>
        <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm p-2 rounded-md text-xs">
          <p>Click on a region to learn more about it</p>
        </div>
      </div>

      <div className="w-full md:w-1/3">
        {selectedRegion ? (
          <Card className="h-full">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">{selectedRegion.name}</h2>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Facts</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {selectedRegion.facts.map((fact, index) => (
                    <li key={index}>{fact}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Gallery</h3>
                <div className="grid grid-cols-2 gap-2">
                  {selectedRegion.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${selectedRegion.name} - ${index + 1}`}
                      className="w-full h-32 object-cover rounded-md"
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="h-full flex items-center justify-center">
            <CardContent className="text-center">
              <h2 className="text-xl font-medium text-muted-foreground">
                Select a region on the map to view details
              </h2>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

// Default regions with simplified SVG paths for demonstration
const defaultRegions: Region[] = [
  {
    id: "vancouver-island",
    name: "Vancouver Island",
    path: "M100,400 L150,350 L200,400 L150,450 Z",
    facts: [
      "Vancouver Island is the largest island on the west coast of North America.",
      "It is home to the capital city of British Columbia, Victoria.",
      "The island has one of the mildest climates in Canada.",
    ],
    images: [
      "https://images.unsplash.com/photo-1577715694662-6a659907b7f3?w=600&q=80",
      "https://images.unsplash.com/photo-1578146189990-a6582f0afbf6?w=600&q=80",
    ],
  },
  {
    id: "lower-mainland",
    name: "Lower Mainland",
    path: "M250,400 L300,350 L350,400 L300,450 Z",
    facts: [
      "The Lower Mainland is home to Vancouver, the largest city in British Columbia.",
      "It contains over 60% of British Columbia's population.",
      "The region is known for its diverse cultural communities.",
    ],
    images: [
      "https://images.unsplash.com/photo-1560813962-ff3d8fcf59ba?w=600&q=80",
      "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=600&q=80",
    ],
  },
  {
    id: "okanagan",
    name: "Okanagan Valley",
    path: "M400,400 L450,350 L500,400 L450,450 Z",
    facts: [
      "The Okanagan Valley is famous for its wineries and fruit orchards.",
      "It features a semi-arid climate with hot summers and mild winters.",
      "Okanagan Lake is over 135 km long and home to the legendary Ogopogo.",
    ],
    images: [
      "https://images.unsplash.com/photo-1626268154898-9f0e7a2d0f4f?w=600&q=80",
      "https://images.unsplash.com/photo-1621543589088-9f228c2e60e4?w=600&q=80",
    ],
  },
  {
    id: "kootenays",
    name: "Kootenay Region",
    path: "M550,400 L600,350 L650,400 L600,450 Z",
    facts: [
      "The Kootenay region is known for its stunning mountain landscapes.",
      "It has a rich mining history dating back to the 1800s.",
      "The area is popular for outdoor activities like skiing and hiking.",
    ],
    images: [
      "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=600&q=80",
      "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?w=600&q=80",
    ],
  },
  {
    id: "northern-bc",
    name: "Northern BC",
    path: "M400,250 L450,200 L500,250 L450,300 Z",
    facts: [
      "Northern BC covers more than half of the province's land area.",
      "It is home to the Great Bear Rainforest, one of the largest temperate rainforests in the world.",
      "The region features the unique Spirit Bear, a rare white subspecies of black bear.",
    ],
    images: [
      "https://images.unsplash.com/photo-1469122312224-c5846569feb1?w=600&q=80",
      "https://images.unsplash.com/photo-1518128958364-65859d70aa41?w=600&q=80",
    ],
  },
];

export default InteractiveMap;
