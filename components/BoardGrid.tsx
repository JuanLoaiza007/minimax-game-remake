"use client";

import { type CellState } from "@/lib/game/types";
import { BoardCell } from "./BoardCell";

interface BoardGridProps {
  grid: CellState[][];
  selectedPos: { row: number; col: number } | null;
  validMoves: { row: number; col: number }[];
  onCellClick: (row: number, col: number) => void;
}

export function BoardGrid({ grid, selectedPos, validMoves, onCellClick }: BoardGridProps) {
  const isValidTarget = (row: number, col: number) =>
    validMoves.some((m) => m.row === row && m.col === col);

  const isSelected = (row: number, col: number) =>
    selectedPos !== null && selectedPos.row === row && selectedPos.col === col;

  return (
    <div
      className="grid gap-1 w-full max-w-[500px] mx-auto"
      style={{
        gridTemplateColumns: `repeat(${grid[0].length}, 1fr)`,
        gridTemplateRows: `repeat(${grid.length}, 1fr)`,
      }}
    >
      {grid.map((row, r) =>
        row.map((cell, c) => (
          <BoardCell
            key={`${r}-${c}`}
            state={cell}
            isSelected={isSelected(r, c)}
            isValidMove={isValidTarget(r, c)}
            onClick={() => onCellClick(r, c)}
          />
        ))
      )}
    </div>
  );
}