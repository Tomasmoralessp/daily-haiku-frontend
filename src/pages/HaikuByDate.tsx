// src/pages/HaikuByDate.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface Haiku {
  title: string;
  author: string;
  content: string;
  image_url: string;
}

const HaikuByDate = () => {
  const { date } = useParams();
  const [haiku, setHaiku] = useState<Haiku | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!date) return;

    fetch(`${import.meta.env.VITE_API_URL}/${date}`)
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo cargar el haiku.");
        return res.json();
      })
      .then(setHaiku)
      .catch((err) => setError(err.message));
  }, [date]);

  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!haiku) return <p className="text-center text-gray-400">Cargando...</p>;

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center text-center px-4">
      <div>
        <h1 className="text-3xl mb-4">{haiku.title}</h1>
        <p className="text-xl italic text-gray-300 mb-2">{haiku.author}</p>
        <p className="text-lg text-gray-400">{haiku.content}</p>
        <img
          src={haiku.image_url}
          alt="Haiku visual"
          className="mt-8 max-w-md mx-auto rounded-lg"
        />
      </div>
    </main>
  );
};

export default HaikuByDate;
