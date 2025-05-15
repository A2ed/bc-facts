import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TimelineEvent {
  id: string;
  year: number;
  title: string;
  description: string;
  imageUrl: string;
  category: "settlement" | "politics" | "culture" | "natural";
}

const HistoryTimeline = ({
  events = defaultEvents,
}: {
  events?: TimelineEvent[];
}) => {
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const activeEvent = events[activeEventIndex];

  const handlePrevious = () => {
    setActiveEventIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setActiveEventIndex((prev) => (prev < events.length - 1 ? prev + 1 : prev));
  };

  // Calculate progress width based on active dot position instead of continuous percentage
  const calculateProgressWidth = () => {
    if (events.length <= 1) return "0%";
    return `${(activeEventIndex / (events.length - 1)) * 100}%`;
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        British Columbia Timeline
      </h2>

      {/* Timeline bar */}
      <div className="relative mb-8">
        <div className="h-2 bg-gray-200 rounded-full relative">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500 ease-in-out"
            style={{
              width: calculateProgressWidth(),
            }}
          />

          {/* Timeline dots */}
          <div className="absolute top-0 left-0 w-full flex items-center justify-between">
            {events.map((event, index) => (
              <TooltipProvider key={event.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setActiveEventIndex(index)}
                      className={`w-4 h-4 rounded-full transition-all transform -translate-y-1/4 ${index <= activeEventIndex ? "bg-primary" : "bg-gray-300"
                        } ${index === activeEventIndex ? "scale-150" : ""}`}
                      aria-label={`View event from ${event.year}: ${event.title}`}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {event.year}: {event.title}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-2 text-sm text-gray-500">
          {events.length > 0 && (
            <>
              <span>{events[0].year}</span>
              <span>{events[events.length - 1].year}</span>
            </>
          )}
        </div>
      </div>

      {/* Event display */}
      {activeEvent && (
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            key={activeEvent.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center mb-2">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mr-2">
                  {activeEvent.year}
                </span>
                <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
                  {activeEvent.category}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3">{activeEvent.title}</h3>
              <p className="text-gray-600">{activeEvent.description}</p>
            </div>

            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={activeEventIndex === 0}
                className="flex items-center"
              >
                <ChevronLeft className="mr-1 h-4 w-4" /> Previous
              </Button>
              <Button
                variant="outline"
                onClick={handleNext}
                disabled={activeEventIndex === events.length - 1}
                className="flex items-center"
              >
                Next <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            key={`image-${activeEvent.id}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-lg overflow-hidden aspect-video"
          >
            <img
              src={activeEvent.imageUrl}
              alt={activeEvent.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 right-0 p-2 bg-black/50 text-white text-xs rounded-tl-md">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="flex items-center">
                      <Info className="h-4 w-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Historical image of {activeEvent.title}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </motion.div>
        </div>
      )}

      {/* Mobile swipe indicator */}
      <div className="md:hidden mt-6 text-center text-sm text-gray-500">
        <p>Swipe left or right to navigate</p>
      </div>
    </div>
  );
};

// Default timeline events
const defaultEvents: TimelineEvent[] = [
  {
    id: "1",
    year: 1778,
    title: "Captain James Cook Arrives",
    description:
      "Captain James Cook becomes the first European to set foot on what is now British Columbia, landing at Nootka Sound on Vancouver Island.",
    imageUrl:
      "https://images.unsplash.com/photo-1534190239940-9ba8944ea261?w=800&q=80",
    category: "settlement",
  },
  {
    id: "2",
    year: 1858,
    title: "Fraser Canyon Gold Rush",
    description:
      "The Fraser Canyon Gold Rush brings approximately 30,000 prospectors to British Columbia, leading to the establishment of the Colony of British Columbia.",
    imageUrl:
      "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&q=80",
    category: "settlement",
  },
  {
    id: "3",
    year: 1871,
    title: "BC Joins Confederation",
    description:
      "British Columbia joins the Canadian Confederation as its sixth province, with the promise of a transcontinental railway.",
    imageUrl:
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80",
    category: "politics",
  },
  {
    id: "4",
    year: 1885,
    title: "Canadian Pacific Railway Completed",
    description:
      "The last spike of the Canadian Pacific Railway is driven at Craigellachie, BC, connecting British Columbia to the rest of Canada by rail.",
    imageUrl:
      "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&q=80",
    category: "settlement",
  },
  {
    id: "5",
    year: 1915,
    title: "Women Gain Right to Vote",
    description:
      "Women in British Columbia gain the right to vote in provincial elections, a significant milestone in the women's suffrage movement.",
    imageUrl:
      "https://images.unsplash.com/photo-1494172961521-33799ddd43a5?w=800&q=80",
    category: "politics",
  },
  {
    id: "6",
    year: 1986,
    title: "Expo 86 World Fair",
    description:
      "Vancouver hosts Expo 86, a World's Fair that puts British Columbia on the international stage and transforms the city's landscape.",
    imageUrl:
      "https://images.unsplash.com/photo-1558441440-d4111d18d48f?w=800&q=80",
    category: "culture",
  },
  {
    id: "7",
    year: 2010,
    title: "Vancouver Winter Olympics",
    description:
      "Vancouver and Whistler host the 2010 Winter Olympics and Paralympics, showcasing British Columbia to the world.",
    imageUrl:
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80",
    category: "culture",
  },
];

export default HistoryTimeline;
