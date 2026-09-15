"use client";

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
    <div className="flex flex-col items-center justify-center min-h-dvh p-4">
      <h1 className="text-2xl font-bold mb-2">Seleccionar Dificultad</h1>
      <p className="text-muted-foreground mb-8">Clásico — 1 vs IA</p>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        {DIFFICULTIES.map((d) => (
          <Card key={d.name} className="w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{d.name}</span>
                <span className="text-xs text-muted-foreground">Prof. {d.depth}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-3">{d.desc}</p>
              <Button
                onClick={() => onSelect(d.name)}
                variant="outline"
                size="lg"
                className="w-full"
              >
                Jugar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        onClick={onBack}
        variant="link"
        className="mt-8"
      >
        ← Volver al Menú
      </Button>
    </div>
  );
}