"use client";

import { BoardGrid } from "./BoardGrid";
import { ScoreDisplay } from "./ScoreDisplay";
import { ThinkingIndicator } from "./ThinkingIndicator";
import { VersionBadge } from "./VersionBadge";
import { useGameEngine } from "./useGameEngine";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
        <span className="text-sm text-muted-foreground">{difficulty}</span>
        <span className="text-sm text-muted-foreground">
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

      <Button
        onClick={onMenu}
        variant="link"
        className="mt-4"
      >
        ← Volver al Menú
      </Button>

      <Dialog open={gameOver && resultVisible} onOpenChange={onMenu}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className={`text-center text-2xl ${resultColor}`}>
              {resultText}
            </DialogTitle>
          </DialogHeader>

          <div className="text-center">
            <p className="text-sm font-semibold mb-3 text-foreground">Puntuación Final</p>
            <div className="flex justify-around">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-500">{scores[0]}</div>
                <div className="text-xs text-muted-foreground">Tú</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-500">{scores[1]}</div>
                <div className="text-xs text-muted-foreground">IA</div>
              </div>
            </div>
          </div>

          <Button
            onClick={onMenu}
            variant="default"
            size="lg"
            className="w-full"
          >
            Volver al Menú
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}