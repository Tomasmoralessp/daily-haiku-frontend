import React, { useEffect, useState } from "react";
import { Button } from "./button";
import { Share2 } from "lucide-react";

interface Haiku {
  id: number;
  haiku: string;
  author: string;
  season: string;
  title?: string | null;
  notes?: string | null;
  source?: string;
  keywords?: string | string[] | null;
  image_url: string;
}

const HaikuDisplay: React.FC = () => {
  const [data, setData] = useState<Haiku | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/daily_haiku`)
      .then((response) => {
        if (!response.ok) throw new Error("Error al obtener el haiku");
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleShare = () => {
    const today = new Date().toISOString().split("T")[0];
    const url = `https://dailyhaiku.app/haiku/${today}`;
    if (navigator.share) {
      navigator
        .share({
          title: "🌸 Daily Haiku",
          text: "Enjoy today’s haiku",
          url,
        })
        .catch((err) => console.error("Error sharing:", err));
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-400 text-xl">Cargando haiku...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-400 text-xl">Error: {error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-400 text-xl">No hay haiku disponible.</p>
      </div>
    );
  }

  let keywordsArray: string[] = [];
  if (typeof data.keywords === "string") {
    try {
      keywordsArray = JSON.parse(data.keywords);
    } catch (error) {
      console.error("Error al parsear keywords:", error);
    }
  } else if (Array.isArray(data.keywords)) {
    keywordsArray = data.keywords;
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Mobile layout */}
      <div className="md:hidden flex flex-col space-y-6">
        {/* Haiku Image primero en móvil */}
        <div className="px-4">
          <div className="relative w-full aspect-square max-h-60 rounded-2xl overflow-hidden">
            <img
              src={data.image_url}
              alt="Imagen del haiku"
              className="w-full h-full object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent to-black/10 pointer-events-none" />
          </div>
        </div>
        
        {/* Haiku Text después en móvil */}
        <div className="text-center px-4">
          <p className="text-2xl font-light leading-relaxed mb-4">{data.haiku}</p>
          <p className="text-lg uppercase font-medium">{data.author}</p>
          <p className="text-gray-400 uppercase text-sm mb-4">{data.season}</p>
          
          {/* Keywords */}
          {keywordsArray.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {keywordsArray.map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs bg-gray-800 text-gray-300 rounded-full"
                >
                  #{keyword}
                </span>
              ))}
            </div>
          )}
          
          {/* Share button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="mt-2 border-gray-700 hover:bg-gray-800"
          >
            <Share2 className="mr-1 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>
      
      {/* Desktop layout */}
      <div className="hidden md:flex md:flex-row items-center justify-center w-full gap-12 lg:gap-16 px-4">
        {/* Image */}
        <div className="w-2/5 flex flex-col items-center justify-center">
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
            <img
              src={data.image_url}
              alt="Imagen del haiku"
              className="w-full h-full object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent to-black/10 pointer-events-none" />
          </div>
        </div>

        {/* Texto y metadatos */}
        <div className="w-3/5 flex flex-col items-start justify-center">
          <div className="mb-6 max-w-lg">
            <p className="text-3xl lg:text-4xl font-light leading-relaxed mb-6">{data.haiku}</p>
          </div>

          <div>
            <p className="uppercase tracking-wide font-medium text-lg">{data.author}</p>
            <p className="uppercase tracking-wide text-gray-400 mb-4">{data.season}</p>

            {keywordsArray.length > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {keywordsArray.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs bg-gray-800 text-gray-300 rounded-full"
                    >
                      #{keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="border-gray-700 hover:bg-gray-800"
            >
              <Share2 className="mr-1 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HaikuDisplay;
