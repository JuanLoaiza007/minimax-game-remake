"use client";

import { APP_VERSION } from "@/lib/constants";
import { Button } from "@/components/ui/button";

interface MainMenuProps {
  onNavigate: (view: string) => void;
}

export function MainMenu({ onNavigate }: MainMenuProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh p-4">
      <h1 className="text-3xl font-bold mb-2">Proyecto 2 IA</h1>
      <p className="text-gray-500 mb-8">Estrategia con movimientos de caballo</p>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Button
          onClick={() => onNavigate("difficulty")}
          variant="default"
          size="lg"
          className="w-full"
        >
          Clásico
        </Button>

        <Button
          disabled
          variant="default"
          size="lg"
          className="w-full"
          title="Próximamente"
        >
          Personalizado — Próximamente
        </Button>

        <Button
          onClick={() => onNavigate("about")}
          variant="ghost"
          size="lg"
          className="w-full"
        >
          Sobre Nosotros
        </Button>
      </div>

      <div className="text-xs text-muted-foreground text-center py-4 select-none">
        v{APP_VERSION}
      </div>
    </div>
  );
}