
import React, { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import Counter from "../components/ui/Counter";
import HaikuDisplay from "../components/ui/HaikuDisplay";

// Sample haiku data - in a real app, this would come from an API
const sampleHaikus = [
  {
    text: ["An old silent pond", "A frog jumps into the pond—", "Splash! Silence again."],
    author: "Matsuo Bashō",
    season: "Summer",
    year: "1686",
    image: "https://cdn.openart.ai/uploads/image_g29gm2mw_1742019749799_raw.jpg",
    keywords: ["pond", "frog", "silence", "nature"]
  },
  {
    text: ["The first cold shower", "even the monkey seems to want", "a little coat of straw"],
    author: "Matsuo Bashō",
    season: "Autumn",
    year: "1684",
    image: "https://cdn.openart.ai/uploads/image_g29gm2mw_1742019749799_raw.jpg",
    keywords: ["cold", "shower", "monkey", "autumn"]
  },
  {
    text: ["In the twilight rain", "these brilliant-hued hibiscus -", "A lovely sunset"],
    author: "Matsuo Bashō",
    season: "Spring",
    year: "1688",
    image: "https://cdn.openart.ai/uploads/image_g29gm2mw_1742019749799_raw.jpg",
    keywords: ["rain", "hibiscus", "sunset", "spring"]
  },
  {
    text: ["Winter solitude -", "in a world of one color", "the sound of wind."],
    author: "Matsuo Bashō",
    season: "Winter",
    year: "1690",
    image: "https://cdn.openart.ai/uploads/image_g29gm2mw_1742019749799_raw.jpg",
    keywords: ["winter", "solitude", "wind", "monochrome"]
  }
];

const Index: React.FC = () => {
  // In a real app, we would fetch today's haiku from an API
  const [haiku, setHaiku] = useState(sampleHaikus[0]);
  
  // Simulate getting a random haiku for demo purposes
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * sampleHaikus.length);
    setHaiku(sampleHaikus[randomIndex]);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col overflow-hidden">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-24 min-h-[100dvh] bg-black text-white">
        <div className="w-full max-w-6xl flex flex-col items-center space-y-8 sm:space-y-12 pt-24 sm:pt-28 pb-10 sm:pb-16">

          {/* Haiku */}
          <div className="w-full flex justify-center">
            <HaikuDisplay 
              text={haiku.text}
              author={haiku.author}
              season={haiku.season}
              year={haiku.year}
              image={haiku.image}
              keywords={haiku.keywords}
            />
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center">
            <a
              href="https://buymeacoffee.com/tomasmorales"
              target="_blank"
              className="inline-block border border-white text-white font-medium px-6 py-3 rounded-full hover:bg-white hover:text-black transition-colors"
            >
              Support the project
            </a>
            <p className="text-sm mt-3 text-gray-500 text-center leading-relaxed max-w-xs sm:max-w-sm">
              If one of these haikus moved you,<br />consider supporting the project here.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
