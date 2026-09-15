"use client";

interface AboutScreenProps {
  onBack: () => void;
}

export function AboutScreen({ onBack }: AboutScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh p-4">
      <h1 className="text-2xl font-bold mb-4">Sobre Nosotros</h1>

      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-sm text-gray-700 space-y-4">
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
        <p className="text-sm text-gray-400">
          Stack: Next.js 16 + React 19 + Tailwind CSS 4 + TypeScript
        </p>
      </div>

      <button
        onClick={onBack}
        className="mt-8 text-gray-500 hover:text-gray-700 transition-colors"
      >
        ← Volver al Menú
      </button>
    </div>
  );
}