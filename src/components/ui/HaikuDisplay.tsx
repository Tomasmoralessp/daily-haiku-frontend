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
  keywords?: string | string[] | null; // 🔥 Puede ser un array, un string JSON o null
  image_url: string;
}

const HaikuDisplay: React.FC = () => {
  const [data, setData] = useState<Haiku | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/daily_haiku`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener el haiku");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Datos recibidos:", data); // 🔍 Verifica qué devuelve la API
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
  

  // 📌 Manejo de estados para evitar pantalla negra
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

  // 🔥 Transformamos `keywords` en array ANTES de renderizar
  let keywordsArray: string[] = [];
  if (typeof data.keywords === "string") {
    try {
      keywordsArray = JSON.parse(data.keywords); // 🔥 Convertimos el string JSON en un array
    } catch (error) {
      console.error("Error al parsear keywords:", error);
    }
  } else if (Array.isArray(data.keywords)) {
    keywordsArray = data.keywords;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-center w-full gap-6 md:gap-12 lg:gap-16 px-4">
        {/* Imagen del Haiku */}
        <div className="w-full md:w-2/5 flex flex-col items-center justify-center order-1">
          <div className="relative w-full h-64 sm:h-80 md:h-96 mb-6 md:mb-0">
            <img
              src={data.image_url} 
              alt="Imagen del haiku"
              className="w-full h-[180px] sm:h-80 md:h-96 object-cover rounded-2xl shadow-lg"
              style={{ objectPosition: "center" }}
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent to-black/10 pointer-events-none" />
          </div>
        </div>

        {/* Texto y Metadatos del Haiku */}
        <div className="w-full md:w-3/5 flex flex-col items-center md:items-start justify-center order-2">
          <div className="mb-6 md:mb-8 max-w-lg">
            <p className="haiku-text mb-6 font-light">{data.haiku}</p> 
          </div>

          <div className="w-full">
            <p className="haiku-metadata mb-1 text-gray-300">{data.author}</p>
            <p className="haiku-metadata mb-1 text-gray-400">{data.season}</p>

  

            {/* 🔥 Nueva sección para mostrar las keywords */}
            {keywordsArray.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {keywordsArray.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded-full"
                    >
                      #{keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Botón de compartir */}
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
      </div>
    </div>
  );
};

export default HaikuDisplay;
