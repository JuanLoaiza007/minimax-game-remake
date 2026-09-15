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
    <div className="flex flex-col h-dvh overflow-hidden p-4 gap-1">
      {/* Top bar: mode + status */}
      <div className="shrink-0 flex items-center justify-between w-full max-w-[500px] mx-auto md:max-w-none">
        <span className="text-sm font-medium">Modo {difficulty}</span>
        <span className="text-sm font-medium text-muted-foreground">
          {isThinking
            ? "Pensando..."
            : gameOver
              ? "Juego terminado"
              : currentPlayer === 1
                ? "Tu turno"
                : "Turno IA"}
        </span>
      </div>

      {/* Main area: three columns on md+, single column on mobile */}
      <div className="flex-1 min-h-0 flex flex-col md:flex-row items-center justify-center w-full gap-4">
        {/* Left panel — P1 score, desktop only */}
        <div className="hidden md:flex md:flex-col md:items-center md:gap-1 md:min-w-24">
          <span className="text-sm text-muted-foreground">Tú</span>
          <span className="text-5xl font-bold text-emerald-500">{scores[0]}</span>
          <span className={currentPlayer === 1 ? "text-xs text-primary font-semibold" : "text-xs text-muted-foreground"}>
            {currentPlayer === 1 ? "Tu turno" : ""}
          </span>
        </div>

        {/* Board */}
          <div className="flex flex-col items-center justify-center min-h-0 w-full max-w-[500px] max-h-full">
            {/* Mobile score bar */}
            <div className="md:hidden w-full mb-1 shrink-0">
              <ScoreDisplay scores={scores} currentPlayer={currentPlayer} />
            </div>

            {/* Board area with fixed-thinking-indicator slot below */}
            <div className="flex-1 min-h-0 flex flex-col items-center justify-center w-full max-w-full max-h-full">
              <div className="flex-1 min-h-0 flex items-center justify-center w-full">
                {isThinking ? (
                  <BoardGrid
                    grid={grid}
                    selectedPos={null}
                    validMoves={[]}
                    onCellClick={() => {}}
                  />
                ) : (
                  <BoardGrid
                    grid={grid}
                    selectedPos={selectedPos}
                    validMoves={validMoves}
                    onCellClick={handleCellClick}
                  />
                )}
              </div>
              <div className="h-8 shrink-0 flex items-center justify-center w-full">
                {isThinking && <ThinkingIndicator />}
              </div>
            </div>
          </div>

        {/* Right panel — P2 score, desktop only */}
        <div className="hidden md:flex md:flex-col md:items-center md:gap-1 md:min-w-24">
          <span className="text-sm text-muted-foreground">IA</span>
          <span className="text-5xl font-bold text-red-500">{scores[1]}</span>
          <span className={currentPlayer === 2 ? "text-xs text-primary font-semibold" : "text-xs text-muted-foreground"}>
            {currentPlayer === 2 ? "Turno IA" : gameOver ? "Fin" : ""}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="shrink-0 flex items-center justify-between w-full max-w-[500px] mx-auto md:max-w-none">
        <VersionBadge />
        <Button
          onClick={onMenu}
          variant="link"
        >
          ← Volver al Menú
        </Button>
      </div>

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