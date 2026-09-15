"use client";

import { BoardGrid } from "./BoardGrid";
import { ScoreDisplay } from "./ScoreDisplay";
import { ThinkingIndicator } from "./ThinkingIndicator";
import { VersionBadge } from "./VersionBadge";
import { useGameEngine } from "./useGameEngine";

interface GameScreenProps {
  difficulty: string;
  onMenu: () => void;
}

export function GameScreen({ difficulty, onMenu }: GameScreenProps) {
  const { grid, scores, currentPlayer, selectedPos, validMoves, isThinking, gameOver, winner, tie, resultVisible, handleCellClick } = useGameEngine(difficulty);

  const resultText = gameOver
    ? tie
      ? "¡Empate!"
      : winner === 1
        ? "¡Ganaste!"
        : "La IA ganó..."
    : null;

  const resultColor = tie ? "text-yellow-500" : winner === 1 ? "text-emerald-500" : "text-red-500";

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh p-4">
      <div className="flex items-center gap-4 mb-2">
        <span className="text-sm text-gray-500">{difficulty}</span>
        <span className="text-sm text-gray-400">
          {isThinking ? "" : gameOver ? "Juego terminado" : currentPlayer === 1 ? "Tu turno" : "Turno IA"}
        </span>
      </div>

      <ScoreDisplay scores={scores} currentPlayer={currentPlayer} />

      {isThinking ? (
        <div className="flex flex-col items-center">
          <BoardGrid
            grid={grid}
            selectedPos={null}
            validMoves={[]}
            onCellClick={() => {}}
          />
          <ThinkingIndicator />
        </div>
      ) : (
        <BoardGrid
          grid={grid}
          selectedPos={selectedPos}
          validMoves={validMoves}
          onCellClick={handleCellClick}
        />
      )}

      <VersionBadge />

      <button
        onClick={onMenu}
        className="mt-4 text-gray-500 hover:text-gray-700 transition-colors text-sm"
      >
        ← Volver al Menú
      </button>

      {gameOver && resultVisible && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full mx-4 text-center">
            <h1 className={`text-4xl font-bold mb-6 ${resultColor}`}>{resultText}</h1>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Puntuación Final</h2>
              <div className="flex justify-around">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-500">{scores[0]}</div>
                  <div className="text-sm text-gray-500">Tú</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-500">{scores[1]}</div>
                  <div className="text-sm text-gray-500">IA</div>
                </div>
              </div>
            </div>

            <button
              onClick={onMenu}
              className="py-3 px-8 bg-emerald-500 text-white rounded-lg text-lg font-semibold hover:bg-emerald-600 transition-colors"
            >
              Volver al Menú
            </button>
          </div>
        </div>
      )}
    </div>
  );
}