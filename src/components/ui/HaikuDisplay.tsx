import React, { useEffect, useState } from "react";
import { Button } from "./button";
import { Share2, Heart } from "lucide-react";

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
  const [isHeartAnimating, setIsHeartAnimating] = useState(false);

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
    const shareUrl = `https://daily-haiku-backend-production.up.railway.app/haiku/${today}`; // OG-ready
  
    if (navigator.share) {
      navigator
        .share({
          title: "🌸 Daily Haiku",
          text: "Enjoy today's haiku",
          url: shareUrl,
        })
        .catch((err) => console.error("Error sharing:", err));
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    }
  };

  const handleSupportClick = () => {
    setIsHeartAnimating(true);
    setTimeout(() => setIsHeartAnimating(false), 1000);
    window.open("https://buymeacoffee.com/tomasmorales", "_blank");
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
          <div className="relative w-full rounded-2xl overflow-hidden">
            <img
              src={data.image_url}
              alt="Imagen del haiku"
              className="w-full h-auto rounded-2xl shadow-lg object-contain"
            />
          </div>
        </div>
        
        {/* Haiku Text después en móvil */}
        <div className="text-center px-4">
          <p className="text-2xl font-playfair leading-relaxed mb-4">{data.haiku}</p>
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
          
          {/* Botones en fila (Share y Support) */}
          <div className="flex justify-center gap-3 mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="border-gray-700 hover:bg-gray-800"
            >
              <Share2 className="mr-1 h-4 w-4" />
              Share
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleSupportClick}
              className={`relative overflow-hidden border-gray-700 hover:border-red-500 hover:text-red-500 transition-colors duration-300 ${
                isHeartAnimating ? "border-red-500 text-red-500" : ""
              }`}
            >
              <Heart 
                className={`mr-1 h-4 w-4 transition-transform duration-500 ${
                  isHeartAnimating ? "scale-150 text-red-500" : ""
                }`} 
              />
              Support
              {isHeartAnimating && (
                <span className="absolute inset-0 bg-red-500/10 animate-pulse" />
              )}
            </Button>
          </div>
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
            <p className="text-3xl lg:text-4xl font-playfair leading-relaxed mb-6">{data.haiku}</p>
          </div>

          <div>
            <p className="uppercase tracking-wide font-inter text-lg">{data.author}</p>
            <p className="uppercase tracking-wide text-gray-400 mb-4">#{data.season}</p>

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

            {/* Botones en fila para desktop */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="border-gray-700 hover:bg-gray-800"
              >
                <Share2 className="mr-1 h-4 w-4" />
                Share
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleSupportClick}
                className={`relative overflow-hidden border-gray-700 hover:border-red-500 hover:text-red-500 transition-colors duration-300 ${
                  isHeartAnimating ? "border-red-500 text-red-500" : ""
                }`}
              >
                <Heart 
                  className={`mr-1 h-4 w-4 transition-transform duration-500 ${
                    isHeartAnimating ? "scale-150 text-red-500" : ""
                  }`} 
                />
                Support
                {isHeartAnimating && (
                  <span className="absolute inset-0 bg-red-500/10 animate-pulse" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HaikuDisplay;