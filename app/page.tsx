"use client";

import { useState } from "react";
import { MainMenu } from "@/components/MainMenu";
import { DifficultySelect } from "@/components/DifficultySelect";
import { GameScreen } from "@/components/GameScreen";
import { AboutScreen } from "@/components/AboutScreen";

type View = "menu" | "difficulty" | "game" | "about";

export default function Home() {
  const [view, setView] = useState<View>("menu");
  const [difficulty, setDifficulty] = useState<string>("Amateur");

  if (view === "difficulty") {
    return (
      <DifficultySelect
        onSelect={(d) => {
          setDifficulty(d);
          setView("game");
        }}
        onBack={() => setView("menu")}
      />
    );
  }

  if (view === "game") {
    return (
      <GameScreen
        difficulty={difficulty}
        onMenu={() => setView("menu")}
      />
    );
  }

  if (view === "about") {
    return <AboutScreen onBack={() => setView("menu")} />;
  }

  return <MainMenu onNavigate={setView as (v: string) => void} />;
}