"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface AboutScreenProps {
  onBack: () => void;
}

export function AboutScreen({ onBack }: AboutScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh p-4">
      <h1 className="text-2xl font-bold mb-4">Sobre Nosotros</h1>

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