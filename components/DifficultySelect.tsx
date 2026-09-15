"use client";

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
      <p className="text-gray-500 mb-8">Clásico — 1 vs IA</p>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        {DIFFICULTIES.map((d) => (
          <button
            key={d.name}
            onClick={() => onSelect(d.name)}
            className="w-full py-4 px-6 bg-white border-2 border-emerald-500 text-emerald-700 rounded-lg text-left hover:bg-emerald-50 transition-colors"
          >
            <span className="text-lg font-semibold">{d.name}</span>
            <br />
            <span className="text-sm text-gray-500">{d.desc}</span>
          </button>
        ))}
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