"use client";

import { BoardGrid } from "./BoardGrid";
import { VersionBadge } from "./VersionBadge";
import { useGameBoard } from "./useGameBoard";

export function GameBoard() {
  const { grid, selectedPos, validMoves, handleCellClick } = useGameBoard();

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh p-4">
      <h1 className="text-xl font-bold mb-4">Proyecto 2 IA</h1>
      <BoardGrid
        grid={grid}
        selectedPos={selectedPos}
        validMoves={validMoves}
        onCellClick={handleCellClick}
      />
      <VersionBadge />
    </div>
  );
}