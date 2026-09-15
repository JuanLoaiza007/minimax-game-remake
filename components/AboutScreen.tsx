"use client";

import { APP_VERSION } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface AboutScreenProps {
  onBack: () => void;
}

export function AboutScreen({ onBack }: AboutScreenProps) {
  return (
    <div className="flex flex-col h-dvh overflow-hidden p-4">
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Sobre el Juego</h1>

        <Card className="w-full max-w-sm">
          <CardContent className="space-y-4 pt-(--card-spacing)">
            <p>
              Un juego de estrategia con movimientos de caballo
              basado en el algoritmo Minimax con poda alfa-beta.
            </p>
            <p>
              Cada jugador controla una pieza que se mueve como el caballo de ajedrez.
              El objetivo es acumular la mayor cantidad de casillas visitadas.
            </p>
            <p>
              Desarrollado como proyecto del curso de Inteligencia Artificial.
            </p>
            <p className="text-xs text-muted-foreground">
              Stack: Next.js 16 + React 19 + Tailwind CSS 4 + TypeScript
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="shrink-0 flex items-center justify-between w-full max-w-sm mx-auto">
        <div className="text-xs text-muted-foreground select-none">v{APP_VERSION}</div>
        <Button onClick={onBack} variant="link">← Volver al Menú</Button>
      </div>
    </div>
  );
}