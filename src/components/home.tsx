import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, BookOpen, Clock, Sparkles, Music, Brain } from "lucide-react";
import InteractiveMap from "./InteractiveMap";
import FactCardGrid from "./FactCardGrid";
import HistoryTimeline from "./HistoryTimeline";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("map");
  const [randomFact, setRandomFact] = useState<{
    title: string;
    description: string;
    imageUrl: string;
  } | null>(null);

  // Trivia state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timerActive, setTimerActive] = useState(false);

  // Mock data for random facts
  const randomFacts = [
    {
      title: "Spirit Bears",
      description:
        "The rare Kermode (Spirit) bear, a subspecies of black bear with white fur, is found almost exclusively in BC's Great Bear Rainforest.",
      imageUrl:
        "https://images.unsplash.com/photo-1525382455947-f319bc05fb35?w=800&q=80",
    },
    {
      title: "Tallest Trees",
      description:
        "BC is home to some of the tallest trees in the world, with coastal Douglas firs reaching heights of over 300 feet.",
      imageUrl:
        "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&q=80",
    },
    {
      title: "Volcanic History",
      description:
        "The Black Tusk in Garibaldi Provincial Park is the remnant of an extinct volcano that was active about 1.3 million years ago.",
      imageUrl:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    },
    {
      title: "Indigenous Heritage",
      description:
        "BC has the most diverse Indigenous population in Canada, with over 200 First Nations communities and more than 30 Indigenous languages.",
      imageUrl:
        "https://images.unsplash.com/photo-1531088009183-5ff5b7c95f91?w=800&q=80",
    },
  ];

  // Trivia questions
  const triviaQuestions = [
    {
      question: "What is on the flag of British Columbia?",
      answer: "A sun setting over blue and white waves",
      difficulty: "Easy"
    },
    {
      question: "What large animal can you sometimes see swimming in BC's oceans?",
      answer: "Orcas (killer whales)",
      difficulty: "Easy"
    },
    {
      question: "What is the capital city of British Columbia?",
      answer: "Victoria",
      difficulty: "Easy"
    },
    {
      question: "What is the name of the big city in British Columbia where many people live?",
      answer: "Vancouver",
      difficulty: "Easy"
    },
    {
      question: "What tall mountains can you see in British Columbia?",
      answer: "The Rocky Mountains",
      difficulty: "Easy"
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger a search through the facts database
    console.log("Searching for:", searchQuery);
  };

  const generateRandomFact = () => {
    const randomIndex = Math.floor(Math.random() * randomFacts.length);
    setRandomFact(randomFacts[randomIndex]);
  };

  const startTrivia = () => {
    setShowAnswer(false);
    setTimer(15);
    setTimerActive(true);
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      (prevIndex + 1) % triviaQuestions.length
    );
    setShowAnswer(false);
    setTimer(15);
    setTimerActive(true);
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && timerActive) {
      setShowAnswer(true);
      setTimerActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer, timerActive]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-6 px-4 md:px-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-bold">British Columbia Explorer</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-8">
            <TabsTrigger value="map" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="hidden md:inline">Interactive Map</span>
              <span className="md:hidden">Map</span>
            </TabsTrigger>
            <TabsTrigger value="facts" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden md:inline">Fact Cards</span>
              <span className="md:hidden">Facts</span>
            </TabsTrigger>
            <TabsTrigger value="timeline" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="hidden md:inline">History Timeline</span>
              <span className="md:hidden">Timeline</span>
            </TabsTrigger>
            <TabsTrigger value="random" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span className="hidden md:inline">Did You Know?</span>
              <span className="md:hidden">Random</span>
            </TabsTrigger>
            <TabsTrigger value="bearDance" className="flex items-center gap-2">
              <Music className="h-4 w-4" />
              <span className="hidden md:inline">Bear Dance</span>
              <span className="md:hidden">Dance</span>
            </TabsTrigger>
            <TabsTrigger value="trivia" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span className="hidden md:inline">Trivia BC</span>
              <span className="md:hidden">Trivia</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="map"
            className="focus-visible:outline-none focus-visible:ring-0"
          >
            <div className="bg-card rounded-lg shadow-md p-4">
              <h2 className="text-2xl font-semibold mb-4">
                Explore British Columbia
              </h2>
              <p className="text-muted-foreground mb-6">
                Explore the geography of British Columbia with an interactive Google Map. Pan and zoom to discover different regions.
              </p>
              <InteractiveMap />
            </div>
          </TabsContent>

          <TabsContent
            value="facts"
            className="focus-visible:outline-none focus-visible:ring-0"
          >
            <div className="bg-card rounded-lg shadow-md p-4">
              <h2 className="text-2xl font-semibold mb-4">
                Fascinating BC Facts
              </h2>
              <p className="text-muted-foreground mb-6">
                Browse through our collection of interesting facts about British
                Columbia. Click on a card to learn more.
              </p>
              <FactCardGrid />
            </div>
          </TabsContent>

          <TabsContent
            value="timeline"
            className="focus-visible:outline-none focus-visible:ring-0"
          >
            <div className="bg-card rounded-lg shadow-md p-4">
              <h2 className="text-2xl font-semibold mb-4">
                BC History Timeline
              </h2>
              <p className="text-muted-foreground mb-6">
                Swipe through key events in British Columbia's rich history.
              </p>
              <HistoryTimeline />
            </div>
          </TabsContent>

          <TabsContent
            value="random"
            className="focus-visible:outline-none focus-visible:ring-0"
          >
            <div className="bg-card rounded-lg shadow-md p-4">
              <h2 className="text-2xl font-semibold mb-4">Did You Know?</h2>
              <p className="text-muted-foreground mb-6">
                Discover surprising facts about British Columbia.
              </p>

              <div className="flex justify-center mb-8">
                <Button
                  onClick={generateRandomFact}
                  size="lg"
                  className="flex items-center gap-2"
                >
                  <Sparkles className="h-5 w-5" />
                  Show Me a Random Fact
                </Button>
              </div>

              {randomFact && (
                <div className="max-w-2xl mx-auto bg-muted rounded-xl overflow-hidden shadow-lg">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={randomFact.imageUrl}
                      alt={randomFact.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">
                      {randomFact.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {randomFact.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent
            value="bearDance"
            className="focus-visible:outline-none focus-visible:ring-0"
          >
            <div className="bg-card rounded-lg shadow-md p-4">
              <h2 className="text-2xl font-semibold mb-4">Bear Dance</h2>
              <p className="text-muted-foreground mb-6">
                Watch these two bears showing off their dance moves!
              </p>

              <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                <div className="bg-muted rounded-xl overflow-hidden shadow-lg p-4 text-center">
                  <div className="h-64 w-64 mx-auto flex items-center justify-center">
                    <img
                      src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGJmamF6aDBzMWsybDZzcXE5YTRuYTJtOTVreHJqY2R0cnNrZnl5OCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QAB3dfWbviuR0iIC1T/giphy.gif"
                      alt="Dancing Bear GIF"
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                  <h3 className="text-xl font-bold mt-4">Dancing Bear</h3>
                  <p>This adorable bear has the cutest dance moves!</p>
                </div>

                <div className="bg-muted rounded-xl overflow-hidden shadow-lg p-4 text-center">
                  <div className="h-64 w-64 mx-auto flex items-center justify-center">
                    <img
                      src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmwwMmVmOWQwMzRueno3dHZjNzd3ZDhuNHViMG9idTNjc2xkOGk3ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lGoUhiiyBJy1dz8SvD/giphy.gif"
                      alt="Dancing Bear 2 GIF"
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                  <h3 className="text-xl font-bold mt-4">Bear Boogie</h3>
                  <p>BC is awesome! Let's go</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="trivia"
            className="focus-visible:outline-none focus-visible:ring-0"
          >
            <div className="bg-card rounded-lg shadow-md p-4">
              <h2 className="text-2xl font-semibold mb-4">BC Trivia Challenge</h2>
              <p className="text-muted-foreground mb-6">
                Test your knowledge about British Columbia with these trivia questions!
              </p>

              <div className="max-w-2xl mx-auto bg-muted rounded-xl overflow-hidden shadow-lg p-6">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">
                      Question {currentQuestionIndex + 1} of {triviaQuestions.length}
                    </span>
                    <span className="text-sm font-medium text-primary">
                      Difficulty: {triviaQuestions[currentQuestionIndex].difficulty}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-8">
                    {triviaQuestions[currentQuestionIndex].question}
                  </h3>

                  {timerActive && (
                    <div className="w-full bg-secondary rounded-full h-4 mb-6">
                      <div
                        className="bg-primary h-4 rounded-full transition-all duration-1000 ease-linear"
                        style={{ width: `${(timer / 15) * 100}%` }}
                      ></div>
                      <p className="text-center mt-2">Time remaining: {timer}s</p>
                    </div>
                  )}

                  {showAnswer ? (
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold mb-2">Answer:</h4>
                      <div className="p-4 bg-secondary rounded-lg">
                        <p className="text-xl">{triviaQuestions[currentQuestionIndex].answer}</p>
                      </div>
                      <div className="mt-6 flex justify-center">
                        <Button onClick={nextQuestion}>Next Question</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-center mt-6">
                      {!timerActive && (
                        <Button onClick={startTrivia} size="lg">
                          Start Timer
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-6 px-4 mt-12">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© Ophelia Clementine Francis</p>
          <p className="text-sm mt-2">
            Discover the beauty and wonders of British Columbia
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
