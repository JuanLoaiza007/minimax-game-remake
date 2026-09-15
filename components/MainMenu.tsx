"use client";

import { APP_VERSION } from "@/lib/constants";

interface MainMenuProps {
  onNavigate: (view: string) => void;
}

export function MainMenu({ onNavigate }: MainMenuProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh p-4">
      <h1 className="text-3xl font-bold mb-2">Proyecto 2 IA</h1>
      <p className="text-gray-500 mb-8">Estrategia con movimientos de caballo</p>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button
          onClick={() => onNavigate("difficulty")}
          className="w-full py-3 px-6 bg-emerald-500 text-white rounded-lg text-lg font-semibold hover:bg-emerald-600 transition-colors"
        >
          Clásico
        </button>

        <button
          disabled
          className="w-full py-3 px-6 bg-gray-200 text-gray-400 rounded-lg text-lg font-semibold cursor-not-allowed"
          title="Próximamente"
        >
          Personalizado — Próximamente
        </button>

        <button
          onClick={() => onNavigate("about")}
          className="w-full py-3 px-6 bg-gray-100 text-gray-700 rounded-lg text-lg font-semibold hover:bg-gray-200 transition-colors"
        >
          Sobre Nosotros
        </button>
      </div>

      <div className="text-xs text-gray-400 text-center py-4 select-none">
        v{APP_VERSION}
      </div>
    </div>
  );
}