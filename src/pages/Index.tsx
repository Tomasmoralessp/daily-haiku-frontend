import React, { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import Counter from "../components/ui/Counter";
import HaikuDisplay from "../components/ui/HaikuDisplay";


const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />

      <main className="flex-1 flex flex-col pt-10 px-4 sm:px-6 lg:px-8">
        <div className="flex-1 flex items-center justify-center">
          <HaikuDisplay
          />
        </div>
      </main>
    </div>
  );
};

export default Index;
