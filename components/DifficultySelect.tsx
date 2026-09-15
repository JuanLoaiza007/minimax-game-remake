"use client";

import { APP_VERSION } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface DifficultySelectProps {
  onSelect: (difficulty: string) => void;
  onBack: () => void;
}

const DIFFICULTIES = [
  { name: "Principiante", depth: 2, desc: "Ideal para aprender las reglas" },
  { name: "Amateur", depth: 4, desc: "Un reto equilibrado" },
  { name: "Experto", depth: 6, desc: "Para jugadores avanzados" },
];

export function DifficultySelect({ onSelect, onBack }: DifficultySelectProps) {
  return (
    <div className="flex flex-col h-dvh overflow-hidden p-4">
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-2">Seleccionar Dificultad</h1>
        <p className="text-muted-foreground mb-8">Clásico — 1 vs IA</p>

        <div className="flex flex-col gap-4 w-full max-w-xs">
          {DIFFICULTIES.map((d) => (
            <Card
              key={d.name}
              onClick={() => onSelect(d.name)}
              className="w-full cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium group-hover/card:text-primary-foreground">{d.name}</span>
                  <span className="text-xs text-muted-foreground group-hover/card:text-primary-foreground/80">Prof. {d.depth}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground group-hover/card:text-primary-foreground/80">{d.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="shrink-0 flex items-center justify-between w-full max-w-xs mx-auto">
        <div className="text-xs text-muted-foreground select-none">v{APP_VERSION}</div>
        <Button onClick={onBack} variant="link">← Volver al Menú</Button>
      </div>
    </div>
  );
}