
import React, { useState } from "react";
import Header from "../components/layout/Header";
import Counter from "../components/ui/Counter";
import { toast } from "sonner";

const HaikuDetector: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [detectedHaiku, setDetectedHaiku] = useState<string[] | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [haikuCount, setHaikuCount] = useState(1245);

  // This is a simplified haiku detection algorithm for demonstration
  // A real implementation would be more sophisticated
  const detectHaiku = (text: string): string[] | null => {
    // Simple algorithm to detect a potential haiku pattern
    // In real-world, this would need natural language processing
    const lines = text.split(/[.!?\n]+/).filter(line => line.trim().length > 0);
    
    // Look for 3 consecutive lines that could form a haiku
    for (let i = 0; i < lines.length - 2; i++) {
      const potentialHaiku = [
        lines[i].trim(),
        lines[i + 1].trim(),
        lines[i + 2].trim()
      ];
      
      // Very simplified syllable count check
      // A real implementation would use a proper syllable counting library
      const syllableCounts = potentialHaiku.map(line => 
        estimateSyllables(line)
      );
      
      // Check if it matches the 5-7-5 pattern (with some flexibility)
      if (Math.abs(syllableCounts[0] - 5) <= 1 && 
          Math.abs(syllableCounts[1] - 7) <= 1 && 
          Math.abs(syllableCounts[2] - 5) <= 1) {
        return potentialHaiku;
      }
    }
    
    return null;
  };
  
  // Very simplistic syllable counter - in a real app, use a proper NLP library
  const estimateSyllables = (line: string): number => {
    const words = line.toLowerCase().split(/\s+/);
    let count = 0;
    
    const vowels = ["a", "e", "i", "o", "u", "y"];
    
    words.forEach(word => {
      let wordCount = 0;
      let prevIsVowel = false;
      
      for (const char of word) {
        const isVowel = vowels.includes(char);
        if (isVowel && !prevIsVowel) {
          wordCount++;
        }
        prevIsVowel = isVowel;
      }
      
      // Handle some edge cases
      if (word.length > 0) {
        if (word.endsWith("e")) wordCount--;
        if (word.endsWith("le") && word.length > 2) wordCount++;
        if (wordCount === 0) wordCount = 1;
      }
      
      count += wordCount;
    });
    
    return count;
  };

  const handleDetection = () => {
    if (!inputText.trim()) {
      toast.error("Please enter some text to analyze");
      return;
    }
    
    setIsAnalyzing(true);
    setDetectedHaiku(null);
    
    // Simulate processing delay for better UX
    setTimeout(() => {
      const result = detectHaiku(inputText);
      setDetectedHaiku(result);
      
      if (result) {
        setHaikuCount(prev => prev + 1);
        toast.success("A haiku has been detected!");
      } else {
        toast.info("No haiku detected in the text");
      }
      
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 pt-20 max-w-3xl mx-auto">
        <h1 className="font-playfair text-3xl md:text-4xl mb-12 animate-fade-in text-center">
          Haiku Detector
        </h1>
        
        <div className="w-full animate-slide-in">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your text here and discover if it contains a haiku..."
            className="w-full h-40 px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-white/30 text-white placeholder-gray-500 resize-none transition-all duration-300"
          />
          
          <button
            onClick={handleDetection}
            disabled={isAnalyzing}
            className="mt-4 px-6 py-2 bg-transparent border border-white/10 hover:bg-white/5 transition-colors duration-300 rounded-md w-full font-inter text-sm uppercase tracking-widest"
          >
            {isAnalyzing ? "Analyzing..." : "Detect Haiku"}
          </button>
        </div>
        
        {detectedHaiku ? (
          <div className="mt-16 w-full max-w-md animate-fade-in">
            <div className="fade-element delay-100">
              <p className="haiku-text mb-2">{detectedHaiku[0]}</p>
            </div>
            <div className="fade-element delay-200">
              <p className="haiku-text mb-2">{detectedHaiku[1]}</p>
            </div>
            <div className="fade-element delay-300">
              <p className="haiku-text mb-8">{detectedHaiku[2]}</p>
            </div>
          </div>
        ) : detectedHaiku === null ? null : (
          <div className="mt-16 w-full max-w-md text-center animate-fade-in">
            <p className="text-lg font-inter text-gray-400">
              No haiku found, but continue seeking poetry in everything around you.
            </p>
          </div>
        )}
        
        <div className="mt-16">
          <Counter targetNumber={haikuCount} />
        </div>
      </main>
    </div>
  );
};

export default HaikuDetector;
