"use client";

import { APP_VERSION } from "@/lib/constants";
import { Button } from "@/components/ui/button";

interface MainMenuProps {
  onNavigate: (view: string) => void;
}

export function MainMenu({ onNavigate }: MainMenuProps) {
  return (
    <div className="flex flex-col h-dvh overflow-hidden p-4">
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-2">MiniMax Challenge</h1>
        <p className="text-gray-500 mb-8">Estrategia con movimientos de caballo</p>

        <div className="flex flex-col gap-4 w-full max-w-xs">
          <Button
            onClick={() => onNavigate("difficulty")}
            variant="default"
            size="lg"
            className="w-full h-12 text-sm"
          >
            Clásico
          </Button>

          <Button
            disabled
            variant="default"
            size="lg"
            className="w-full h-12 text-sm"
            title="Próximamente"
          >
            Personalizado — Próximamente
          </Button>

<Button
          onClick={() => onNavigate("about")}
          variant="outline"
          size="lg"
          className="w-full h-12 text-sm"
        >
          Sobre el Juego
        </Button>
        </div>
      </div>

      <div className="shrink-0 flex items-center justify-center">
        <div className="text-xs text-muted-foreground select-none">v{APP_VERSION}</div>
      </div>
    </div>
  );
}