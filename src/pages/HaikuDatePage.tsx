import React, { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import Counter from "../components/ui/Counter";
import HaikuDate from "../components/ui/HaikuDate";

// Sample haiku data
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

const HaikuDatePage: React.FC = () => {
  const [haiku, setHaiku] = useState(sampleHaikus[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * sampleHaikus.length);
    setHaiku(sampleHaikus[randomIndex]);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />

      <main className="flex-1 flex flex-col pt-10 px-4 sm:px-6 lg:px-8">
        <div className="flex-1 flex items-center justify-center">
          <HaikuDate
            text={haiku.text}
            author={haiku.author}
            season={haiku.season}
            year={haiku.year}
            image={haiku.image}
            keywords={haiku.keywords}
          />
        </div>
      </main>
    </div>
  );
};

export default HaikuDatePage;
