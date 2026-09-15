"use client";

interface ScoreDisplayProps {
  scores: [number, number];
  currentPlayer: number;
}

export function ScoreDisplay({ scores, currentPlayer }: ScoreDisplayProps) {
  return (
    <div className="flex gap-8 items-center justify-center mb-4">
      <div className={`text-center ${currentPlayer === 1 ? "font-bold" : ""}`}>
        <div className="text-sm text-gray-500">Tú (P1)</div>
        <div className="text-2xl text-emerald-500">{scores[0]}</div>
      </div>
      <div className="text-gray-300 text-2xl">:</div>
      <div className={`text-center ${currentPlayer === 2 ? "font-bold" : ""}`}>
        <div className="text-sm text-gray-500">IA (P2)</div>
        <div className="text-2xl text-red-500">{scores[1]}</div>
      </div>
    </div>
  );
}